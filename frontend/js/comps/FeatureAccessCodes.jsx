/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import CallProperties from "./call/CallProperties"

/**
 *  REST API Imports
 */
import BroadSoft from "../BroadSoft/BroadSoft";

export default class FeatureAccessCodes extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            name : "Feature Access Codes",
            description : "Feature Access Codes list the star codes for services that you have. To activate a service, hit the * key and the number followed by the # key. Some require additional information such as a phone number, but you are prompted for that information. You cannot change your feature access codes.",
            title : "Feature Access Codes",
            content : this.content()
        };
    this.loadAsync();
}

content = () => {
    return(
        <div>
            <div id={"FeatureAccessCodes"}>Loading...</div>
        </div>)
};

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/profile/Fac",
        success: function(response) {
            $("#FeatureAccessCodes").get(0).innerHTML = JSON.stringify(response);
        },
        error: function(response) {
            // User does not have access to the endpoint.
        }
    });
}

render() {
    return super.render();
}
}