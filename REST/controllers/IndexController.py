from REST.server import app
import random
from flask import render_template
from flask import send_from_directory


@app.route('/favicon.ico')
def favicon():
        return send_from_directory(app.root_path,
                                   'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def app_page(path):
    if "rest/" not in path:
        return render_template('index.html')