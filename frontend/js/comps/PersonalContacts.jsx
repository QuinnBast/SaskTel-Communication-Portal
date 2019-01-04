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

export default class PersonalContacts extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/directories/Personal",
            success: function(response) {
                $("#PersonalContacts").get(0).innerHTML = JSON.stringify(response);
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        return(
            <AccordionWrap title={"Personal Contacts"} description={"Create a list of personal contacts that can be stored for frequent use."}>
                <div>
                    <div id={"PersonalContacts"}>Loading...</div>
                </div>
            </AccordionWrap>
        )
    }
}