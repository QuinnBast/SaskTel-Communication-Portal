import requests
import xmltodict
from flask_restful import Resource, reqparse


class BroadsoftConnector(Resource):
    """
    A class to allow broadsoft API calls
    """
    def __init__(self):
        """
        Constructor for the broadsoft API to allow connections to the API
        """
        self.url = "https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0"
        self.auth = ('3067190073@imstas.stb1.com', 'Abcdefg.1234')

    def get(self):
        """
        Sends a get request to the specified endpoint
        :param headers: headers to send with the request
        :param data: data to send with the request
        :param endpoint: The broadsoft endpoint to connect to
        :return: A dictionary response of the xml
        """
        parser = reqparse.RequestParser()
        parser.add_argument(name='endpoint', type='string', help='You did not specify an endpoint.', required=True)
        parser.add_argument('data', type='json', help='Data must be a json object.')
        parser.add_argument('headers', type='json', help='Headers must be a json object.')

        args = parser.parse_args()

        response = requests.get(self.url + args['endpoint'], data=args['data'], headers=args['headers'])
        if response.status_code == 401:
            response = requests.get(self.url + args['endpoint'], data=args['data'], headers=args['headers'], auth=self.auth)
        responseDict = xmltodict.parse(response.content)
        return str(responseDict)

    def post(self):
        """
        Sends a get request to the specified endpoint
        :return: A dictionary response of the xml
        """

        #Ensure that when sending a post request the data is sent as "json=" and not in the "data=" field
        parser = reqparse.RequestParser()
        parser.add_argument('endpoint', type=str, help='You did not specify an endpoint.', required=True, location='json')
        parser.add_argument('data', type=str, help='Data must be passed in as a string of a json object.', location='json')
        parser.add_argument('headers', type=str, help='Headers must be passed in as a string of a json object.', location='json')

        args = parser.parse_args()

        response = requests.get(self.url + args['endpoint'], data=args['data'], headers=args['headers'])
        if response.status_code == 401:
            response = requests.get(self.url + args['endpoint'], data=args['data'], headers=args['headers'], auth=self.auth)
        responseDict = xmltodict.parse(response.content)
        return str(responseDict)