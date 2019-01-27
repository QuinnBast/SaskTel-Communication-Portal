import datetime
import logging as flaskLog


###
###
### General configuration settings.
###
###

class GeneralConfig():
    username_domain = "@imstas.stb1.com"    # The domain name that gets appended to the username when a user logs in.
    logging = True                          # If the server should log outputs to the REST/logs/output.log file
    logging_level = flaskLog.INFO           # If logging is set to true, this configuration determines what type of
                                            # information is logged to the log file.
                                            # Logging levels are as follows:
                                            # flaskLog.DEBUG    -   Send any and all text
                                            # flaskLog.INFO     -   Send everything but debug messages (RECOMMENDED)
                                            #                       this will log all requests and access attempts to server endpoints
                                            # flaskLog.WARNING  -   Send up to warning messages
                                            # flaskLog.ERROR    -   Send only error messages
                                            # flaskLog.CRITICAL -   Send only errors for critical errors. Highly reccommend not using this level as the information provided is very minimal.

    verbose = True                          # If the server should output information to the terminal.
    verbose_level = flaskLog.INFO           # If the server is ouputting information to the terminal, this configuration determines
                                            # what level of information is output. Note: These levels are the same as the logging levels.
                                            # Logging levels are as follows:
                                            # flaskLog.DEBUG    -   Send any and all text
                                            # flaskLog.INFO     -   Send everything but debug messages (RECOMMENDED)
                                            #                       this will log all requests and access attempts to server endpoints
                                            # flaskLog.WARNING  -   Send up to warning messages
                                            # flaskLog.ERROR    -   Send only error messages
                                            # flaskLog.CRITICAL -   Send only errors for critical errors. Highly reccommend not using this level as the information provided is very minimal.

    broadsoft_uri = "https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0"
                                            # The base endpoint to access broadsoft REST endpoints


###
###
### NOTE: The settings below this line should likely not be changed.
### Only change these settigs if you know what you are doing!
###
###

class Config(object):
    # These configuration options should not be changed to ensure security of the application
    JWT_COOKIE_CSRF_PROTECT = True      # Protect JWT tokens from CSRF
    JWT_TOKEN_LOCATION = ['cookies']    # Indicates where to store JWTs for user identity

    # These configuration options determine how long a user's session can last with the token after logging in
    JWT_EXPIRATION_DELTA = datetime.timedelta(hours=4)  # Number of hours to keep tokens valid for
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=4)  # Number of hours to keep access tokens valid for