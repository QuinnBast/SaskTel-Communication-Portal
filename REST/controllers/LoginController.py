from REST.server import app
from flask import jsonify

@app.route("/user/login.html")
def login():
    return jsonify({'message':'Login Page Here'})