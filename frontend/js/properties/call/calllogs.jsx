import React from "react";
import Property from "../property"
import {Button, Table} from "reactstrap";
import Broadsoft from "../../broadsoft/broadsoft";

export default class CallLogs extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Logs";
        this.state.description = "This property shows the history of all your previous calls.";
        this.state.title = "Call Logs";
        this.state.content = this.content();

        this.loadAsync()
    }

    content = () => {
        return(
            <div>
                <div id={"CallLogs"}>Loading Call Logs...</div>
            </div>)
    };

        // Asynchronous function that updates the object.
    loadAsync(){
        Broadsoft.sendRequest({
            endpoint:"/user/<user>/directories/CallLogs",
            callback: function(response) {
                $("#CallLogs").get(0).innerHTML = JSON.stringify(response);
            }
        });
    }

    render() {
        return super.render();
    }
}