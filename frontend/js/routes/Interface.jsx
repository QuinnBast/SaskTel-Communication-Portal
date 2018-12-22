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

import UpdateQueue from "../workers/UpdateQueue";
import BroadSoft from "../BroadSoft/BroadSoft";

export default class Interface extends Component {

    //Create a list of all user properties to show to the user
    constructor(props){
        super(props);
    }

    componentDidMount() {
        setTimeout(this.checkQueue(), 60000);
    }

    checkQueue() {
        console.log("Worker was executed.");

        // Are items in the queue?
        if (!UpdateQueue.hasUpdates()) return;

        // If items are in the queue, process them and send requests to broadsoft.
        for (let i = 0; i < UpdateQueue.queue.length; i++) {
            // Send broadsoft requests for each update.
                BroadSoft.sendRequest(UpdateQueue.queue[i]);

            // Remove the item from the queue.
            UpdateQueue.queue.splice(i, 1);
        }
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

