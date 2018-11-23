import history from "../router/history";


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
            "username": this.username,
            "password": this.password,
        };
        let json = JSON.stringify(object);
        //Call server's login function
        let tmp;
        $.ajax({
            context: this,
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "json",
            success: function(response){
                this.authenticated = true;
                history.push("/");
            }
        });
    };

    logout() {
        this.authenticated = false;
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
