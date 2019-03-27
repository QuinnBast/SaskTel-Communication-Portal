/**
 *  Navigation Imports
 */
import history from "./history";
import {refresh} from '../App'

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft"

import Cookies from "js-cookie";

let $ = require('jquery');

class Auth {
    constructor() {
        this.authenticated = false;
        this.username = "";
        this.password = "";
        this.refreshToken = "";
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);

        // Check if a session is set
        if (this.doesSessionExist()) {
            this.sessionSetup();
        }
    }

    doesSessionExist =() => {
        return sessionStorage.getItem("authenticated") === "true";
    };

    sessionSetup = () => {
        this.attemptRefresh();
    };


    attemptRefresh = (retryFunction, args) => {
        this.username = sessionStorage.getItem("username");
        this.refreshToken = sessionStorage.getItem("refreshToken");

            let self = this;

            if (self.refreshToken === undefined) {
                self.logout();
                return;
            }
            // Configure future AJAX request to send the csrf refresh token along in the header.
            $.ajaxSetup({
                beforeSend: function (xhr, settings) {
                    if (!this.crossDomain) {
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
                    sessionStorage.setItem("username", self.username);
                    sessionStorage.setItem("refreshToken", self.refreshToken);
                    // Configure future AJAX requests to send the access token along in the header.
                    $.ajaxSetup({
                        beforeSend: function (xhr, settings) {
                            if (!this.crossDomain) {
                                xhr.setRequestHeader("X-CSRF-TOKEN", self.csrfToken);
                            }
                        },
                        data: {"CSRFToken": self.csrfToken}
                    });

                    // Retry the function if a retry function was sent.
                    if (retryFunction !== undefined) {
                        if (args !== undefined) {
                            retryFunction(args);
                        } else {
                            retryFunction();
                        }
                    }

                    refresh();
                },
                error: function () {
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

        BroadSoft.login().then(function(result){
                self.authenticated = true;
                self.csrfToken = Cookies.get('csrf_access_token');
                self.refreshToken = Cookies.get('csrf_refresh_token');

                sessionStorage.setItem("authenticated", self.authenticated.toString());
                sessionStorage.setItem("username", self.username);
                sessionStorage.setItem("refreshToken", self.refreshToken);
                $("#alert").get(0).style.visibility = 'hidden';
                history.push("/");
            }, function(result){


                self.authenticated = false;
                sessionStorage.removeItem("authenticated");
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("refreshToken");

                if(result.status === 599){
                    $("#alert").get(0).innerHTML = "Unable to connect to authentication server. Please try again.";
                    $("#alert").get(0).style.visibility = 'visible';
                    $('#LoginButton:first').removeClass('loading');
                } else {
                    $("#alert").get(0).innerHTML = "Invalid login credentials. Please try again.";
                    $("#alert").get(0).style.visibility = 'visible';
                    $('#LoginButton:first').removeClass('loading');
                }
            });
    };

    logout() {
        //Clear the ajax configuration so that it no longer sends the CSRF token.
        $.ajaxSetup({
            beforeSend: undefined,
            data: undefined
        });

        // Reset the Auth
        this.authenticated = false;
        this.username = "";
        this.password = "";

        // Remove the sessionStorage settings.
        sessionStorage.removeItem("authenticated");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("refreshToken");

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
