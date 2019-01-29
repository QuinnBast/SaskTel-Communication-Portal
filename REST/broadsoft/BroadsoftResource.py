from flask_restful import Resource
from REST.server import config

class BroadsoftResource(Resource):
    def __init__(self):
        self.url = config.broadsoft_uri