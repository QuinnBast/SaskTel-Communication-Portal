/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Col, Container, Row} from 'reactstrap';
import ProfileSetting from "../comps/ProfileSetting";

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import CallForward from "./CallForward";

export default class ProfileSettings extends React.Component {
    /**
     *
     * @param props
     *      onEdit(editPage):function - that sets the containing carousel's edit page
     */

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <ProfileSetting name={"Call Forwarding"}/>
                <ProfileSetting hasEdit hasToggle tabbed name={"Call Forwarding Always"} onEdit={() => this.props.onEdit(<div>Call Forward Always Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle tabbed name={"Call Forwarding Busy"} onEdit={() => this.props.onEdit(<div>Call Forward Busy Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle tabbed name={"Call Forwarding Selective"} onEdit={() => this.props.onEdit(<div>Call Forward Selective Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle tabbed name={"Call Forwarding No Answer"} onEdit={() => this.props.onEdit(<div>Call Forward No Answer Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Call Reject"} onEdit={() => this.props.onEdit(<div>Call Reject Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Call Waiting"} onEdit={() => this.props.onEdit(<div>Call Waiting Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Do Not Disturb"} onEdit={() => this.props.onEdit(<div>Do Not Disturb Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Personal Contacts"} onEdit={() => this.props.onEdit(<div>Personal Contact Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Schedules"} onEdit={() => this.props.onEdit(<div>Schedules Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Third Party Voicemail"} onEdit={() => this.props.onEdit(<div>Third Party Voicemail Edit</div>)}/>
                <ProfileSetting hasEdit hasToggle name={"Voice Messages"} onEdit={() => this.props.onEdit(<div>Voice Messages Edit</div>)}/>
            </Container>
        )
    }
}