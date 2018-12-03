import xmltodict, dicttoxml, requests
from flask import Response, jsonify, json
from collections import OrderedDict

class Proxy:

    def to_broadsoft(self, method, url, data, user):
        # Convert the JSESSIONID Cookie to the broadsoft domain.
        broadsoft_cookie = {"JSESSIONID":user.broadsoft_cookie}

        broadsoft_request = requests.request(
            method=method,
            url=url,
            data=data,
            cookies=broadsoft_cookie
        )

        return broadsoft_request

    def to_client(self, request=None):

        if request is None:
            response = Response()
        else:
            if request.content:
                response = Response(request.content)
                dict = xmltodict.parse(request.content.decode('UTF-8'))
                response.data = json.dumps({'data':json.dumps(dict)})
            else:
                response = Response()

        return response
