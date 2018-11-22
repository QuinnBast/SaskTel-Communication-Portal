import React, {Component} from "react";
import CallReject from "./callreject";
import CallForward from "./callforward";
import CallLogs from "./calllogs";
import CallDirectory from "./calldirectory";


export default class Call extends Component {
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