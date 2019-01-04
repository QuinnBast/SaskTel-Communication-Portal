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
import BroadSoft from "../broadsoft/BroadSoft";

export default class CallReject extends CallProperties {

    constructor(props){
        super(props);
        this.state = {
            name : "Call Blocking",
            description : "This setting allows you to block calls from specific phone numbers.",
            title : "Call Blocking",
            content : this.content(),
            unauthorized: false
        };

        this.loadAsync()
    }

    content = () => {
        if(this.state.unauthorized){
            return(<div>Your account is not authorized to access this setting.</div>);
        } else {
            return (
                <div>
                    <div id={"CallRejectAnonymous"}>Loading Call Reject Anonymous...</div>
                    <div id={"CallRejectSelective"}>Loading Call Reject Selective...</div>
                </div>)
        }
    };

    // Asynchronous function that updates the object.
    loadAsync(){
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/AnonymousCallRejection",
            success: function(response) {
                $("#CallRejectAnonymous").get(0).innerHTML = JSON.stringify(response);
            },
        });
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/SelectiveCallRejection",
            success: function(response) {
                $("#CallRejectSelective").get(0).innerHTML = JSON.stringify(response);
            },
        });
    }

    render() {
        return super.render();
    }
}