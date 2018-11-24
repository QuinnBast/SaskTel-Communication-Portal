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
            "username": this.username.replace(/-/g, ''),
            "password": this.password,
        };
        let json = JSON.stringify(object);
        //Call server's login function
        $.ajax({
            context: this,
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "json",
            success: function(responseText, textStatus, jqxhr){
                this.authenticated = true;
                this.token = Cookies.get('csrf_access_token');

                // Configure future AJAX requests to send the csrf token along in the header.
                $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", auth.csrfToken);
                        }
                    }
                });

                history.push("/");
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
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
}

export default new Auth();
