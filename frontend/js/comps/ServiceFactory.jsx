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
        let tooltip = "";
        switch(name){
            case "Call Forwarding Always":
                activePath = ["CallForwardingAlways", "active"];
                editables = [
                    {
                        name: "Forward To Phone Number",
                        XmlLocation: ["CallForwardingAlways", "forwardToPhoneNumber"],
                        type: "phone",
                        tooltip: "The phone number to forward calls to.",
                        required: true
                    },
                    {
                        name: "Ring Splash",
                        XmlLocation: ["CallForwardingAlways", "ringSplash"],
                        type: "bool",
                        tooltip: "If your device receives a chime to indicate a call was forwarded."
                    }];
                tooltip = "Always forwards calls.";
                break;
            case "Call Forwarding Busy":
                activePath = ["CallForwardingBusy", "active"];
                editables = [
                    {
                        name: "Forward To Phone Number",
                        XmlLocation: ["CallForwardingBusy", "forwardToPhoneNumber"],
                        type: "phone",
                        tooltip: "The phone number to forward calls to.",
                        required: true
                    }];
                tooltip = "Forwards calls when your phone is in use.";
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
                tooltip = "Forwards calls when you do not answer.";
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
                tooltip = "Allows you to send your calls directly to your voice messaging box without ringing your phone. In addition, you can make your primary phone emit a short ring burst to inform you when the call is being sent to voice messaging by using the Ring Reminder. This is important when you have forgotten the service is turned on and you are at your phone waiting to receive calls.";
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
                tooltip = "Third-Party Voice Mail Support allows you to specify how to handle your voice messages. You can choose to send busy and/or unanswered calls to your voice mail, as well as the number of rings before an incoming call is considered unanswered.";
                break;
            case "Call Waiting":
                activePath = ["CallWaiting", "active"];
                hasEdit = false;
                tooltip = "Allows you to receive another call when you are already on the phone.";
                break;
            case "Call Forwarding Not Reachable":
                activePath = ["CallForwardingNotReachable", "active"];
                editables = [
                    {
                        name: "Forward To Phone Number",
                        XmlLocation: ["CallForwardingNotReachable", "forwardToPhoneNumber"],
                        type: "phone",
                        tooltip: "The phone number to forward calls to.",
                        required: true
                    }];
                tooltip = "Forward calls when your devices is not accessible or turned off.";
                break;
            case "Calling Name Delivery":

                // TODO: This is not working because each component fetches their own request from broadsoft. Therefore, when one updates it will only update its respective field.
                // Need to find some way to have "grouped" elements share an update

                let nameGroup = <Service key={name} name={name} />;
                let externalNameDelivery = <Service key={"External Name Delivery"} name={"External Name Delivery"} tabbed hasToggle uri={uri} activePath={["CallingNameDelivery", "isActiveForExternalCalls"]} />;
                let internalNameDelivery = <Service key={"Internal Name Delivery"} name={"Internal Name Delivery"} tabbed hasToggle uri={uri} activePath={["CallingNameDelivery", "isActiveForInternalCalls"]} />;
                return [nameGroup, externalNameDelivery, internalNameDelivery];
                // This endpoint will return two services! One for each setting.

                /* Response:
                <CallingNameDelivery xmlns="http://schema.broadsoft.com/xsi">
                    <isActiveForExternalCalls>true</isActiveForExternalCalls>
                    <isActiveForInternalCalls>true</isActiveForInternalCalls>
                    </CallingNameDelivery>
                 */
                break;
            case "Calling Number Delivery":
                let numberGroup = <Service key={name} name={name} />;
                let externalNumberDelivery = <Service key={"External Number Delivery"} name={"External Number Delivery"} tabbed hasToggle uri={uri} activePath={["CallingNumberDelivery", "isActiveForExternalCalls"]} />;
                let internalNumberDelivery = <Service key={"Internal Number Delivery"} name={"Internal Number Delivery"} tabbed hasToggle uri={uri} activePath={["CallingNumberDelivery", "isActiveForInternalCalls"]} />;
                return [numberGroup, externalNumberDelivery, internalNumberDelivery];
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
                hasEdit = false;
                break;

        }
        return [<Service tooltip={tooltip} editables={editables} activePath={activePath} key={name} hasEdit={hasEdit} hasToggle={hasToggle} name={name} uri={uri} onEdit={onEdit}/>]
    }
}