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

export default class Interface extends Component {

    //Create a list of all user properties to show to the user
    constructor(props){
        super(props);
        this.infoBox = React.createRef();
    }

    componentDidMount() {
        setInterval(UpdateQueue.parseQueue, 60000);
    }

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

