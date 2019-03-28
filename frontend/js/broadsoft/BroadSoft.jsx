let Cookies = require("js-cookie");
let xmljs = require('xml-js');


/**
 *  Authentication Imports
 */
import Auth from "../router/Auth"

/**
 * Worker imports
 */

let $ = require('jquery');

/**
 *
 * XmlParse
 */
import getTag from "../broadsoft/xmlParse";

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

        let self = this;

        let json = JSON.stringify(object);
        //Call server's login function
        return $.ajax({
            context: Auth,
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "text",
        }).then(() => {
                // Configure future AJAX requests to send the csrf token along in the header.
                $.ajaxSetup({
                    beforeSend: function(xhr, settings){
                        if(!this.crossDomain){
                            xhr.setRequestHeader("X-CSRF-TOKEN", Auth.csrfToken);
                        }
                    },
                    data: {"CSRFToken":Auth.csrfToken}
                });
        });
    }

    sendRequest(args) {
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


        // Ensure that the args parameter is not modified. This will allow retrying the request if auth tokens are not valid.
        if(args['endpoint'] === undefined){
            return;
        }

        let data = "";
        if(args['data'] !== undefined){
            data = xmljs.js2xml(args['data']);
        }

        let method = "GET";
        if(args['method'] !== undefined){
            method = args['method'];
        }

        let request_data = {
            "endpoint":args['endpoint'],
            "data":data,
            "method":method,
        };

        let self = this;
        let auth = Auth;

        return $.ajax({
            context: Auth,
            type: "POST",
            url: "/rest/broadsoft",
            contentType: "application/json",
            dataType: "text",
            data: JSON.stringify(request_data),
        }).then((responseText, textStatus, jqxhr) => {
            return Promise.resolve(xmljs.xml2js(responseText));
        }, (jqxhr, textStatus, errorThrown) => {
            console.log(errorThrown);
            let response = xmljs.xml2js(jqxhr.responseText);

            // If the user sent a request but the login token was invalid on the server, attempt to refresh the token.
            if(response.elements[0] && response.elements[0].elements[0].text === "Unauthorized"){
                // Attempt refreshing the user's access token.
                // If the refresh is successful, execute the callback function to retry the function
                auth.attemptRefresh(self.sendRequest, args);
                // Don't call the error function until refresh is attempted
                return;
            }
            return Promise.reject(response);
        });
    }
}

export default new BroadSoft();