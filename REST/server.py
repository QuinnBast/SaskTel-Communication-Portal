from flask import Flask, render_template
from REST.broadsoft.user.BroadsoftUserProfile import BroadsoftUserProfile
import random

app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend")


@app.route('/')
def index():
    return render_template("index.html")


@app.route("/hello")
def hello():
    greeting_list = ['Hello', 'Hey', 'Sup', 'Yo', 'How you doing']
    return random.choice(greeting_list);


@app.route("/user/<string:username>/profile")
def broadsoft(username):
    return BroadsoftUserProfile(username).getUserProfile()


if __name__ == '__main__':
    app.run()
