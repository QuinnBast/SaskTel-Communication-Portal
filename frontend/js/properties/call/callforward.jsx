import React from "react";
import Property from "../property"
import {Button} from "reactstrap";
import Broadsoft from "../../broadsoft/broadsoft"

let $ = require('jquery');

export default class CallForward extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Forwarding";
        this.state.description = "This property allows you to forward calls to a different phone number during specific hours.";
        this.state.title = "Call Forwarding";
        this.state.content = this.content();
        this.state.asyncData = null;

        this.loadAsync();
    }

    content = () => {
        return (
            <div>
                <div id={"CallForwardAlways"}>
                    <div>Loading Call Forward Always...</div>
                </div>
                <div id={"CallForwardBusy"}>
                    <div>Loading Call Forward Busy...</div>
                </div>
                <div id={"CallForwardNoAnswer"}>
                    <div>Loading Call Forward Always...</div>
                </div>
                <div id={"CallForwardNotReachable"}>
                    <div>Loading Call Forward Always...</div>
                </div>
                <div id={"CallForwardSelective"}>
                    <div>Loading Call Forward Always...</div>
                </div>
            </div>
        );
    };

    // Asynchronous function that updates the object.
    loadAsync(){
        Broadsoft.getCallForwarding("Always", function(response){
            $("#CallForwardAlways").get(0).innerHTML = JSON.stringify(response);
        });
        Broadsoft.getCallForwarding("Busy", function(response){
            $("#CallForwardBusy").get(0).innerHTML = JSON.stringify(response);
        });
        Broadsoft.getCallForwarding("NoAnswer", function(response){
            $("#CallForwardNoAnswer").get(0).innerHTML = JSON.stringify(response);
        });
        Broadsoft.getCallForwarding("NotReachable", function(response){
            $("#CallForwardNotReachable").get(0).innerHTML = JSON.stringify(response);
        });
        Broadsoft.getCallForwarding("Selective", function(response){
            $("#CallForwardSelective").get(0).innerHTML = JSON.stringify(response);
        });
    }

    render() {
        return super.render();
    }
}