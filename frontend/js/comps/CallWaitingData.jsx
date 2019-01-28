/**
 *  React Imports
 */
import React from "react";

/**
 *  REST API Imports
 */

/**
 *  Worker Queue Imports
 */
import UpdateQueue from "../workers/UpdateQueue"

/**
 * Broadsoft imports
 */
import { getTag, setTag } from "../broadsoft/xmlParse";

export default class CallWaitingData extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            active: getTag(this.props.dataformat, ["CallWaiting", "active"]) === "true",
        }
    }

    toggleActive = () => {
        this.setState({active: !this.state.active});

        // Permanatly change background to yellow to indicate that a change is pending.
        jQuery("#CallWaitingActive").get(0).style.background = '#fff7e6';
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        // Use the recieved data format and replace changes.
        let data = nextProps.dataformat;

        // Loop through the state keys and set the data keys
        for(let key of Object.keys(nextState)){
            let value =  nextState[key];
            if(value != null) {
                setTag(data, ["CallWaiting", key], value.toString());
            } else {
                setTag(data, ["CallWaiting", key], '');
            }
        }

        let request = {
            endpoint: nextProps.endpoint,
            method: "PUT",
            data: data,
            success: function(response){
                jQuery("#CallWaitingActive").get(0).style.background = "";
            },
            error: function(response){
                // Permanently change background to red to indicate error to user.
                jQuery("#CallWaitingActive").get(0).style.background = '#e74c3c';
                // Reset the state of the component by fetching the current state.
            }
        };

        UpdateQueue.addUpdate(request);
    }

    render(){
        return(
            <div>
                <div id={"CallWaitingActive"}><Container>Call Waiting Active<Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/></Container></div>
            </div>
        )
    }


}