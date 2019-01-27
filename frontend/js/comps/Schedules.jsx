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

export default class Schedules extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/profile/schedule",
            success: function(response) {
                $("#Schedules").get(0).innerHTML = JSON.stringify(response);
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        return(
            <AccordionWrap title={"Schedules"} description={"Schedules for selective calling"}>
                <div>
                    <div id={"Schedules"}>Loading Directories...</div>
                </div>
            </AccordionWrap>
        )
    }
}