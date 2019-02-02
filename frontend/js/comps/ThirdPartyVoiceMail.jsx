/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import {getTag} from "../broadsoft/xmlParse";
import ThirdPartyVoicemailData from "./ThirdPartyVoicemailData";

export default class ThirdPartyVoiceMail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            unauthorized: false,
            status: "loading"
        };
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/ThirdPartyVoicemailSupport",
            success: function(response) {
                let data = <ThirdPartyVoicemailData key={"CallingNumberData"} dataformat={response} endpoint={"/user/<user>/services/ThirdPartyVoicemailSupport"}/>;
                self.setState((prevState) => ({data: [...prevState.data, data], status: "ready"}));
            },
            error: function(response) {
                // User does not have access to the endpoint.
            }
        });
    }

    render() {
        if(this.state.status === "loading") {
            return (
                <AccordionWrap title={"Third Party Voicemail"}
                               description={"Third-Party Voice Mail Support allows you to specify how to handle your voice messages. You can choose to send busy and/or unanswered calls to your voice mail, as well as the number of rings before an incoming call is considered unanswered."} unauthorized={this.state.unauthorized}>
                    <div>
                        <div id={"ThirdPartyVoicemail"}>Loading...</div>
                    </div>
                </AccordionWrap>
            )
        } else if(this.state.status === "ready") {
            return (<AccordionWrap title={"Third Party Voicemail"}
                                   description={"Third-Party Voice Mail Support allows you to specify how to handle your voice messages. You can choose to send busy and/or unanswered calls to your voice mail, as well as the number of rings before an incoming call is considered unanswered."} unauthorized={this.state.unauthorized}>
                <div>
                    {this.state.data}
                </div>
            </AccordionWrap>);
        }
    }
}