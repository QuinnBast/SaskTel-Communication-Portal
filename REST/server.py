from flask import Flask
from flask_restful import Api
from REST.auth.Authenticator import Authenticator
from flask_jwt_extended import JWTManager
from REST.config.ConfigManager import ConfigManager
from REST.broadsoft.BroadsoftConnector import BroadsoftConnector

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend")

api = Api(app)

ConfigManager(app)
# Setup the JWT token manager on the application
# Set the application configuration settings from the configuration file.

jwt = JWTManager(app)

# Add REST endpoints to access them through a route
api.add_resource(Authenticator.UserLogin, "/rest/login")
api.add_resource(Authenticator.UserLogout, "/rest/logout")
api.add_resource(Authenticator.TokenRefresh, "/rest/token/refresh")
api.add_resource(BroadsoftConnector.getEndpoint, "/rest/broadsoft")


# Initialize the controllers.
# DO NOT DELETE THESE IMPORTS
from REST.controllers import IndexController


if __name__ == '__main__':
    app.run()
