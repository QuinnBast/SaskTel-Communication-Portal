/**
 *  React Imports
 */
import React from "react";

/**
 *  REST API Imports
 */
import {Checkbox, Container} from "semantic-ui-react";

/**
 *  Worker Queue Imports
 */
import UpdateQueue from "../workers/UpdateQueue"

/**
 * Broadsoft imports
 */
import { getTag, setTag } from "../broadsoft/xmlParse";

export default class DoNotDisturbData extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            active: getTag(this.props.dataformat, ["DoNotDisturb", "active"]) === "true",
            ringSplash: getTag(this.props.dataformat, ["DoNotDisturb", "ringSplash"]) === "true",
        }
    }

    toggleActive = () => {
        this.setState({active: !this.state.active});

        // Permanatly change background to yellow to indicate that a change is pending.
        jQuery("#DoNotDisturbActive").get(0).style.background = '#fff7e6';
    };

    toggleRingSplash = () => {
        this.setState({ringSplash: !this.state.ringSplash});

        // Permanatly change background to yellow to indicate that a change is pending.
        jQuery("#DoNotDisturbRingSplash").get(0).style.background = '#fff7e6';
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        // Use the recieved data format and replace changes.
        let data = nextProps.dataformat;

        // Loop through the state keys and set the data keys
        for(let key of Object.keys(nextState)){
            let value =  nextState[key];
            if(value != null) {
                setTag(data, ["DoNotDisturb", key], value.toString());
            } else {
                setTag(data, ["DoNotDisturb", key], '');
            }
        }

        let request = {
            endpoint: nextProps.endpoint,
            method: "PUT",
            data: data,
            success: function(response){
                jQuery("#DoNotDisturbActive").get(0).style.background = "";
                jQuery("#DoNotDisturbRingSplash").get(0).style.background = "";
            },
            error: function(response){
                // Permanently change background to red to indicate error to user.
                jQuery("#DoNotDisturbActive").get(0).style.background = '#e74c3c';
                jQuery("#DoNotDisturbRingSplash").get(0).style.background = '#e74c3c';
                // Reset the state of the component by fetching the current state.
            }
        };

        UpdateQueue.addUpdate(request);
    }

    render(){
        return(
            <div>
                <div id={"DoNotDisturbActive"}><Container>Do Not Disturb Active<Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/></Container></div>
                <div id={"DoNotDisturbRingSplash"}><Container>Do Not Disturb Ring Splash<Checkbox toggle checked={this.state.ringSpash} onClick={this.toggleRingSplash}/></Container></div>
            </div>
        )
    }


}