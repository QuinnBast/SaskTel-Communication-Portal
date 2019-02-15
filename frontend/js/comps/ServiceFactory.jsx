import React from 'react';
import Service from "./Service";
import XmlEditable from "./XmlEditable";

export default class ServiceFactory {
    static build(name, uri, onEdit){
        let reference = React.createRef();
        switch(name){
            case "Call Forwarding Always":
                return (
                    <Service
                        ref={reference}
                        tooltip={"Always forwards calls."}
                        activePath={["CallForwardingAlways", "active"]}
                        key={name}
                        hasEdit
                        hasToggle
                        name={name}
                        uri={uri}
                        onEdit={onEdit}>
                        <XmlEditable
                            name={"Forward To Phone Number"}
                            tooltip={"The phone number to forward calls to."}
                            type={"phone"}
                            XmlLocation={["CallForwardingAlways", "forwardToPhoneNumber"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Ring Splash"}
                            tooltip={"If your device receives a chime to indicate a call was forwarded."}
                            type={"bool"}
                            XmlLocation={["CallForwardingAlways", "ringSplash"]}
                            parent={reference}/>
                    </Service>);
            case "Call Forwarding Busy":
                return (
                    <Service
                        key={name}
                        ref={reference}
                        activePath={["CallForwardingBusy", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Forwards calls when your phone is in use."}
                        hasEdit
                        hasToggle>
                        <XmlEditable
                            name={"Forward To Phone Number"}
                            tooltip={"The phone number to forward calls to."}
                            type={"phone"}
                            XmlLocation={["CallForwardingBusy", "forwardToPhoneNumber"]}
                            parent={reference}/>
                    </Service>
                );
            case "Call Forwarding No Answer":
                return (
                    <Service
                        key={name}
                        ref={reference}
                        activePath={["CallForwardingNoAnswer", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Forwards calls when you do not answer."}
                        hasEdit
                        hasToggle>
                        <XmlEditable
                            name={"Number of Rings"}
                            tooltip={"The number of rings before the call is forwarded."}
                            type={"range"}
                            range={[2, 20]}
                            XmlLocation={["CallForwardingNoAnswer", "numberOfRings"]}
                            parent={reference}/>
                    </Service>
                );
            case "Do Not Disturb":
                let DnDTooltip = "Allows you to send your calls directly to your voice messaging box without ringing your phone. In addition, you can make your primary phone emit a short ring burst to inform you when the call is being sent to voice messaging by using the Ring Reminder. This is important when you have forgotten the service is turned on and you are at your phone waiting to receive calls.";
                return(
                    <Service
                        key={name}
                        ref={reference}
                        activePath={["DoNotDisturb", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={DnDTooltip}
                        hasEdit
                        hasToggle>
                        <XmlEditable
                            name={"Ring Splash"}
                            tooltip={"If your device receives a chime to indicate a call was blocked."}
                            type={"bool"}
                            XmlLocation={["DoNotDisturb", "ringSplash"]}
                            parent={reference}/>
                    </Service>
                );
            case "Call Forwarding Selective":
                return(
                    <Service key={name} activePath={null} name={name} uri={uri} onEdit={onEdit} tooltip={"Call Forwarding Selective"}/>
                );
            case "Speed Dial 8":
                return(
                    <Service key={name} activePath={null} name={name} uri={uri} onEdit={onEdit} tooltip={"Speed Dial 8"}/>
                );
            case "Third-Party Voice Mail Support":
                let tpvmtooltip = "Third-Party Voice Mail Support allows you to specify how to handle your voice messages. You can choose to send busy and/or unanswered calls to your voice mail, as well as the number of rings before an incoming call is considered unanswered.";
                return (
                    <Service
                        key={name}
                        ref={reference}
                        activePath={["ThirdPartyVoiceMailSupport", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={tpvmtooltip}
                        hasEdit
                        hasToggle>
                        <XmlEditable
                            name={"Voicemail when busy"}
                            tooltip={"If calls go to voicemail when you are busy."}
                            type={"bool"}
                            XmlLocation={["ThirdPartyVoiceMailSupport", "busyRedirectToVoiceMail"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Voicemail when no answer"}
                            tooltip={"If calls go to voicemail when you don't answer."}
                            type={"bool"}
                            XmlLocation={["ThirdPartyVoiceMailSupport", "noAnswerRedirectToVoiceMail"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Voicemail always"}
                            tooltip={"If calls go to voicemail."}
                            type={"bool"}
                            XmlLocation={["ThirdPartyVoiceMailSupport", "alwaysRedirectToVoiceMail"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Voicemail when out of primary zone"}
                            tooltip={"If calls go to voicemail when you are out of your primary zone."}
                            type={"bool"}
                            XmlLocation={["ThirdPartyVoiceMailSupport", "outOfPrimaryZoneRedirectToVoiceMail"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Number of Rings"}
                            tooltip={"The number of rings before going to voicemail."}
                            type={"range"}
                            range={[2, 20]}
                            XmlLocation={["ThirdPartyVoiceMailSupport", "noAnswerNumberOfRings"]}
                            parent={reference}/>
                    </Service>
                );
            case "Call Waiting":
                return(
                    <Service
                        key={name}
                        activePath={["CallWaiting", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Allows you to receive another call when you are already on the phone."}
                        hasToggle/>
                );
            case "Call Forwarding Not Reachable":
                return(
                    <Service
                        key={name}
                        ref={reference}
                        activePath={["CallForwardingNotReachable", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Forward calls when your devices is not accessible or turned off."}
                        hasEdit
                        hasToggle>
                        <XmlEditable
                            name={"Forward To Phone Number"}
                            tooltip={"The phone number to forward calls to."}
                            type={"phone"}
                            XmlLocation={["CallForwardingNotReachable", "forwardToPhoneNumber"]}
                            parent={reference}/>
                    </Service>
                );
            case "Calling Name Delivery":
                return (
                    <Service
                        key={name}
                        ref={reference}
                        activePath={null}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Settings that determine if your name is sent to recipients when making outgoing calls."}>
                        <XmlEditable
                            name={"External Name Delivery"}
                            tooltip={"Determines if your name is shown to users when making external calls."}
                            type={"bool"}
                            XmlLocation={["CallingNameDelivery", "isActiveForExternalCalls"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Internal Name Delivery"}
                            tooltip={"Determines if your name is shown to users when making internal calls."}
                            type={"bool"}
                            XmlLocation={["CallingNameDelivery", "isActiveForInternalCalls"]}
                            parent={reference}/>
                    </Service>
                );
            case "Calling Number Delivery":
                return (
                    <Service
                        key={name}
                        ref={reference}
                        activePath={null}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Settings that determine if your number is sent to recipients when making outgoing calls."}>
                        <XmlEditable
                            name={"External Name Delivery"}
                            tooltip={"Determines if your name is shown to users when making external calls."}
                            type={"bool"}
                            XmlLocation={["CallingNumberDelivery", "isActiveForExternalCalls"]}
                            parent={reference}/>
                        <XmlEditable
                            name={"Internal Name Delivery"}
                            tooltip={"Determines if your name is shown to users when making internal calls."}
                            type={"bool"}
                            XmlLocation={["CallingNumberDelivery", "isActiveForInternalCalls"]}
                            parent={reference}/>
                    </Service>
                );
            case "Integrated IMP":
                return(
                    <Service
                        key={name}
                        ref={reference}
                        activePath={["IntegratedIMPService", "active"]}
                        name={name}
                        uri={uri}
                        onEdit={onEdit}
                        tooltip={"Settings that determine if your number is sent to recipients when making outgoing calls."}
                        hasToggle/>
                );
        }
    }
}