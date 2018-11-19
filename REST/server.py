from flask import Flask
from flask_restful import Api
from REST.endpoints.auth.Authenticator import Authenticator
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask import url_for

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend")

api = Api(app)


# Configure JSON Web Tokens (JWT)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'     # THIS NEEDS TO CHANGE TO A MORE SECURE TOKEN/KEY
app.config['JWT_EXPIRATION_DELTA'] = timedelta(minutes=30)
jwt = JWTManager(app)

# Add REST endpoints to access them through a route
api.add_resource(Authenticator.UserLogin, "/rest/login")
api.add_resource(Authenticator.UserLogout, "/rest/logout")
api.add_resource(Authenticator.TokenRefresh, "/rest/token/refresh")
api.add_resource(Authenticator.AuthenticationTest, "/rest/test")


# Initialize the controllers.
# DO NOT DELETE THESE IMPORTS
from REST.controllers import IndexController
from REST.controllers import LoginController


if __name__ == '__main__':
    app.run()
