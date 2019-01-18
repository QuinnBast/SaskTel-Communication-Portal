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
import DoNotDisturbData from "./DoNotDisturbData";

export default class DoNotDisturb extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
        this.state = {
            unauthorized: false,
            data: [],
            status: "loading"
        }
    }

// Asynchronous function that updates the object.
    loadAsync(){
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/DoNotDisturb",
            success: function(response) {
                let data = <DoNotDisturbData key={"CallingNumberData"} dataformat={response} endpoint={"/user/<user>/services/DoNotDisturb"}/>;
                self.setState((prevState) => ({data: [...prevState.data, data], status: "ready"}));
            },
            error: function(response) {
                // User does not have access to the endpoint.
                self.setState({unauthorized: true});
            }
        });
    }

    render() {
        if(this.state.status === "loading") {
            return (
                <AccordionWrap title={"Do Not Disturb"} description={"Allows you to send your calls directly to your voice messaging box without ringing your phone. In addition, you can make your primary phone emit a short ring burst to inform you when the call is being sent to voice messaging by using the Ring Reminder. This is important when you have forgotten the service is turned on and you are at your phone waiting to receive calls."} unauthorized={this.state.unauthorized}>
                    <div>
                        <div id={"DoNotDisturb"}>Loading...</div>
                    </div>
                </AccordionWrap>
            );
        } else if (this.state.status === "ready"){
            return (
                <AccordionWrap title={"Do Not Disturb"} description={"Allows you to send your calls directly to your voice messaging box without ringing your phone. In addition, you can make your primary phone emit a short ring burst to inform you when the call is being sent to voice messaging by using the Ring Reminder. This is important when you have forgotten the service is turned on and you are at your phone waiting to receive calls."} unauthorized={this.state.unauthorized}>
                    <div>
                        {this.state.data}
                    </div>
                </AccordionWrap>
            );
        }
    }
}