class User:
    """
    A User object which holds the user's username and broadsoft token.

    The user's username and broadsoft cookie are stored in the JWT data and thus
    the user class can be genertaed from a JWT identity.
    """
    def __init__(self, username=None, cookie=None):
        """
        Constructor to create a user

        :param username: the username of the user
        :param cookie: the broadsoft access cookie which allows the user to access broadsoft endpoints.
        """
        self.username = username
        self.broadsoft_cookie = cookie
        pass

    def to_json(self):
        """
        Converts the user object into a JSON object for storage in a JWT
        :return: A json object of the user object.
        """
        return {'username':self.username,'broadsoft_cookie':self.broadsoft_cookie}

    def from_identity(self, identity):
        """
        Populates the user object with information from a JWT identity.
        :param identity: The JWT identity to populate the user's information from.
        :return: Returns the newly updated user object.
        """
        self.username = identity['username']
        self.broadsoft_cookie = identity['broadsoft_cookie']
        return self
