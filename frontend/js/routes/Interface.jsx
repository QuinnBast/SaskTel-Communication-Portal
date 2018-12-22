/**
 *  React Imports
 */
import React, {Component, Fragment} from "react";

/**
 *  Component Imports
 */
import CallForward from "../comps/CallForward";
import CallReject from "../comps/CallReject";
import CallLogs from "../comps/CallLogs";
import CallDirectory from "../comps/CallDirectory";

export default class Interface extends Component {

    //Create a list of all user properties to show to the user
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Fragment>
                <CallReject/>
                <CallForward/>
                <CallLogs/>
                <CallDirectory/>
            </Fragment>
        );
    }
}

