from flask import Flask
from flask_restful import Api
from REST.endpoints.auth.Authenticator import Authenticator
from flask_jwt_extended import JWTManager
from datetime import timedelta

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend")
api = Api(app)

# Configure JSON Web Tokens (JWT)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'     # THIS NEEDS TO CHANGE TO A MORE SECURE TOKEN/KEY
app.config['JWT_EXPIRATION_DELTA'] = timedelta(minutes=30)

# Configure application to store JWTs in cookies. Whenever you make
# a request to a protected endpoint, you will need to send in the
# access or refresh JWT via a cookie.
app.config['JWT_TOKEN_LOCATION'] = ['cookies']


# Only allow JWT cookies to be sent over https.
# This should be set to true in production!
app.config['JWT_COOKIE_SECURE'] = False

# Enable csrf double submit protection. See this for a thorough
# explanation: http://www.redotheweb.com/2015/11/09/api-security.html
app.config['JWT_COOKIE_CSRF_PROTECT'] = True

# Set the cookie paths, so that you are only sending your access token
# cookie to the access endpoints, and only sending your refresh token
# to the refresh endpoint. Technically this is optional, but it is in
# your best interest to not send additional cookies in the request if
# they aren't needed.
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'

jwt = JWTManager(app)

# Add REST endpoints to access them through a route
api.add_resource(Authenticator.UserLogin, "/login")
api.add_resource(Authenticator.UserLogout, "/logout")
api.add_resource(Authenticator.TokenRefresh, "/token/refresh")
api.add_resource(Authenticator.AuthenticationTest, "/test")

# Initialize the controllers.
# DO NOT DELETE THESE IMPORTS
from REST.controllers import IndexController, LoginController

if __name__ == '__main__':
    app.run()
