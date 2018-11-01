from flask import Flask, render_template
from REST.broadsoft.BroadsoftConnector import BroadsoftConnector
from flask_restful import Resource, Api
import random

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend")
api = Api(app)

api.add_resource(BroadsoftConnector, "/broadsoft")

@app.route('/')
def index():
    return render_template("index.html")


@app.route("/hello")
def hello():
    greeting_list = ['Hello', 'Hey', 'Sup', 'Yo', 'How you doing']
    return random.choice(greeting_list);


if __name__ == '__main__':
    app.run()
