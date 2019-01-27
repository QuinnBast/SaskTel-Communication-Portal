[![Build Status](https://travis-ci.com/QuinnBast/SaskTel-Communication-Portal.svg?token=WPMw3ZqHaY9rAP8BGwXg&branch=master)](https://travis-ci.com/QuinnBast/SaskTel-Communication-Portal)

# SaskTel-Communication-Portal 
 A communication portal for SaskTel <br/>
 Made by [Quinn Bast](https://github.com/QuinnBast) and [Dakota Fisher](https://github.com/OmegaHelix)
## Setup
### Step 1 - Creating a virtual environment
In order to use the project, a python virtual environment must be created in order to ensure that this project is running off of its own dependencies of python. If you are setting up the project in PyCharm, a virtual environment is automatically created for the project. However, if you are not using PyCharm, a virtual environment needs to be created.
#### Option 1: With PyCharm
1. Close any open projects.
2. Create a new project and "Checkout from Version Control"
3.  `https://github.com/QuinnBast/SaskTel-Communication-Portal.git`
4. Ensure that a local virtual environment is created for the project in your project's settings (File->Settings->Project Interpreter)
    1. click the dropdown and click "select all"
    2. click the plus sign in the upper right corner, and then click apply.
    3. That's all, PyCharm will generate the rest.
#### Option 2: Using virtualenv
1. Clone the github repository into the destination of your choice.
2. Within the root folder of the repository, open the python command terminal
3. Check to see if you have pip installed `pip -h`
4. If the help appears, pip is installed, if not, [install pip](https://pip.pypa.io/en/latest/installing/)
5. `pip install virtualenv`
6. `virtualenv venv`
7. `venv\Scripts\activate` -- This may need to be run from the windows command prompt instead of the python terminal

### Step 2 - Installing Python dependencies
1. Open a terminal and navigate to the root directory of the project
2. Execute `pip install -r requirements.txt`


### Step 3 - Installing Javascript dependencies
1. Ensure that [node.js is installed](https://nodejs.org/en/#download) in order to access the javascript package manager npm.
    1. No addons need to be installed during this time, the basic LTS version will suffice. 
2. If you had to install Node.js, restart PyCharm or Your Python CMD window.
    1. Navigate back to the project root directory on the Terminal window.
3. Execute `cd frontend`
4. Execute `npm install`

### Step 4 - Change Configuration files
1. Within the project navigate to the `/REST/config/ProductionConfig.py` file.
2. [Generate a secret key](https://passwordsgenerator.net/) of any length and change the JWT_SECRET_KEY field.
3. Navigate to the `/REST/config/Config.py` file.
4. Ensure the configuration settings within the general config file are appropriate. 

### Step 4 - Building the Webpack bundle
In order to execute the project, all of the javascript dependencies, css libraries, etc must be packed into a bundle in order to prevent chain dependencies. Ensure you are in the frontend with `cd frontend`

##### Option 1: Bundling for development servers
1. Generate the bundled package by running `npm run watch` <br/>
`watch` is a custom script to bundle the front end files automatically. It will monitor for changes to files and automatically rebuild the bundle if a change is detected. This command will watch and rebuild the bundle until `Ctrl + C` is pressed.
    
##### Option 2: Bundling for production
1. Generate the bundled package by running `npm run prod` <br/>
`prod` is a custom script that will bundle the webpack files and dependencies once.


### Step 5 - Running the Flask Server

##### Option 1: Via PyCharm (for development only!)
The flask server can be ran inside of PyCharm to start a local web server where your content can be served from flask.
###### With PyCharm Professional: 
In order to do this, create a new run configuration in PyCharm in the top right and add a new `flask server` run configuration.
Set the `target` to `REST.server` and ensure you are using python 3.6 or above. Once configured click `apply`. Run the server with the play button.
###### With PyCharm Community:
At the bottom of PyCharm, open the terminal. Ensure you are in the `SaskTel-Communication-Portal` directory. Set the flask environment with the command `set FLASK_APP=REST/server.py`. This tells flask where the root file of the server is located. Run the server from the teriminal by executing `flask run`
###### With WSGI Server:
TODO - write information on how to configure for apache2 and wsgi.

##You're done!
If you followed all of the steps correctly you should be able to access the website in your browser. For development this will be at `http://127.0.0.1:5000/` and for production it will be under your domain or IP address. 
