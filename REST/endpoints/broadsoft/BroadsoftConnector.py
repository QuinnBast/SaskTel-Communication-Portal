import requests
from flask_restful import Resource


class BroadsoftConnector(Resource):
    """
    A class to allow endpoints API calls
    """
    def __init__(self, username, password):
        """
        Constructor for the endpoints API to allow connections to the API
        """

        # The base url for endpoints calls
        self.username = username + "@imstas.stb1.com"
        self.url = "https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0"
        self.auth = (self.username, password)

    def getToken(self):
        """
        Sends a request to generate a token from broadsoft to check if the user is valid.
        :return: A dictionary response of the xml
        """

        response = requests.post(self.url + "/user/" + self.username + "/profile/loginToken",
                                auth=(self.auth))

        return response