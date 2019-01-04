/**
 *  React Imports
 */
import React, {Component} from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

export default class CallReject extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            unauthorized: false
        };

        this.loadAsync()
    }

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
        return(
            <AccordionWrap title={"Call Blocking"} description={"This setting allows you to block calls from specific phone numbers."} unauthorized={this.state.unauthorized}>
                <div>
                    <div id={"CallRejectAnonymous"}>Loading Call Reject Anonymous...</div>
                    <div id={"CallRejectSelective"}>Loading Call Reject Selective...</div>
                </div>
            </AccordionWrap>
        )
    }
}