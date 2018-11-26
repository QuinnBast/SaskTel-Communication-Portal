let Cookies = require("js-cookie");
import auth from "../auth/auth"

let $ = require('jquery');

class Broadsoft {

    constructor(){

    }

    login(callback) {
        let object = {
            "username": auth.username.replace(/[()-]/g, ''),
            "password": auth.password,
        };

        let json = JSON.stringify(object);
        //Call server's login function
        $.ajax({
            context: auth,
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "json",
            success: function(responseText, textStatus, jqxhr){

                this.authenticated = true;
                this.csrfToken = Cookies.get('csrf_access_token');
                // Configure future AJAX requests to send the csrf token along in the header.
                $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", auth.csrfToken);
                        }
                    },
                    data: {"CSRFToken":auth.csrfToken}
                });

                callback(true);
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
                callback(false);
            },
        });
    }

    logout(callback) {

        //Call server's login function
        $.ajax({
            context: auth,
            type: "POST",
            url: "/rest/logout",
            contentType: "application/json",
            dataType: "json",
            success: function(responseText, textStatus, jqxhr){

                this.authenticated = false;

                //Clear the ajax configuration so that it no longer sends the CSRF token.
                $.ajaxSetup({
                    beforeSend: undefined,
                    data: undefined
                });

                callback(true);
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
                callback(false);
            },
        });
    }

    sendRequest(args){
        if(args['endpoint'] === undefined){
            return;
        }

        if(args['data'] === undefined){
            args['data'] = "";
        }

        if(args['method'] === undefined){
            args['method'] = "GET";
        }

        let callback = function(){return};
        if(args['callback'] !== undefined) {
            callback = args['callback'];
        }

        let request_data = {
            "endpoint":args['endpoint'],
            "data":args['data'],
            "method":args['method'],
        };

        // Call Forwarding always
        $.ajax({
            context: auth,
            type: "POST",
            url: "/rest/broadsoft",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(request_data),
            success: function(responseText, textStatus, jqxhr){
                callback(responseText);
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
                callback(jqxhr.responseText)
            },
        });
    }
}

export default new Broadsoft();