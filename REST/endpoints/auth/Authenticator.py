from flask_restful import Resource, reqparse
from REST.endpoints.auth.User import User
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, set_refresh_cookies, unset_jwt_cookies)
from flask import jsonify
import jsonpickle


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

            # Create a user profile from the information obtained from the data sent.
            user = User(
                username=data['username'],
                password=data['password'],
                )

            # Attempt to log the user into broadsoft
            login_status, bad_response = user.login()

            # Check if the login was successful
            if login_status == False:
                # If the login failed, return the HttpResponse that was returned from broadsoft.
                return bad_response

            serializedUser = jsonpickle.encode(user)

            access_token = create_access_token(identity=serializedUser)
            refresh_token = create_refresh_token(identity=serializedUser)
            response = jsonify({
                    'message':'User Login successful.',
                    'login':True
                })

            # Enforces the refresh and access cookies to be stored in a cookie instead of returning the cookies to
            # to the frontend.
            # Also sets the CSRF double submit protection cookies in this response
            set_refresh_cookies(response, refresh_token)
            set_access_cookies(response, access_token)
            return response

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