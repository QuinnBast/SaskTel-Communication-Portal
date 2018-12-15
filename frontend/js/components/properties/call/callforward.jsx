import React from "react";
import Property from "../property"
import Broadsoft from "../../../broadsoft/broadsoft"

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
                    <div>Loading Call Forward No Answer...</div>
                </div>
                <div id={"CallForwardNotReachable"}>
                    <div>Loading Call Forward Not Reachable...</div>
                </div>
                <div id={"CallForwardSelective"}>
                    <div>Loading Call Forward Selective...</div>
                </div>
            </div>
        );
    };

    // Asynchronous function that updates the object.
    loadAsync(){
        Broadsoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingAlways",
            callback: function(response){
            $("#CallForwardAlways").get(0).innerHTML = JSON.stringify(response);
            }
        });
        Broadsoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingBusy",
            callback: function(response){
            $("#CallForwardBusy").get(0).innerHTML = JSON.stringify(response);
            }
        });
        Broadsoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingNoAnswer",
            callback: function(response) {
                $("#CallForwardNoAnswer").get(0).innerHTML = JSON.stringify(response);
            }
        });
        Broadsoft.sendRequest({
            endpoint: "/user/<user>/services/CallForwardingNotReachable",
            callback: function(response) {
                $("#CallForwardNotReachable").get(0).innerHTML = JSON.stringify(response);
            }
        });
        Broadsoft.sendRequest({
            endpoint:"/user/<user>/services/CallForwardingSelective",
            callback: function(response) {
                $("#CallForwardSelective").get(0).innerHTML = JSON.stringify(response);
            }
        });
    }

    render() {
        return super.render();
    }
}