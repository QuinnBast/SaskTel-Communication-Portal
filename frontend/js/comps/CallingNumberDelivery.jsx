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
import CallingNumberDeliveryData from "./CallingNumberDeliveryData";

export default class CallingNumberDelivery extends React.Component {

    constructor(props) {
        super(props);
        this.loadAsync();
        this.state = {
            data: [],
            status: "loading",
            unauthorized: false
        }
    }

// Asynchronous function that updates the object.
    loadAsync(){
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallingNumberDelivery",
            success: function(response) {

                let dataFormat = response;
                let data = <CallingNumberDeliveryData key={"CallingNumberData"} dataformat={dataFormat} endpoint={"/user/<user>/services/CallingNumberDelivery"}/>;
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
            <AccordionWrap title={"Calling Number Delivery"} description={"Calling Number Delivery allows the Calling Line number for callers from inside your group or enterprise (Internal) and/or callers from outside your group or enterprise (External) to be displayed. On assignment the Connected Line Identification Presentation service acts as a overlay service for Calling Number Delivery. The Connected Line Identification Presentation allows you to see the connected line identity of the called party. The setting for Calling Number Delivery also controls the Connected Line Identification Presentation service."} unauthorized={this.state.unauthorized}>
                <div>
                    <div id={"CallingNumberDelivery"}>Loading...</div>
                </div>
            </AccordionWrap>
        );
    } else if (this.state.status === "ready") {
                return (
            <AccordionWrap title={"Calling Number Delivery"} description={"Calling Number Delivery allows the Calling Line number for callers from inside your group or enterprise (Internal) and/or callers from outside your group or enterprise (External) to be displayed. On assignment the Connected Line Identification Presentation service acts as a overlay service for Calling Number Delivery. The Connected Line Identification Presentation allows you to see the connected line identity of the called party. The setting for Calling Number Delivery also controls the Connected Line Identification Presentation service."} unauthorized={this.state.unauthorized}>
                <div>
                    {this.state.data}
                </div>
            </AccordionWrap>
        );
            }
    }
}