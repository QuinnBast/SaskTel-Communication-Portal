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

export default class CallDirectory extends CallProperties {

    constructor(props){
        super(props);
        this.state.name = "Call CallDirectory";
        this.state.description = "This property shows a call directory for possible contacts and groups.";
        this.state.title = "Call CallDirectory";
        this.state.content = this.content();

        this.loadAsync();
    }

    content = () => {
        return(
            <div>
                <div id={"CallDirectory"}>Loading Directories...</div>
            </div>)
    };

        // Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/directories/CustomContact",
            callback: function(response) {
                $("#CallDirectory").get(0).innerHTML = JSON.stringify(response);
            }
        });
    }

    render() {
        return super.render();
    }
}