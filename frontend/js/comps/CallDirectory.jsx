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

export default class CallDirectory extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
    }

// Asynchronous function that updates the object.
loadAsync(){
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/directories/CustomContact",
        success: function(response) {
            $("#CallDirectory").get(0).innerHTML = JSON.stringify(response);
        },
        error: function(response) {
            // User does not have access to the endpoint.
        }
    });
}

render() {
    return(
        <AccordionWrap title={"Call Directory"} description={"This property shows a call directory for possible contacts and groups."}>
            <div>
                <div id={"CallDirectory"}>Loading Directories...</div>
            </div>
        </AccordionWrap>
    )
}
}