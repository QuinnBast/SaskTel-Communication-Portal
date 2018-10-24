# SaskTel-Communication-Portal
A communication portal for SaskTel

## Setup
### Step 1 - Creating a virtual environment
In order to use the project, a python virtual environment must be created in order to ensure that this project is running off of its own dependencies of python. If you are setting up the project in PyCharm, a virtual environment is automatically created for the project. However, if you are not using PyCharm, a virtual environment needs to be created.
#### With PyCharm
1. Close any open projects.
2. Create a new project and "Checkout from Version Control"
3.  `https://github.com/QuinnBast/SaskTel-Communication-Portal.git`
4. Ensure that a local virtual environment is created for the project in your project's settings (File->Settings->Project Interpreter)
#### Using virtualenv
1. Clone the github repository into the destination of your choice.
2. Within the root folder of the repository, open the python command terminal
3. Check to see if you have pip installed `pip -h`
4. If the help appears, pip is installed, if not, [install pip](https://pip.pypa.io/en/latest/installing/)
5. `pip install virtualenv`
6. `virtualenv venv`
7. `venv\Scripts\activate` -- This may need to be run from the windows command prompt instead of the python terminal

### Step 2 - Installing Python dependencies
In the root directory of the project execute `pip install -r requirements.txt`

### Step 3 - Installing Javascript dependencies
1. Ensure that [node.js is installed](https://nodejs.org/en/#download) in order to access the javascript package manager npm.
2. If you had to install Node.js, restart PyCharm (or your python command window) so that the terminal recognizes npm exists.
2. `cd frontend`
3. `npm install`

### Step 4 -Executing the project
In order to execute the project, all of the javascript dependencies, css libraries, etc must be packed into a bundle in order to prevent chain dependencies.
1. `cd frontend`
2. Generate the bundled package by running `npm run watch`
2.1. The `watch` parameter lets the package manager automatically update the bundle when any changes are detected in the frontend files. This allows easier development, however this should not be used for a production build.
3. `set FLASK_APP=REST/server.py`
4. `python -m flask run`
5. Navigate to `127.0.0.1:5000` in your browser