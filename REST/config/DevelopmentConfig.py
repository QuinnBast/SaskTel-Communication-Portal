from REST.config.Config import Config

class DevelopmentConfig(Config):
    JWT_COOKIE_SECURE = False             # Cookies must be sent using HTTPS
    JWT_SECRET_KEY = ']4kv+S$Eb+N[t>ez'   # Secret value used encrypt tokens
    environment = 'Dev'