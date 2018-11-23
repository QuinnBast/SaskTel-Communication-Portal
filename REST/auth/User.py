from flask import json

class User:
    def __init__(self, username=None, cookie=None):
        self.username = username
        self.broadsoft_cookie = cookie
        pass

    def to_json(self):
        return {'username':self.username,'broadsoft_cookie':self.broadsoft_cookie}

    def from_identity(self, identity):
        self.username = identity['username']
        self.broadsoft_cookie = identity['broadsoft_cookie']
        return self
