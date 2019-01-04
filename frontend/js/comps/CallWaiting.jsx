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

export default class CallWaiting extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallWaiting",
            success: function(response) {
                $("#CallWaiting").get(0).innerHTML = JSON.stringify(response);
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        return (
            <AccordionWrap title={"Call Waiting"} description={"Allows you to receive another call when you are already on the phone."}>
                <div>
                    <div id={"CallWaiting"}>Loading...</div>
                </div>
            </AccordionWrap>
        )
    }
}