import React from "react";
import Property from "../property"
import {Button} from "reactstrap";

export default class CallForward extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Forwarding";
        this.state.description = "This property allows you to forward calls to a different phone number during specific hours.";
        this.state.title = "Call Forwarding";
        this.state.content = this.content();
    }

    content = () => {
        return(
            <div>
                <div>This is some data for call forwarding</div>
                <div>This is some more data for call forwarding</div>
                <Button>This is a button unique to call forwarding.</Button>
            </div>)
    };

    render() {
        return super.render();
    }
}