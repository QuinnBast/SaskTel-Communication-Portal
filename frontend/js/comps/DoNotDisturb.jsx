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

export default class DoNotDisturb extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/DoNotDisturb",
            success: function(response) {
                $("#DoNotDisturb").get(0).innerHTML = JSON.stringify(response);
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        return(
            <AccordionWrap title={"Do Not Disturb"} description={"Allows you to send your calls directly to your voice messaging box without ringing your phone. In addition, you can make your primary phone emit a short ring burst to inform you when the call is being sent to voice messaging by using the Ring Reminder. This is important when you have forgotten the service is turned on and you are at your phone waiting to receive calls."}>
                <div>
                    <div id={"DoNotDisturb"}>Loading...</div>
                </div>
            </AccordionWrap>
        )
    }
}