from flask_restful import Resource

class BroadsoftResource(Resource):
    def __init__(self):
        self.url = "https://sdibcportal.ims.tsisd.ca/com.broadsoft.xsi-actions/v2.0"