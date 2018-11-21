import requests
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
import xmltodict
import jsonpickle
from flask import jsonify, make_response


class BroadsoftConnector(Resource):
    """
    A class to allow endpoints API calls
    """
    def __init__(self):
        """
        Constructor for the endpoints API to allow connections to the API
        """

        # The base url for endpoints calls
        self.url = "https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0"

    def getToken(self, username, password):
        """
        Sends a request to generate a token from broadsoft to check if the user is valid.
        :return: A dictionary response of the xml
        """

        response = requests.post(self.url + "/user/" + username + "/profile/loginToken",
                                auth=(username, password))

        return response

    class getEndpoint(Resource):
        # Require a java web token to access broadsoft endpoints other than the login token.
        @jwt_required
        def post(self):
            user = jsonpickle.decode(get_jwt_identity())

            if user is None:
                return {'message':'Not logged in'}, 401

            parser = reqparse.RequestParser()

            parser.add_argument(
                    name='endpoint',
                    help='Missing the required broadsoft endpoint to connect to.',
                    required=True)

            parser.add_argument(
                name='data',
                help='Missing JSON formatted data to send to the broadsoft API.',
                required=True,
                type=str)

            args = parser.parse_args()

            # Check if the user's broadsoft token has expired
            if not user.isTokenValid():
                # Attempt to generate a new token.
                if user.getNewToken() == False:
                    # If the token was unable to be generated, return an error.
                    return {'message':'An authentication error occurred.'}, 200

            # Once a valid token has been verified/generated, send the broadsoft request with the token.

            response = requests.post(
                            url="https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0" + args['endpoint'],
                            data=args['data'],
                            headers={'Authorization': 'access_token ' + user.broadsoft_token}
                            )

            if response.status_code == 200 or response.status_code == 201:
                # Get the XML response and return the response as a JSON string.
                string = xmltodict.parse(response.content)
                return make_response(jsonify({'data':string}), 200)
            else:
                return make_response(response.content if response.content else "", response.status_code)