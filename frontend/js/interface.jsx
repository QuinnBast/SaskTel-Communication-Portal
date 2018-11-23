import React, {Component} from "react";
import CallForward from "./properties/call/callforward";
import CallReject from "./properties/call/callreject";
import CallLogs from "./properties/call/calllogs";
import CallDirectory from "./properties/call/calldirectory";

export default class Interface extends Component {

    //Create a list of all user properties to show to the user
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <CallReject/>
                <CallForward/>
                <CallLogs/>
                <CallDirectory/>
            </div>
        );
    }
}