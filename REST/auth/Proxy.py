import requests
from flask import Response

class Proxy:

    def to_broadsoft(self, request):
        # Create a flask response to send back
        response = Response(request.content)

        # Convert the JSESSIONID Cookie to the broadsoft domain.
        for cookie in request.cookies:
            if cookie.name == "JSESSIONID":
                response.set_cookie(
                    key=cookie.name,
                    value=cookie.value,
                    expires=cookie.expires,
                    domain="/com.broadsoft.xsi-actions",
                    secure=cookie.secure,
                    path=cookie.path,
                    httponly=True)

        return response

    def to_client(self, request):
        # Create a flask response to send back
        response = Response(request.content)

        # Convert cookies to our domain.
        for cookie in request.cookies:
            response.set_cookie(
                key=cookie.name,
                value=cookie.value,
                expires=cookie.expires,
                domain="127.0.0.1",  # This will need to change when running on PROD
                secure=cookie.secure,
                path=cookie.path,
                httponly=True)

        return response
