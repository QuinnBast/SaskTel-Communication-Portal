from REST.config.Config import Config

class ProductionConfig(Config):
    JWT_COOKIE_SECURE = True             # Cookies must be sent using HTTPS
    JWT_SECRET_KEY = "ChangeThis"  # Secret value used encrypt tokens