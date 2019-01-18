
/**
 *  React Imports
 */
import React from "react";

/**
 *  Style Imports
 */
import { Table, Checkbox, Input, Popup } from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'

/**
 *  Worker Queue Imports
 */
import UpdateQueue from "../workers/UpdateQueue"

/**
 * Broadsoft imports
 */
import { getTag, setTag } from "../broadsoft/xmlParse";

let $ = require('jquery');

export default class CallForwardData extends React.Component {

    constructor(props){
        super(props);

        let type = this.props.info.type;

        // Determine the type of call forwarding to determine which state to apply:
        if(type === "CallForwardingAlways") {
            this.state = {
                active: getTag(this.props.dataformat, [type, 'active']) === 'true',
                forwardToPhoneNumber: getTag(this.props.dataformat, [type, 'forwardToPhoneNumber']),
                ringSplash: getTag(this.props.dataformat, [type, 'ringSplash']) === 'true',
            }
        } else if (type === "CallForwardingBusy" || type === "CallForwardingNotReachable"){
            this.state = {
                active: getTag(this.props.dataformat, [type, 'active']) === 'true',
                forwardToPhoneNumber: getTag(this.props.dataformat, [type, 'forwardToPhoneNumber']),
            }
        } else if (type === "CallForwardingSelective"){
            this.state = {
                active: getTag(this.props.dataformat, [type, 'active']) === 'true',
                defaultForwardToPhone: getTag(this.props.dataformat, [type, 'defaultForwardToPhone']),
            }
        } else if (type === "CallForwardingNoAnswer") {
            this.state = {
                active: getTag(this.props.dataformat, [type, 'active']) === 'true',
                forwardToPhoneNumber: getTag(this.props.dataformat, [type, 'forwardToPhoneNumber']),
                numberOfRings: getTag(this.props.dataformat, [type, 'numberOfRings']),
            }
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {

        // Permanatly change background to yellow to indicate that a change is pending.
        jQuery("#" + nextProps.info.type).get(0).style.background = '#fff7e6';


        // Use the recieved data format and replace changes.
        let data = nextProps.dataformat;

        // Loop through the state keys and set the data keys
        for(let key of Object.keys(nextState)){
            let value =  nextState[key];
            if(value != null) {
                setTag(data, [this.props.info.type, key], value.toString());
            } else {
                setTag(data, [this.props.info.type, key], '');
            }
        }

        let request = {
            endpoint: nextProps.info.endpoint,
            method: "PUT",
            data: data,
            success: function(response){
                jQuery("#" + nextProps.info.type).get(0).style.background = "";
            },
            error: function(response){
                // Permanently change background to red to indicate error to user.
                jQuery("#" + nextProps.info.type).get(0).style.background = '#e74c3c';
                // Reset the state of the component by fetching the current state.
            }
        };

        UpdateQueue.addUpdate(request);

    }

    setData = (properties) => {
        this.state = properties;
    };

    toggleRing = () => {
        this.setState({ringSplash: !this.state.ringSplash});
    };

    toggleActive = () => {
        this.setState({active: !this.state.active});
        // If the state is set to active, ensure that a phone number is provided!
    };

    changePhone = (event) => {
        // Validate phone number.
        if(event.target.value.replace(/[()-]/g, '').length  < 10)
        {
            // Show alert popup.
            return;
        }

        // If valid, change state.
        this.setState({forwardToPhoneNumber: event.target.value,})
    };

    changeNumberOfRings = (event) => {
        this.setState({numberOfRings: event.target.value})
    };


    render(){

        let type = this.props.info.type;


        if(type === "CallForwardingAlways") {
            return (
                <Table.Row id={this.props.info.type}>
                    <Table.Cell>
                        <Popup trigger={<div>{this.props.info.name}</div>} content={"Always forwards calls."}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input>
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="CallForwardNumber"
                                guide = {true}
                                autoComplete="off"
                                defaultValue={this.state.forwardToPhoneNumber} onChange={(e) => this.changePhone(e)}
                            />
                        </Input>
                    </Table.Cell>
                    <Table.Cell>
                        <Popup trigger ={<div>Ring Splash</div>} content={"When a call is forwarded, a chime will play on the main phone to indicate a call was forwarded."}/><Checkbox toggle checked={this.state.ringSplash} onClick={this.toggleRing}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/>
                    </Table.Cell>
                </Table.Row>
            );
        } else if (type === "CallForwardingBusy"){
            return (
                <Table.Row id={this.props.info.type}>
                    <Table.Cell>
                        <Popup trigger={<div>{this.props.info.name}</div>} content={"Forwards calls when your phone is in use."}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input>
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="CallForwardNumber"
                                guide = {true}
                                autoComplete="off"
                                defaultValue={this.state.forwardToPhoneNumber} onChange={(e) => this.changePhone(e)}
                            />
                        </Input>
                    </Table.Cell>
                    <Table.Cell>
                        <div/>
                    </Table.Cell>
                    <Table.Cell>
                        <Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/>
                    </Table.Cell>
                </Table.Row>
            );
        } else if (type === "CallForwardingNotReachable"){
            return (
                <Table.Row id={this.props.info.type}>
                    <Table.Cell><Popup trigger={<div>{this.props.info.name}</div>} content={"Forward calls when your devices is not accessible or turned off."}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input>
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="CallForwardNumber"
                                guide = {true}
                                autoComplete="off"
                                defaultValue={this.state.forwardToPhoneNumber} onChange={(e) => this.changePhone(e)}
                            />
                        </Input>
                    </Table.Cell>
                    <Table.Cell>
                        <div/>
                    </Table.Cell>
                    <Table.Cell><Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/>
                    </Table.Cell>
                </Table.Row>
            );
        } else if (type === "CallForwardingSelective"){
            // TODO: Implement call fowarding selective
            //Specify criteria for when calls should be forwarded.
            return(
                <Table.Row/>
            );
        } else if (type === "CallForwardingNoAnswer"){
            return (
                <Table.Row id={this.props.info.type}>
                    <Table.Cell>
                        <Popup trigger={<div>{this.props.info.name}</div>} content={"Forwards calls when you do not answer."}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Input defaultValue={this.state.forwardToPhoneNumber} onChange={(e) => this.changePhone(e)}>
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="CallForwardNumber"
                                guide = {true}
                                autoComplete="off"
                                defaultValue={this.state.forwardToPhoneNumber} onChange={(e) => this.changePhone(e)}
                            />
                        </Input>
                    </Table.Cell>
                    <Table.Cell>
                        <Popup trigger ={<div>Number of Rings</div>} content={"The number of times the phone should ring before forwarding the call."}/>
                        <Input>
                            <MaskedInput mask={[/\d*/]} defaultValue={this.state.numberOfRings} onChange={(e) => this.changeNumberOfRings(e)}/>
                        </Input>
                    </Table.Cell>
                    <Table.Cell>
                        <Checkbox toggle checked={this.state.active} onClick={this.toggleActive}/>
                    </Table.Cell>
                </Table.Row>
            );
        }
    }
}