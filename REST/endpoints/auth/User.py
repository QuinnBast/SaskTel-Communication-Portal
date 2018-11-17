from REST.endpoints.broadsoft.BroadsoftConnector import BroadsoftConnector
from datetime import datetime, timedelta
import xmltodict

class User:
    def __init__(self, username, password, token=None):
        self.username = username + "@imstas.stb1.com"
        self.password = password
        self.broadsoft_token = token
        self.token_date = datetime(year=1900, month=1, day=1, hour=1, minute=1, second=1)

    def login(self):
        """
        Attempts to login the user.
        :return: boolean, if the login was successful or not
        """
        # Send the username and password to broadsoft and check that a token can be obtained from the endpoint.
        response = BroadsoftConnector().getToken(self)
        if response.status_code == 201 or response.status_code == 200:
            # Try to extract the broadsoft token from the response
            try:
                broadsoft_token = xmltodict.parse(response.content)['LoginToken']['token']
                self.broadsoft_token = broadsoft_token
                self.token_date = datetime.now()
                return True, None
            except:
                return False, response
        else:
            return False, response

    def isTokenValid(self):
        # Check if the time that the broadsoft token was issued is within the last 60 seconds.
        # Tokens last 60 seconds, thus to ensure processing and transmission delays do not mess up the response, use 50s

        if datetime.now() - self.token_date > timedelta(seconds=50):
            return False
        else:
            return True

    def getNewToken(self):
        return self.login()