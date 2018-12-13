import React from "react";
import Property from "../property"
import {Button, Table} from "reactstrap";
import Broadsoft from "../../broadsoft/broadsoft";

export default class CallDirectory extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Directory";
        this.state.description = "This property shows a call directory for possible contacts and groups.";
        this.state.title = "Call Directory";
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
        Broadsoft.sendRequest({
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