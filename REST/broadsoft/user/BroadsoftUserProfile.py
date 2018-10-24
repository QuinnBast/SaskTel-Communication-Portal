from ..BroadsoftConnector import BroadsoftConnector

class BroadsoftUserProfile(BroadsoftConnector):
    def __init__(self, user_id):
        """
        :param userid: The userid sending the request
        """
        super().__init__()
        self.user_id = user_id

    def getUserProfile(self):
        """
        Gets the user's profile
        :return: A dictionary response of the xml
        """
        return self.getEndpoint("user/" + self.user_id + "/profile");

    def getUserDevices(self):
        """
        Gets a list of the user's devices
        :return: A dictionary response of the xml
        """
        return self.getEndpoint("user/" + self.user_id + "/profile/Device");

    def getUserDeviceToken(self, deviceName, deviceLevel):
        """
        Gets the device token for the specified user's device
        :param deviceName: The name of the access device
        :param deviceLevel: The subscriber level of the access device
        :return: A dictionary of the xml response
        """
        return self.getEndpoint("user/" + self.user_id + "/profile/deviceToken?deviceName=" + deviceName + "&deviceLevel=" + deviceLevel);

    def get_user_feature_access_codes(self):
        """
        Retrieves all feature access codes configured for the services which are assigned for a particular user.
        :return:
        """
        return self.getEndpoint("user/" + self.user_id + "/profile/Fac");

    def get_user_login_token(self):
        """
        Generates a login token to authenticate the user. Token has a 60 second expiry period.
        :return: Dictionary of xml response
        """
        return self.getEndpoint("user/" + self.user_id + "/LoginToken")

