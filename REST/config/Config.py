import datetime

class Config(object):
    JWT_COOKIE_CSRF_PROTECT = True      # Protect JWT tokens from CSRF
    JWT_EXPIRATION_DELTA = datetime.timedelta(seconds=4)          # Number of hours to keep tokens valid for
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(seconds=4)      # Number of hours to keep access tokens valid for
    JWT_TOKEN_LOCATION = ['cookies']    # Indicates where to store JWTs for user identity