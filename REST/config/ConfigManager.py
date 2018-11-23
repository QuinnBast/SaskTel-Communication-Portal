from configparser import ConfigParser
from REST.config.DevelopmentConfig import DevelopmentConfig

class ConfigManager:
    def __init__(self, app):
        app.config.from_object('REST.config.DevelopmentConfig.DevelopmentConfig')