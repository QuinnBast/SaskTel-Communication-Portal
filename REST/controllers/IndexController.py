from REST.server import app
import random
from flask import render_template

@app.route("/hello")
def hello():
    greeting_list = ['Hello', 'Hey', 'Sup', 'Yo', 'How you doing']
    return random.choice(greeting_list);


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def app_page(path):
    if "rest/" not in path:
        return render_template('index.html')
