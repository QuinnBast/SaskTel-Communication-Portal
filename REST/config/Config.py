class Config(object):
    JWT_COOKIE_CSRF_PROTECT = True      # Protect JWT tokens from CSRF
    JWT_EXPIRATION_DELTA = 180          # Number of minutes to keep tokens valid for
    JWT_TOKEN_LOCATION = ['cookies']    # Indicates where to store JWTs for user identity