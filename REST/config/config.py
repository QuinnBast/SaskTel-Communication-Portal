config = {
    # This is a secret key used by JWT to encode tokens. Generate a random hash/password and paste it here
    "JWT_SECRET_KEY" : "jwt-secret-key",

    # Are requests sent with HTTPS?
    # In a production server this should be True!
    'JWT_COOKIE_SECURE' : False,
}



# These values are configuration settings for the Flask application that should NOT be changed by the user.
# DO not change these values unless you know what you are doing!

config_static = {
    # Protect JWT Tokens from CSRF
    'JWT_COOKIE_CSRF_PROTECT': True,

    # The number of minutes to keep KWT login tokens for
    'JWT_EXPIRATION_DELTA': 30,

    # Indicates where to store the JWT's for user identity
    'JWT_TOKEN_LOCATION': ['cookies'],
}