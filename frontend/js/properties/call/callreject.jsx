import React, {Component} from "react";
import Property from "../property"
import {Button} from "reactstrap";

export default class CallReject extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Blocking";
        this.state.description = "This setting allows you to block calls from specific phone numbers.";
        this.state.title = "Call Blocking";
        this.state.content = this.content();
    }

    content = () => {
        return(
            <div>
                <div>This is some data for call rejection</div>
                <div>This is some more data for call rejection</div>
                <Button>This is a button unique to callReject's content.</Button>
            </div>)
    };

    render() {
        return super.render();
    }
}