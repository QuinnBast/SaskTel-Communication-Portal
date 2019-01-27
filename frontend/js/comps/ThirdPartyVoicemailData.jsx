/**
 *  REST API Imports
 */
import {Checkbox, Container, Input} from "semantic-ui-react";

/**
 *  Worker Queue Imports
 */
import UpdateQueue from "../workers/UpdateQueue"

/**
 * Broadsoft imports
 */
import { getTag, setTag } from "../broadsoft/xmlParse";
import React from "react";

export default class ThirdPartyVoicemailData extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: getTag(this.props.dataformat, ["ThirdPartyVoiceMailSupport", "active"]) === 'true',
            busyRedirectToVoiceMail: getTag(this.props.dataformat, ["ThirdPartyVoiceMailSupport", "busyRedirectToVoiceMail"]) === 'true',
            noAnswerRedirectToVoiceMail: getTag(this.props.dataformat, ["ThirdPartyVoiceMailSupport", "noAnswerRedirectToVoiceMail"]) === 'true',
            alwaysRedirectToVoiceMail: getTag(this.props.dataformat, ["ThirdPartyVoiceMailSupport", "alwaysRedirectToVoiceMail"]) === 'true',
            outOfPrimaryZoneRedirectToVoiceMail: getTag(this.props.dataformat, ["ThirdPartyVoiceMailSupport", "outOfPrimaryZoneRedirectToVoiceMail"]) === 'true',
            noAnswerNumberOfRings: getTag(this.props.dataformat, ["ThirdPartyVoiceMailSupport", "noAnswerNumberOfRings"])
        }
    }

     componentWillUpdate(nextProps, nextState, nextContext) {
        // Use the recieved data format and replace changes.
        let data = nextProps.dataformat;

        // Loop through the state keys and set the data keys
        for(let key of Object.keys(nextState)){
            let value =  nextState[key];
            if(value != null) {
                setTag(data, ["ThirdPartyVoiceMailSupport", key], value.toString());
            } else {
                setTag(data, ["ThirdPartyVoiceMailSupport", key], '');
            }
        }

        let request = {
            endpoint: nextProps.endpoint,
            method: "PUT",
            data: data,
            success: function(response){
                jQuery("#ThirdPartyVoicemailActive").get(0).style.background = '';
                jQuery("#ThirdPartyVoicemailBusy").get(0).style.background = '';
                jQuery("#ThirdPartyVoicemailNoAnswer").get(0).style.background = '';
                jQuery("#ThirdPartyVoicemailAlways").get(0).style.background = '';
                jQuery("#ThirdPartyVoicemailOutOfZone").get(0).style.background = '';
                jQuery("#ThirdPartyVoicemailNumberOfRings").get(0).style.background = '';
            },
            error: function(response){
                // Permanently change background to red to indicate error to user.
                jQuery("#ThirdPartyVoicemailActive").get(0).style.background = jQuery("#ThirdPartyVoicemailActive").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                jQuery("#ThirdPartyVoicemailBusy").get(0).style.background = jQuery("#ThirdPartyVoicemailBusy").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                jQuery("#ThirdPartyVoicemailNoAnswer").get(0).style.background = jQuery("#ThirdPartyVoicemailNoAnswer").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                jQuery("#ThirdPartyVoicemailAlways").get(0).style.background = jQuery("#ThirdPartyVoicemailAlways").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                jQuery("#ThirdPartyVoicemailOutOfZone").get(0).style.background = jQuery("#ThirdPartyVoicemailOutOfZone").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
                jQuery("#ThirdPartyVoicemailNumberOfRings").get(0).style.background = jQuery("#ThirdPartyVoicemailNumberOfRings").get(0).style.background === '#fff7e6' ? '#e74c3c' : "";
            }
        };

        UpdateQueue.addUpdate(request);
    }

    toggleActive = () => {
        this.setState({active: !this.state.active});
        jQuery("#ThirdPartyVoicemailActive").get(0).style.background = '#fff7e6';
    };

    toggleBusyVoicemail = () => {
        this.setState({busyRedirectToVoiceMail: !this.state.busyRedirectToVoiceMail});
        jQuery("#ThirdPartyVoicemailBusy").get(0).style.background = '#fff7e6';
    };

    toggleNoAnswerVoicemail = () => {
        this.setState({noAnswerRedirectToVoiceMail: !this.state.noAnswerRedirectToVoiceMail});
        jQuery("#ThirdPartyVoicemailNoAnswer").get(0).style.background = '#fff7e6';
    };

    toggleAlwaysVoicemail = () => {
        this.setState({alwaysRedirectToVoiceMail: !this.state.alwaysRedirectToVoiceMail});
        jQuery("#ThirdPartyVoicemailAlways").get(0).style.background = '#fff7e6';
    };

    toggleOutOfZoneVoicemail = () => {
        this.setState({outOfPrimaryZoneRedirectToVoiceMail: !this.state.outOfPrimaryZoneRedirectToVoiceMail});
        jQuery("#ThirdPartyVoicemailOutOfZone").get(0).style.background = '#fff7e6';
    };

    updateNumberOfRings = (e) => {
        this.setState({noAnswerNumberOfRings: e.target.value});
        jQuery("#ThirdPartyVoicemailNumberOfRings").get(0).style.background = '#fff7e6';
    };

    render(){
        return (
            <div>
                <Container><div id={"ThirdPartyVoicemailActive"}>Third Party Voicemail Active<Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/></div></Container>
                <Container><div id={"ThirdPartyVoicemailBusy"}>Redirect to voicemail when busy<Checkbox toggle checked={this.state.busyRedirectToVoiceMail} onClick={this.toggleBusyVoicemail}/></div></Container>
                <Container><div id={"ThirdPartyVoicemailNoAnswer"}>Redirect to voicemail when no answer<Checkbox toggle checked={this.state.noAnswerRedirectToVoiceMail} onClick={this.toggleNoAnswerVoicemail}/></div></Container>
                <Container><div id={"ThirdPartyVoicemailAlways"}>Always redirect to voicemail<Checkbox toggle checked={this.state.alwaysRedirectToVoiceMail} onClick={this.toggleAlwaysVoicemail}/></div></Container>
                <Container><div id={"ThirdPartyVoicemailOutOfZone"}>Redirect to voicemail when out of primary zone<Checkbox toggle checked={this.state.outOfPrimaryZoneRedirectToVoiceMail} onClick={this.toggleOutOfZoneVoicemail}/></div></Container>
                <Container><div id={"ThirdPartyVoicemailNumberOfRings"}>Number of rings for No Answer<Input defaultValue={this.state.noAnswerNumberOfRings} onChange={(e) => this.updateNumberOfRings(e)}/></div></Container>
            </div>
    );
    }
    }