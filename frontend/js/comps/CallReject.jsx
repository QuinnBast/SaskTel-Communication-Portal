/**
 *  React Imports
 */
import React, {Component} from "react";

/**
 *  Component Imports
 */
import CallProperties from "./call/CallProperties"

/**
 *  REST API Imports
 */
import BroadSoft from "../BroadSoft/BroadSoft";

export default class CallReject extends CallProperties {

    constructor(props){
        super(props);
        this.state.name = "Call Blocking";
        this.state.description = "This setting allows you to block calls from specific phone numbers.";
        this.state.title = "Call Blocking";
        this.state.content = this.content();

        this.loadAsync()
    }

    content = () => {
        return(
            <div>
                <div id={"CallRejectAnonymous"}>Loading Call Reject Anonymous...</div>
                <div id={"CallRejectSelective"}>Loading Call Reject Selective...</div>
            </div>)
    };

    // Asynchronous function that updates the object.
    loadAsync(){
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/AnonymousCallRejection",
            callback: function(response) {
                $("#CallRejectAnonymous").get(0).innerHTML = JSON.stringify(response);
            }
        });
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/SelectiveCallRejection",
            callback: function(response) {
                $("#CallRejectSelective").get(0).innerHTML = JSON.stringify(response);
            }
        });
    }

    render() {
        return super.render();
    }
}