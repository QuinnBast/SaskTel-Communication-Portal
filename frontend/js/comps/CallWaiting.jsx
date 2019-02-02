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
import CallWaitingData from "./CallWaitingData";

export default class CallWaiting extends React.Component {

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
            endpoint: "/user/<user>/services/CallWaiting",
            success: function(response) {
                let data = <CallWaitingData key={"CallingNumberData"} dataformat={response} endpoint={"/user/<user>/services/CallWaiting"}/>;
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
                <AccordionWrap title={"Call Waiting"}
                               description={"Allows you to receive another call when you are already on the phone."}
                               unauthorized={this.state.unauthorized}>
                    <div>
                        <div id={"CallWaiting"}>Loading...</div>
                    </div>
                </AccordionWrap>
            )
        } else if(this.state.status === "ready"){
           return (
                <AccordionWrap title={"Call Waiting"}
                               description={"Allows you to receive another call when you are already on the phone."}
                               unauthorized={this.state.unauthorized}>
                    <div>
                        {this.state.data}
                    </div>
                </AccordionWrap>
            )
        }
    }
}