[![Build Status](https://travis-ci.com/QuinnBast/SaskTel-Communication-Portal.svg?token=WPMw3ZqHaY9rAP8BGwXg&branch=master)](https://travis-ci.com/QuinnBast/SaskTel-Communication-Portal)

# SaskTel-Communication-Portal 
 A communication portal for SaskTel
 Quinn Bast and Dakota Fisher
## Setup
### Step 1 - Creating a virtual environment
In order to use the project, a python virtual environment must be created in order to ensure that this project is running off of its own dependencies of python. If you are setting up the project in PyCharm, a virtual environment is automatically created for the project. However, if you are not using PyCharm, a virtual environment needs to be created.
#### With PyCharm
1. Close any open projects.
2. Create a new project and "Checkout from Version Control"
3.  `https://github.com/QuinnBast/SaskTel-Communication-Portal.git`
4. Ensure that a local virtual environment is created for the project in your project's settings (File->Settings->Project Interpreter)
    1. click the dropdown and click "select all"
    2. click the plus sign in the upper right corner, and then click apply.
    3. That's all, PyCharm will generate the rest.
#### Using virtualenv
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

### Step 4 -Executing the project
In order to execute the project, all of the javascript dependencies, css libraries, etc must be packed into a bundle in order to prevent chain dependencies.
1. `cd frontend`
2. Generate the bundled package by running `npm run watch`
    1. `watch` is a custom script to bundle the front end files automatically.
    2. It will monitor for changes to files until `Ctrl + C` is pressed.
    3. For production, this should be change to a `build once` model.
3. Configure the flask environmental variable by executing `set FLASK_APP=REST/server.py`
4. Run the server from the teriminal by executing `flask run`
5. Click the link in the PyCharm terminal, or Navigate to `127.0.0.1:5000` in your browser.
