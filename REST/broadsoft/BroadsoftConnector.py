from flask_restful import reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_jwt_extended.exceptions import CSRFError
from flask import make_response
import requests
from REST.auth.Proxy import Proxy
from REST.broadsoft.BroadsoftResource import BroadsoftResource
from REST.auth.User import User
import logging
from REST.server import config, logconsole, logfile


class BroadsoftConnector(BroadsoftResource):

    def getToken(self, username, password):
        """
        Sends a request to generate a token from broadsoft to check if the user is valid.
        :return: A dictionary response of the xml
        """

        response = requests.post(self.url + "/user/" + username + "/profile/loginToken",
                                auth=(username, password))

        return response

    class getEndpoint(BroadsoftResource):
        """
        Accesses a broadsoft endpoint
        """
        def post(self):
            """
            Triggered when getEndpoints is accessed via POST
            :return:
            """

            if config.logging:
                logfile.info("Request to /rest/broadsoft recieved")
            if config.verbose:
                logconsole.info("Request to /rest/broadsoft recieved")

            # Ensure that the user has sent a jwt to the endpoint.
            try:
                verify_jwt_in_request()
            except Exception as error:
                return make_response("<error>Unauthorized</error>", 401)

            # Create a user object from the JWT identity object.
            user = User().from_identity(get_jwt_identity())

            # Check if a user was able to be created.
            if user is None:
                return "<ErrorInfo><message>Not logged in</message><error>true</error></ErrorInfo>", 401

            # Create a request parser to parse arguments
            parser = reqparse.RequestParser()

            # Configure endpoint arguments.
            parser.add_argument(
                    name='endpoint',
                    help='Missing the required broadsoft endpoint to connect to.',
                    required=True)

            parser.add_argument(
                name='data',
                type=str,
                help='JSON data needs to be a string')

            parser.add_argument(
                name='method',
                help='Missing method type. ex) method:GET/PUT/POST...',
                required=True)

            # Check if the arguments passed were valid.
            try:
                args = parser.parse_args()
            except reqparse.exceptions.BadRequest as e:
                # If there are any errors, ensure that login=False is sent.
                message = "<error>true</error>"
                return message, 400

            # Get the data sent from the request.
            url = self.url + args['endpoint'].replace("<user>", user.username)
            data = ""
            method = args['method']

            # Check if any data was sent
            if(args['data']):
                data = args['data']

            # Get the user's broadsoft token from the JWT and send a request to broadsoft.
            response = Proxy().to_broadsoft(method, url, data, user)

            # Check if a valid response was returned.
            if response.status_code == 200 or response.status_code == 201:

                # Output a response to the console and log files.
                if config.logging:
                    logfile.info("Sent: " + method + " " + url + " " + data + "\n Recieved:" + str(response.status_code) + " " + str(response.content) if response.content else "")
                if config.verbose:
                    logconsole.info("Sent: " + method + " " + url + " " + data + "\n Recieved:" + str(response.status_code) + " " + str(response.content) if response.content else "")

                # Format a response
                if response.content:
                    return make_response(str(response.content.decode('ISO-8859-1')), 200)
                else:
                    return make_response("", 200)
            else:
                if config.logging:
                    logfile.info("Sent: " + method + " " + url + " " + data + "\n Recieved:" + str(response.status_code) + " " + response.content.decode('ISO-8859-1') if response.content else "")
                if config.verbose:
                    logconsole.info("Sent: " + method + " " + url + " " + data + "\n Recieved:" + str(response.status_code) + " " + response.content.decode('ISO-8859-1') if response.content else "")

                if response.content:
                    return make_response(response.content.decode('ISO-8859-1'), response.status_code)
                else:
                    return make_response("", response.status_code)