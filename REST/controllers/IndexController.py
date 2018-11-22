from REST.server import app
import random
from flask import render_template

@app.route('/')
def index():
    return render_template("index.html")


@app.route("/hello")
def hello():
    greeting_list = ['Hello', 'Hey', 'Sup', 'Yo', 'How you doing']
    return random.choice(greeting_list)
