from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity,
                                set_access_cookies, set_refresh_cookies, unset_jwt_cookies)
from flask import jsonify
from REST.endpoints.broadsoft.BroadsoftConnector import BroadsoftConnector
from REST.auth.Proxy import Proxy


class Authenticator:

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
            username = data["username"] + "@imstas.stb1.com"
            password = data["password"]

            # Send the username and password to broadsoft and check that a token can be obtained from the endpoint.
            broadsoft_response = BroadsoftConnector().getToken(username, password)

            if broadsoft_response.status_code == 201 or broadsoft_response.status_code == 200:

                response = Proxy().to_client(broadsoft_response)

                # Create a JWT for this server.
                # Enforces the refresh and access cookies to be stored in a cookie instead of returning the cookies to
                # to the frontend.
                # Also sets the CSRF double submit protection cookies in this response
                access_token = create_access_token(identity=username)
                refresh_token = create_refresh_token(identity=username)
                set_refresh_cookies(response, refresh_token)
                set_access_cookies(response, access_token)

                return response
            else:
                return False, broadsoft_response

    class UserLogout(Resource):
        @jwt_required
        def post(self):
            response = jsonify({'message':'Logout Successful', 'logout':True})
            unset_jwt_cookies(response)
            return response

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
            return response

    class AuthenticationTest(Resource):
        @jwt_required
        def post(self):
            return {'message':'Authentication Test Success'}