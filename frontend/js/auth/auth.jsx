import history from "../router/history";
import Broadsoft from "../broadsoft/broadsoft"


let $ = require('jquery');

class Auth {
    constructor() {
        this.authenticated = false;
        this.username = "";
        this.password ="";
        this.csrfToken =  "";
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login () {
        //Validate the user's input.
        // if the username isn't a full phone number, return.
        if(this.username.replace(/[()-]/g, '').length  < 10)
        {
            $('#username').get(0).style.borderColor = '#e74c3c';
            $('#usernameAlert').get(0).style.visibility = 'visible';
            return;
        }

        if(this.password.length === 0)
        {
            $('#password').get(0).style.borderColor = '#e74c3c';
            $('#passwordAlert').get(0).style.visibility = 'visible';
            return;
        }

        //Async login call
        Broadsoft.login(function(result){
            if(result){
                $("#alert").get(0).style.style.visibility = 'hidden';
                history.push("/");
            } else {
                $("#alert").get(0).style.style.visibility = 'visible';
            }
        });
    };

    logout() {
        Broadsoft.logout();
        // Don't wait for the server's response to logout.
        this.authenticated = false;
        this.username = "";
        this.password = "";
        history.push("/login");
    };

    isAuthenticated() {
        return this.authenticated;
    };

    handleUsernameChange(ev) {
        this.username = ev.target.value;
    };

    handlePasswordChange(ev) {
        this.password = ev.target.value;
    };

    handleUsernameBlur(ev) {
        if( ev.target.value.replace(/[()_-]/g,'').length < 10){
            $('#username').get(0).style.borderColor = '#e74c3c';
            $('#usernameAlert').get(0).style.visibility = 'visible';
        }
        else
        {
            $('#username').get(0).style.borderColor = '';
            $('#usernameAlert').get(0).style.visibility = 'hidden';
        }

    };
        handlePasswordBlur(ev) {
        if(ev.target.value.length === 0){
            $('#password').get(0).style.borderColor = '#e74c3c';
            $('#passwordAlert').get(0).style.visibility = 'visible';
        }
        else
        {
            $('#password').get(0).style.borderColor = '';
            $('#passwordAlert').get(0).style.visibility = 'hidden';
        }

    };
}

export default new Auth();
