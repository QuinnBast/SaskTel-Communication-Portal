from flask_restful import reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, make_response
import requests, json, xmltodict
from REST.auth.Proxy import Proxy
from REST.broadsoft.BroadsoftResource import BroadsoftResource
from REST.auth.User import User
import logging
from collections import OrderedDict


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
                type=str,
                help='JSON data needs to be a string')

            parser.add_argument(
                name='method',
                help='Missing method type. ex) method:GET/PUT/POST...',
                required=True)

            args = parser.parse_args()
            url = self.url + args['endpoint'].replace("<user>", user.username)
            data = ""
            method = args['method']
            if(args['data']):
                try:
                    from ..server import app
                    app.logger.log(logging.INFO, "Incoming data: " + str(args['data']))
                    jsonData = json.loads(args['data'], object_pairs_hook=OrderedDict)
                    data = str(xmltodict.unparse(jsonData))
                except:
                    app.logger.log(logging.INFO, "Cannot parse data into XML!")
                    return make_response(jsonify({'error': 'true'}), 409)
                    # Return an error

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
                if response.content:
                    string = xmltodict.parse(response.content)
                    return make_response(jsonify({'data':string, 'error':'false'}), 200)
                else:
                    return make_response(jsonify({'error':'false'}), 200)
            else:
                from ..server import app
                app.logger.log(logging.INFO, "Sent url: " + url)
                app.logger.log(logging.INFO, "Send method: " + method)
                app.logger.log(logging.INFO, "Sent data: " + data)
                app.logger.log(logging.INFO, "Response status: " + str(response.status_code))
                app.logger.log(logging.INFO,
                               "Response content: " + response.content.decode('ISO-8859-1') if response.content else "")
                if response.content:
                    string = xmltodict.parse(response.content)
                    return make_response(jsonify({'data': string, 'error':'true'}), response.status_code)
                else:
                    return make_response(jsonify({'error': 'true'}), response.status_code)