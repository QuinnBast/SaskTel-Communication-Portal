import requests
import xmltodict


class BroadsoftConnector:
    """
    A class to allow broadsoft API calls
    """
    def __init__(self):
        """
        Constructor for the broadsoft API to allow connections to the API
        """
        self.url = "https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0/"
        self.login('3067190073@imstas.stb1.com', 'Abcdefg.1234')


    def login(self, username, password):
        """
        Authorizes the user's API calls if an unauthorized request is sent to the API
        :param username: The username of the user sending the request
        :param password: The password for the user sending the request
        :return:
        """
        # Create an authorization token.
        self.auth = (username, password)

    def getEndpoint(self, endpoint):
        """
        Sends a get request to the specified endpoint
        :param endpoint: The broadsoft endpoint to connect to
        :return: A dictionary response of the xml
        """
        response = requests.get(self.url + endpoint);
        if response.status_code == 401:
            response = requests.get(self.url + endpoint, auth=self.auth)
        responseDict = xmltodict.parse(response.content)
        return str(responseDict)