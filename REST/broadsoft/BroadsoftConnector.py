from flask_restful import reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, make_response, json
import xmltodict, requests
from REST.auth.Proxy import Proxy
from REST.broadsoft.BroadsoftResource import BroadsoftResource
from REST.auth.User import User
from collections import OrderedDict
import logging



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
        # Require user to be logged in to access this endpoint.
        @jwt_required
        def post(self):
            user = User().from_identity(get_jwt_identity())

            if user is None:
                return {'message':'Not logged in'}, 401

            parser = reqparse.RequestParser()

            parser.add_argument(
                    name='endpoint',
                    help='Missing the required broadsoft endpoint to connect to.',
                    required=True)

            parser.add_argument(
                name='data',
                type=OrderedDict,
                help='Missing JSON formatted data to send to the broadsoft API.',
                required=True)

            parser.add_argument(
                name='method',
                help='Missing method type. ex) method:GET/PUT/POST...',
                required=True)

            args = parser.parse_args()
            url = self.url + args['endpoint'].replace("<user>", user.username)
            data = ""
            if(args['data']):
                try:
                    from ..server import app
                    app.logger.log(logging.INFO, "Args data: " + str(args['data']))
                    data += str(xmltodict.unparse(args['data']))
                except:
                    data = ""
            method = args['method']

            # Ensure broadsoft cookies are stripped and re-formatted.
            response = Proxy().to_broadsoft(method, url, data, user)

            if response.status_code == 200 or response.status_code == 201:
                # Log the sent content
                from ..server import app
                app.logger.log(logging.INFO, "Sent url: " + url)
                app.logger.log(logging.INFO, "Send method: " + method)
                app.logger.log(logging.INFO, "Sent data: " + data)
                app.logger.log(logging.INFO, "Response status: " + str(response.status_code))
                app.logger.log(logging.INFO, "Response content: " + str(response.content) if response.content else "")

                # Get the XML response and return the response as a JSON string.
                if response.content:
                    string = xmltodict.parse(response.content)
                    return make_response(jsonify({'data':string}), 200)
                else:
                    return make_response("", 200)
            else:
                from ..server import app
                app.logger.log(logging.INFO, "Sent url: " + url)
                app.logger.log(logging.INFO, "Send method: " + method)
                app.logger.log(logging.INFO, "Sent data: " + data)
                app.logger.log(logging.INFO, "Response status: " + str(response.status_code))
                app.logger.log(logging.INFO, "Response content: " + str(response.content) if response.content else "")
                return make_response(response.content if response.content else "", response.status_code)