import history from "../router/history";
let Cookies = require("js-cookie");


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
        let object = {
            "username": this.username.replace(/[()-]/g, ''),
            "password": this.password,
        };
        // if the username isn't a full phone number, return.
        if (object.username.length  < 10 || object.password.length === 0)
        {
            if(object.username.length  < 10)
            {
                $('#username').get(0).style.borderColor = '#e74c3c';
                $('#usernameAlert').get(0).style.visibility = 'visible';
            }
            if(object.password.length === 0)
            {
                $('#password').get(0).style.borderColor = '#e74c3c';
                $('#passwordAlert').get(0).style.visibility = 'visible';
            }
            return;
        }


        let json = JSON.stringify(object);
        //Call server's login function
        // store auth in a variable to reference inside ajaxSetup
        let currAuth = this;
        $.ajax({
            context: this,
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "json",
            success: function(responseText, textStatus, jqxhr){
                $("#alert").get(0).hidden = true;
                this.authenticated = true;
                this.csrfToken = Cookies.get('csrf_access_token');
                // Configure future AJAX requests to send the csrf token along in the header.
                $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", currAuth.csrfToken);
                        }
                    }
                });

                history.push("/");
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
                $("#alert").get(0).hidden = false;
            },
        });
    };

    logout() {
        this.authenticated = false;
        this.username = "";
        this.password = "";
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
