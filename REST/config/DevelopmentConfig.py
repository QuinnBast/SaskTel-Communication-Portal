from REST.config.Config import Config

class DevelopmentFlaskConfig(Config):
    JWT_COOKIE_SECURE = False             # Cookies must be sent using HTTPS
    JWT_SECRET_KEY = 'ChangeThis'   # Secret value used encrypt tokens
    environment = 'Dev'