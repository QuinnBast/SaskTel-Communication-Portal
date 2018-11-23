
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
        this.authenticated = true;
        let object = {
            "username":this.username,
            "password":this.password,
        };
        let json = JSON.stringify(object);
        //Call server's login function
        $.ajax({
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "json",
            success: (data) => {
                if(data["login"] === true){
                    //A cookie has already been set.
                    this.authenticated = true;
                    props.history.push("/");
                    //!!!! STORE THE CSRF TOKEN IN REACT STORE HERE!!!!!///
                }
            },
            failure: (data) => {
                console.log(data)
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
