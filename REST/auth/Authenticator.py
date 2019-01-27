from flask_restful import Resource, reqparse
from flask import make_response
from flask_jwt_extended import (create_access_token, create_refresh_token, verify_jwt_in_request, jwt_refresh_token_required, get_jwt_identity,
                                set_access_cookies, set_refresh_cookies, unset_jwt_cookies, verify_jwt_refresh_token_in_request)
from REST.broadsoft.BroadsoftConnector import BroadsoftConnector
from REST.auth.Proxy import Proxy
from REST.auth.User import User
from REST.server import config, logconsole


class Authenticator:
    """
    Class to perform user authentication
    """

    class UserLogin(Resource):
        """
        Subclass in order to allow flask-jwt-extended to set a REST endpoint
        """


        def post(self):
            """
            Triggered when login endpoint is accessed
            :return: HTTP response
            """

            if config.verbose:
                logconsole.info("Request to /rest/login")

            # Create a request parser to ensure the proper parameters were passed
            parser = reqparse.RequestParser()

            # Configure the required arguments for the endpoint.
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
            try:
                data = parser.parse_args()
            except reqparse.exceptions.BadRequest as e:
                # If there are any errors, ensure that login=False is sent.
                message = "<login>false</login>"
                return message, e.code

            # Grab the user's username and password from the login request.
            username = data["username"] + config.username_domain
            password = data["password"]

            # Send the username and password to broadsoft and check that a token can be obtained from the endpoint.
            broadsoft_response = BroadsoftConnector().getToken(username, password)

            # Check if a valid response was obtained from broadsoft.
            if broadsoft_response.status_code == 201 or broadsoft_response.status_code == 200:

                # Create a new response to the client
                response = Proxy().to_client()

                # Create a JWT.
                # Enforces the refresh and access cookies to be stored in a cookie.
                # Also sets the CSRF double submit protection cookies in this response
                access_token = create_access_token(identity=User(username, broadsoft_response.cookies["JSESSIONID"]).to_json())
                refresh_token = create_refresh_token(identity=User(username, broadsoft_response.cookies["JSESSIONID"]).to_json())
                set_refresh_cookies(response, refresh_token)
                set_access_cookies(response, access_token)

                if config.verbose:
                    logconsole.info("Successful Login.")

                response.data = "<login>true</login>"

                return response
            else:
                if config.verbose:
                    logconsole.info("Invalid login credentials.")

                return "<login>false</login>", broadsoft_response.status_code

    class UserLogout(Resource):
        """
        Class to ensure flask-jwt-extended can create a REST endpoint
        """

        def post(self):
            """
            When logout is accessed via POST
            :return: returns an HHTP response
            """

            # Ensure that the user has sent a jwt to the endpoint.
            try:
                verify_jwt_in_request()
            except Exception as error:
                return make_response("<error>Unauthorized</error>", 401)

            response = Proxy().to_client()
            response.data = "<logout>true</logout>"

            # Unsets the JWT
            unset_jwt_cookies(response)
            return response

    class TokenRefresh(Resource):
        # Can only access this path using the refresh token.

        def post(self):

            try:
                verify_jwt_refresh_token_in_request()
            except Exception as error:
                from ..server import app
                import logging
                app.logger.log(logging.INFO, error)
                return make_response("<error>Unauthorized</error>", 401)

            # This endpoint will create and send back a new JWT access token.
            # The JWT refresh token is valid for 30 days. This allows user's to refresh their session
            current_user = get_jwt_identity()
            access_token = create_access_token(identity=current_user)

            # Create a new response to the client
            response = Proxy().to_client()
            response.data = "<message>Access token refreshed</message>"

            # Set the JWT token and enforce the response in the cookie.
            # Also sets the CSRF double submit protection cookies in this response
            set_access_cookies(response, access_token)
            return response
