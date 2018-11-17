from flask import Flask
from flask_restful import Api
from REST.endpoints.auth.Authenticator import Authenticator
from flask_jwt_extended import JWTManager
from datetime import timedelta
from REST.config.ConfigManager import ConfigManager

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend")
api = Api(app)

# Set the application configuration settings from the configuration file.
ConfigManager(app)

# Setup the JWT token manager on the application
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
