/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/profile",
            success: function(response) {
                $("#Profile").get(0).innerHTML = JSON.stringify(response);
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        return(
            <AccordionWrap title={"Profile"} description={"User Profile information"}>
                <div>
                    <div id={"Profile"}>Loading Directories...</div>
                </div>
            </AccordionWrap>
        )
    }
}