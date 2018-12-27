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
import VoiceMessage from "../comps/VoiceMessages";
import Profile from "../comps/Profile";
import Schedules from "../comps/Schedules";
import CallingNameDelivery from "../comps/CallingNameDelivery";
import CallingNumberDelivery from "../comps/CallingNumberDelivery";
import CallWaiting from "../comps/CallWaiting";
import DoNotDisturb from "../comps/DoNotDisturb";
import FeatureAccessCodes from "../comps/FeatureAccessCodes";
import PersonalContacts from "../comps/PersonalContacts";
import ThirdPartyVoiceMail from "../comps/ThirdPartyVoiceMail";

import UpdateQueue from "../workers/UpdateQueue";
import BroadSoft from "../BroadSoft/BroadSoft";

export default class Interface extends Component {

    //Create a list of all user properties to show to the user
    constructor(props){
        super(props);
    }

    componentDidMount() {
        setInterval(this.checkQueue, 60000);
    }

    checkQueue = () => {
        // If items are in the queue, process them and send requests to broadsoft.
        let i = 0;
        while(UpdateQueue.hasUpdates()){
            // Send broadsoft requests for each update.
            BroadSoft.sendRequest(UpdateQueue.deQueue());
            console.log("sending element " + (++i).toString());
        }
        console.log("Queue Empty. Processed " + i.toString() + " elements.");
    };

    render() {
        return (
            <Fragment>
                <Profile/>
                <CallReject/>
                <CallForward/>
                <CallLogs/>
                <CallDirectory/>
                <VoiceMessage/>
                <Schedules/>
                <CallingNameDelivery/>
                <CallingNumberDelivery/>
                <CallWaiting/>
                <DoNotDisturb/>
                <FeatureAccessCodes/>
                <PersonalContacts/>
                <ThirdPartyVoiceMail/>
            </Fragment>
        );
    }
}

