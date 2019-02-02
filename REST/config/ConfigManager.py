class ConfigManager:
    def __init__(self, app):
        # app.config.from_object('REST.config.DevelopmentConfig.ProductionConfig')
        app.config.from_object('REST.config.DevelopmentConfig.DevelopmentConfig')