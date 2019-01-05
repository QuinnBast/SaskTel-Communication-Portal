/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap"
import CallingNameDeliveryData from "./CallingNameDeliveryData"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import {Checkbox} from "semantic-ui-react";

export default class CallingNameDevliery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "loading",
            data: [],
            unauthorized: false
        };
        this.loadAsync();
    }

// Asynchronous function that updates the object.
    loadAsync(){
        let self = this;
        BroadSoft.sendRequest({
            endpoint: "/user/<user>/services/CallingNameDelivery",
            success: function(response) {

                let dataFormat = response;
                let data = <CallingNameDeliveryData key={"CallingNameData"} dataformat={dataFormat} endpoint={"/user/<user>/services/CallingNameDelivery"}/>;
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
                <AccordionWrap title={"Calling Name Delivery"} description={"Calling Name Delivery allows the Calling Line name for callers from inside your group or enterprise (Internal) and/or callers from outside your group or enterprise (External) to be displayed. On assignment the Connected Line Identification Presentation service acts as a overlay service for Calling Name Delivery. The Connected Line Identification Presentation allows you to see the connected line identity of the called party. The setting for Calling Name Delivery also controls the Connected Line Identification Presentation service."} unauthorized={this.state.unauthorized}>
                    <div>
                        <div id={"CallingNameDelivery"}>Loading...</div>
                    </div>
                </AccordionWrap>)
        } else if (this.state.status === "ready"){
            return(
                <AccordionWrap title={"Calling Name Delivery"} description={"Calling Name Delivery allows the Calling Line name for callers from inside your group or enterprise (Internal) and/or callers from outside your group or enterprise (External) to be displayed. On assignment the Connected Line Identification Presentation service acts as a overlay service for Calling Name Delivery. The Connected Line Identification Presentation allows you to see the connected line identity of the called party. The setting for Calling Name Delivery also controls the Connected Line Identification Presentation service."} unauthorized={this.state.unauthorized}>
                    <div>
                        {this.state.data}
                    </div>
                </AccordionWrap>
            )
        }
    }
}