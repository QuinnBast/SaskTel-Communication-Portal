# Needs to be initialized first otherwise modules that depend on the configuration values will fail
from REST.config.Config import GeneralConfig
import logging, logging.config, yaml
config = GeneralConfig()

# Configure the logging to log to a file if logging is configured
if config.logging:
    logging.config.dictConfig(yaml.load(open('REST/logs/logging.conf')))
    logfile = logging.getLogger('file')
    logfile.setLevel(config.logging_level)

# Configure the console logging levels.
logconsole = logging.getLogger('console')
logconsole.setLevel(config.verbose_level)

# Configure werkzeug to be the same as the verbose config.
log = logging.getLogger('werkzeug')
log.setLevel(config.verbose_level)

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

# Create a global whitelist variable which is a list of the generated tokens.
# Access to endpoints will be checked against the JWT whitelist to ensure
# that a token being used was generated by the application.

whitelist = set()

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