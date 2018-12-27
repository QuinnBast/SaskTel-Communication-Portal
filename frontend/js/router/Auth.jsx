/**
 *  Navigation Imports
 */
import history from "./history";

/**
 *  REST API Imports
 */
import BroadSoft from "../BroadSoft/BroadSoft"


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

        // Check if a session is set
        if(localStorage.getItem("authenticated") === "true"){
            this.authenticated = localStorage.getItem("authenticated");
            this.username = localStorage.getItem("username");
            this.csrfToken = localStorage.getItem("csrfToken");

            // Configure requests to have csrf token in the header.
            $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", this.csrfToken);
                        }
                    },
                    data: {"CSRFToken":this.csrfToken}
                });
        };
    }

    login (e) {
        e.preventDefault();
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
        $('#LoginButton:first').addClass('loading');
        //Async login call
        let self = this;
        BroadSoft.login({
            success: function(result){
                localStorage.setItem("authenticated", self.authenticated.toString());
                localStorage.setItem("username", self.username);
                localStorage.setItem("csrfToken", self.csrfToken);
                $("#alert").get(0).style.visibility = 'hidden';
                history.push("/");
            },
            error: function(result){
                localStorage.setItem("authenticated", "false");
                $("#alert").get(0).style.visibility = 'visible';
            }
        });
    };

    logout() {
        BroadSoft.logout();
        // Don't wait for the server's response to logout.

        //Clear the ajax configuration so that it no longer sends the CSRF token.
        $.ajaxSetup({
            beforeSend: undefined,
            data: undefined
        });

        // Reset the Auth
        this.authenticated = false;
        this.username = "";
        this.password = "";

        // Remove the localStorage settings.
        localStorage.removeItem("authenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("csrfToken");

        // Prevent the user navigating back.
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
