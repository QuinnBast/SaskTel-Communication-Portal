import React, {Component} from "react";
import Property from "../property"
import {Button} from "reactstrap";
import Broadsoft from "../../broadsoft/broadsoft";

export default class CallReject extends Property {

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
        Broadsoft.getCallReject("Anonymous", function(response){
            $("#CallRejectAnonymous").get(0).innerHTML = JSON.stringify(response);
        });
        Broadsoft.getCallReject("Selective", function(response){
            $("#CallRejectSelective").get(0).innerHTML = JSON.stringify(response);
        });
    }

    render() {
        return super.render();
    }
}