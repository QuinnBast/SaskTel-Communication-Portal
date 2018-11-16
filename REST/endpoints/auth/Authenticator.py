from flask_restful import Resource, reqparse
from passlib.hash import pbkdf2_sha256 as sha256
from REST.endpoints.broadsoft.BroadsoftConnector import BroadsoftConnector
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, set_refresh_cookies, unset_jwt_cookies)
import xmltodict
from flask import jsonify

class Authenticator():

    class UserLogin(Resource):
        def post(self):
            parser = reqparse.RequestParser()

            parser.add_argument(
                name='username',
                help='Username is a required field',
                required=True
                )

            parser.add_argument(
                name='password',
                help='Password is a required field.',
                required=True
            )

            # Use the parser to parse arguments the user has sent.
            data = parser.parse_args()

            # Send the username and password to broadsoft and check that a token can be obtained from the endpoint.
            response = BroadsoftConnector(data['username'], data['password']).getToken()
            if response.status_code == 201 or response.status_code == 200:
                # Try to extract the broadsoft token from the response
                try:
                    broadsoft_token = xmltodict.parse(response.content)['LoginToken']['token']
                except:
                    return \
                        {
                            'message': '501: Internal Server Error. Successful response but token not found.',
                            'login':False,

                        }

                # Login was successful, store the information into a JWT
                access_token = create_access_token(identity={'id':data['username'],'pass':sha256.hash(data['password'])})
                refresh_token = create_refresh_token(identity={'id':data['username'],'pass':sha256.hash(data['password'])})
                response = jsonify({
                        'message':'User Login successful.',
                        'login':True,
                        'broadsoft_token': str(broadsoft_token)
                    })

                # Enforces the refresh and access cookies to be stored in a cookie instead of returning the cookies to
                # to the frontend.
                # Also sets the CSRF double submit protection cookies in this response
                set_refresh_cookies(response, refresh_token)
                set_access_cookies(response, access_token)
                return response
            else:
                return \
                    {
                        'message': response.content if response.content else "Error"
                    }, response.status_code

    class UserLogout(Resource):
        @jwt_required
        def post(self):
            response = jsonify({'message':'Logout Successful', 'logout':True})
            try:
                unset_jwt_cookies(response)
            except:
                return {'message':'Unable to remove cookie!','logout':False}, 501
            return response, 200

    class TokenRefresh(Resource):
        # Can only access this path using the refresh token.
        @jwt_refresh_token_required
        def post(self):
            # This endpoint will create and send back a new JWT access token.
            # The JWT refresh token is valid for 30 days. This allows user's to refresh their session
            current_user = get_jwt_identity()
            access_token = create_access_token(identity=current_user)

            response = jsonify({'message':'Access token refreshed.'})
            # Set the JWT token and enforce the response in the cookie.
            # Also sets the CSRF double submit protection cookies in this response
            set_access_cookies(response, access_token)
            return response, 200

    class AuthenticationTest(Resource):
        @jwt_required
        def post(self):
            return {'message':'Authentication Test Success'}