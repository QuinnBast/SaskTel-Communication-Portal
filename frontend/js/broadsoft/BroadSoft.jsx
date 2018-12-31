let Cookies = require("js-cookie");
let xmljs = require('xml-js');


/**
 *  Authentication Imports
 */
import Auth from "../router/Auth"

let $ = require('jquery');

class BroadSoft {

    constructor(){

    }

    login(callbacks) {
        /**
         * Reaches the server's login endpoint.
         * The server will contact Broadsoft to determine if the user credentials are valid.
         * If valid, the server will generate and return a user authentication token whihc validates the user.
         *
         * @param callbacks: {success: function(), error: function()}
         *
         *          The successful callback function will be executed on successful login.
         *          The failure callback function will be executed on failed login.
         */

        let object = {
            "username": Auth.username.replace(/[()-]/g, ''),
            "password": Auth.password,
        };

        let json = JSON.stringify(object);
        //Call server's login function
        $.ajax({
            context: Auth,
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "text",
            success: function(responseText, textStatus, jqxhr){

                this.authenticated = true;
                this.csrfToken = Cookies.get('csrf_access_token');
                // Configure future AJAX requests to send the csrf token along in the header.
                $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", Auth.csrfToken);
                        }
                    },
                    data: {"CSRFToken":Auth.csrfToken}
                });

                callbacks.success();
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
                callbacks.error();
            },
        });
    }

    logout() {
        /**
         * This function will contact the broadsoft logout endpoint and remove the user's auth tokens
         * This will ensure the user can no longer access information with their tokens.
         *
         * @param callbacks: {success: function(), error: function()}
         *
         *      The success function will be executed with a successful logout
         *      The error function will be executed with a failed logout
         */

        //Call server's login function
        $.ajax({
            context: Auth,
            type: "POST",
            url: "/rest/logout",
            contentType: "application/json",
            dataType: "text"
        });
    }

    sendRequest(args){
        /**
         * This function will access any of the broadsoft endpoints.
         *
         * @param args:
         * {
         *  endpoint: "broadsoftEndpoint",
         *  data: "A JS object to send to broadsoft as data. Data will be converted to XML.",
         *  method: "GET/PUT/DELETE/..."
         *  success: function(),
         *  error: function(),
         * }
         */

        if(args['endpoint'] === undefined){
            return;
        }

        if(args['data'] === undefined){
            args['data'] = "";
        } else {
            args['data'] = xmljs.js2xml(args['data']);
        }

        if(args['method'] === undefined){
            args['method'] = "GET";
        }

        let success = function(){return};
        if(args['success'] !== undefined) {
            success = args['success'];
        }

        let error = function(){return};
        if(args['error'] !== undefined) {
            error = args['error'];
        }

        let request_data = {
            "endpoint":args['endpoint'],
            "data":args['data'],
            "method":args['method'],
        };

        $.ajax({
            context: Auth,
            type: "POST",
            url: "/rest/broadsoft",
            contentType: "application/json",
            dataType: "text",
            data: JSON.stringify(request_data),
            success: function(responseText, textStatus, jqxhr){
                // Convert XML response to a JS object.
                let response = xmljs.xml2js(responseText);
                success(response);
            },
            error: function(jqxhr, textStatus, errorThrown){
                console.log(errorThrown);
                let response = xmljs.xml2js(jqxhr.responseText);
                error(response)
            },
        });
    }
}

export default new BroadSoft();