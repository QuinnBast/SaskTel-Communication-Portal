class Config(object):
    JWT_COOKIE_CSRF_PROTECT = True      # Protect JWT tokens from CSRF
    JWT_EXPIRATION_DELTA = 30           # Number of minutes to keep tokens valid for
    JWT_TOKEN_LOCATION = ['cookies']    # Indicates where to store JWTs for user identity
    JSON_SORT_KEYS = False              # JSON should not automatically sort the keys when parsing.