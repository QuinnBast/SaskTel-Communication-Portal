/**
 *  Navigation Imports
 */
import history from "./history";

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft"


/**
 * Allows accessing cookies
 */
let Cookies = require("js-cookie");

let $ = require('jquery');

class Auth {
    constructor() {
        this.authenticated = false;
        this.username = "";
        this.password ="";
        this.csrfToken =  "";
        this.refreshToken = "";
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);

        // Check if a session is set
        if(localStorage.getItem("refreshToken") !== undefined){
            this.authenticated = true;
            this.username = localStorage.getItem("username");
            this.refreshToken = localStorage.getItem("refreshToken");

            this.attemptRefresh()
        }
    }

    attemptRefresh(retryFunction, args){

        let self = this;

        if(self.refreshToken === undefined){
            self.logout();
        }
        // Configure future AJAX request to send the csrf refresh token along in the header.
        $.ajaxSetup({
            beforeSend: function(xhr, settings){
                if(!this.crossDomain){
                    xhr.setRequestHeader("X-CSRF-TOKEN", self.refreshToken);
                }
            },
            data: {"CSRFToken": self.refreshToken}
        });

        $.ajax({
            type: "POST",
            url: "/rest/token/refresh",
            contentType: "application/json",
            success: function (responseText, textStatus, jqxhr) {
                self.authenticated = true;
                self.csrfToken = Cookies.get('csrf_access_token');
                self.refreshToken = Cookies.get('csrf_refresh_token');
                localStorage.setItem("username", self.username);
                localStorage.setItem("refreshToken", self.refreshToken);
                // Configure future AJAX requests to send the access token along in the header.
                $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", self.csrfToken);
                        }
                    },
                    data: {"CSRFToken":self.csrfToken}
                });

                // Retry the function if a retry function was sent.
                if(retryFunction !== undefined){
                    if(args !== undefined){
                        retryFunction(args);
                    } else {
                        retryFunction();
                    }
                }
            },
            error: function(){
                // Logout if an access token could not be generated.
                self.logout();
            }
        });
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
                localStorage.setItem("username", self.username);
                localStorage.setItem("refreshToken", self.refreshToken);
                $("#alert").get(0).style.visibility = 'hidden';
                history.push("/");
            },
            error: function(result){
                $("#alert").get(0).style.visibility = 'visible';
                $('#LoginButton:first').removeClass('loading');
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
        localStorage.removeItem("username");
        localStorage.removeItem("refreshToken");

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
