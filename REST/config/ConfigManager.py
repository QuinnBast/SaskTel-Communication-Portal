from configparser import ConfigParser
from REST.config.config import config, config_static

class ConfigManager:
    def __init__(self, app):
        app.config.update(config)
        app.config.update(config_static)