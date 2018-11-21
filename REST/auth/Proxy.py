import xmltodict, dicttoxml, requests
from flask import Response, json

class Proxy:

    def to_broadsoft(self, method, url, data, cookies):
        # Convert the JSESSIONID Cookie to the broadsoft domain.
        broadsoft_cookie = {"JSESSIONID":cookies["JSESSIONID"]}

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
            response = Response(request.content)
            dict = xmltodict.parse(request.content)
            response.data = json.dumps(dict)

        # Convert cookies to our domain.
        for cookie in request.cookies:
            response.set_cookie(
                key=cookie.name,
                value=cookie.value,
                expires=cookie.expires,
                domain="127.0.0.1",  # This will need to change when running on PROD
                secure=False,       #This will need to change when running on PROD
                path="/broadsoft",
                httponly=True)

        return response
