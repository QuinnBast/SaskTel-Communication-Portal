import React from 'react';
import Service from "./Service";
import EditService from "./EditService";

export default class ServiceFactory {
    static build(name, uri, onEdit){
        let editComponent = null;
        let hasEdit = true;
        let hasToggle = true;
        let editables = null;
        let activePath = [];
        switch(name){
            case "Call Forwarding Always":
                activePath = ["CallForwardingAlways", "active"];
                editables = [
                    {
                        name: "Forward To Phone Number",
                        XmlLocation: ["CallForwardingAlways", "forwardToPhoneNumber"],
                        type: "phone",
                        tooltip: "The phone number to forward calls to."
                    },
                    {
                        name: "Ring Splash",
                        XmlLocation: ["CallForwardingAlways", "ringSplash"],
                        type: "bool",
                        tooltip: "If your device receives a chime to indicate a call was forwarded."
                    }];
                break;
            case "Call Forwarding Busy":
                activePath = ["CallForwardingBusy", "active"];
                editables = [
                    {
                        name: "Forward To Phone Number",
                        XmlLocation: ["CallForwardingBusy", "forwardToPhoneNumber"],
                        type: "phone",
                        tooltip: "The phone number to forward calls to."
                    }];
                break;
            case "Call Forwarding No Answer":
                activePath = ["CallForwardingNoAnswer", "active"];
                editables = [
                    {
                        name: "Number of Rings",
                        XmlLocation: ["CallForwardingNoAnswer", "numberOfRings"],
                        type: "range",
                        range: [2, 20],
                        tooltip: "The number of rings before the call is forwarded."
                    }];
                break;
            case "Do Not Disturb":
                activePath = ["DoNotDisturb", "active"];
                editables = [
                    {
                        name: "Ring Splash",
                        XmlLocation: ["DoNotDisturb", "ringSplash"],
                        type: "bool",
                        tooltip: "If your device receives a chime to indicate a call was blocked."
                    }];
                break;
            case "Call Forwarding Selective":
                break;
            case "Speed Dial 8":
                break;
            case "Third-Party Voice Mail Support":
                activePath = ["ThirdPartyVoiceMailSupport", "active"];
                editables = [
                    {
                        name: "Voicemail when busy",
                        XmlLocation: ["ThirdPartyVoiceMailSupport", "busyRedirectToVoiceMail"],
                        type: "bool",
                        tooltip: "If calls go to voicemail when you are busy."
                    },
                    {
                        name: "Voicemail when no answer",
                        XmlLocation: ["ThirdPartyVoiceMailSupport", "noAnswerRedirectToVoiceMail"],
                        type: "bool",
                        tooltip: "If calls go to voicemail when you don't answer."
                    },
                    {
                        name: "Voicemail always",
                        XmlLocation: ["ThirdPartyVoiceMailSupport", "alwaysRedirectToVoiceMail"],
                        type: "bool",
                        tooltip: "If calls go to voicemail."
                    },
                    {
                        name: "Voicemail when out of primary zone",
                        XmlLocation: ["ThirdPartyVoiceMailSupport", "outOfPrimaryZoneRedirectToVoiceMail"],
                        type: "bool",
                        tooltip: "If calls go to voicemail when you are out of your primary zone."
                    },
                    {
                        name: "Number of Rings",
                        XmlLocation: ["ThirdPartyVoiceMailSupport", "noAnswerNumberOfRings"],
                        type: "range",
                        range: [2, 20],
                        tooltip: "The number of rings before going to voicemail."
                    }];
                break;
            case "Call Waiting":
                activePath = ["CallWaiting", "active"];
                hasEdit = false;
                break;
            case "Call Forwarding Not Reachable":
                activePath = ["CallForwardingNotReachable", "active"];
                editables = [
                    {
                        name: "Forward To Phone Number",
                        XmlLocation: ["CallForwardingNotReachable", "forwardToPhoneNumber"],
                        type: "phone",
                        tooltip: "The phone number to forward calls to."
                    }];
                break;
            case "Calling Name Delivery":
                // This endpoint will return two services! One for each setting.

                /* Response:
                <CallingNameDelivery xmlns="http://schema.broadsoft.com/xsi">
                    <isActiveForExternalCalls>true</isActiveForExternalCalls>
                    <isActiveForInternalCalls>true</isActiveForInternalCalls>
                    </CallingNameDelivery>
                 */
                break;
            case "Calling Number Delivery":
                // This endpoint will return two services! One for each setting.

                /* Response:
                <CallingNumberDelivery xmlns="http://schema.broadsoft.com/xsi">
                    <isActiveForExternalCalls>true</isActiveForExternalCalls>
                    <isActiveForInternalCalls>true</isActiveForInternalCalls>
                </CallingNumberDelivery>
                 */
                break;
            case "Integrated IMP":
                activePath = ["IntegratedIMPService", "active"];
                break;

        }
        return [<Service editables={editables} activePath={activePath} key={name} hasEdit={hasEdit} hasToggle={hasToggle} name={name} uri={uri} onEdit={onEdit}/>]
    }
}