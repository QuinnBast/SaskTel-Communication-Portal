import requests
from flask import Response

class Proxy:
    """
    A Class to proxy requests from the client to broadsoft.
    This class ensures that cookies are extracted and sent along with a request to broadsoft
    """

    def to_broadsoft(self, method, url, data, user):
        """
        Send an HTTP request to broadsoft.
        :param method: The method do use ex) GET, DELETE, PUT, ...
        :param url: The URL to send a request to
        :param data: Data to send along with the request
        :param user: The user sending the request.
        :return: A request object with the appropriate cookies, data, etc.
        """

        # get the user's broadsoft cookie and create a cookie to set in the request.
        broadsoft_cookie = {"JSESSIONID":user.broadsoft_cookie}

        # Generate a new request to broadsoft
        broadsoft_request = requests.request(
            method=method,
            url=url,
            data=data,
            cookies=broadsoft_cookie
        )

        # Return the request
        return broadsoft_request

    def to_client(self, request=None):
        """
        Sends a response back to the client after recieving a response from broadsoft.
        :param request: A request to extract the response body and set the body of the response
        :return: A flask Response object
        """

        if request is None:
            response = Response()
        else:
            # If the initial request had content in the body, set the response body to this content
            if request.content:
                response = Response(request.content)
            else:
                response = Response()

        return response
