/**
 *  React Imports
 */
import React, {Fragment} from "react";
import PropTypes from 'prop-types';

/**
 * Component Imports
 */
import {Container, Popover, PopoverHeader, PopoverBody, Table, Button} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { getTag, generateKeyValueXml } from "../broadsoft/xmlParse";
import XmlEditable from "./XmlEditable";
import MaskedInput from 'react-text-mask';
import Broadsoft from "../broadsoft/BroadSoft";


let $ = require('jquery');

export default class XmlEditableTable extends React.Component {

    constructor(props){
        super(props);
        let elementList = this.props.getValue(this.props.XmlListLocation).elements;
        this.state = {
            list: elementList,
            popover: false,
        };
    }

    togglePopover = () => {
        this.setState({popover: !this.state.popover});
    };

    getElement(key){
        for(let element of this.state.list){
            if(getTag(element, this.props.children[0].props.XmlLocation) === key){
                return element;
            }
        }
    }

    getValue = (linkedKey, XmlLocation) => {
        let self = this;
        let element = self.getElement(linkedKey);
      return getTag(element, XmlLocation);
    };

    sendUpdate = (key, valueName, value) => {
        let self = this;
        let xml = generateKeyValueXml(this.props.XmlListLocation[0], this.props.XmlSingleEntry, this.props.children[0].props.XmlLocation[0], key, valueName, value);
        let request = {
            endpoint: this.props.uri,
            method: "PUT",
            data: xml,
        };

        Broadsoft.sendRequest(request).then((response) => {
            let settingName = valueName[0].replace(/([A-Z])/g, ' $1').trim();
            global.sendMessage("Successfully updated " + settingName + " of " + this.props.name + ".", {timeout: 5000});
        }, (errorResponse) => {
            self.setState({value: this.state.originalValue});

            let errorSummary =  getTag(errorResponse, ["ErrorInfo", "summary"]);
            let errorCode = getTag(errorResponse, ["ErrorInfo", "errorCode"]);
            let settingName = valueName[0].replace(/([A-Z])/g, ' $1').trim();

            console.log(errorSummary);
            global.sendMessage("Error updating " + settingName + " of " + this.props.name + "! Error Code " + errorCode + ": " + errorSummary, {timeout: 15000, color: "danger"});
        })
    };

    render(){

        let header = [];
        for(let child of this.props.children){
            header.push(<th key={child.props.name}>{child.props.name}</th>);
        }

        let body = [];
        for(let element of this.state.list){
            let data = [];
            for(let child of this.props.children){
                let referencedChild = React.cloneElement(child, {getValue: this.getValue, linkedKey: getTag(element, this.props.children[0].props.XmlLocation), sendLinkedRequest: this.sendUpdate});
                data.push(<td key={getTag(element, child.props.XmlLocation) + child.props.name}>{referencedChild}</td>)
            }
            body.push(<tr>{data}</tr>);
        }

        return (
            <Table striped id={"CallForwarding"}>
                <thead>
                    <tr>
                        {header}
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        );
    }
}

XmlEditableTable.propTypes = {
    // The name of the setting to edit
    name: PropTypes.string.isRequired,
    // A tooltip that appears when hovering the item's (?) icon
    tooltip: PropTypes.string.isRequired,
    // An object that links the parent object and the XmlLocation to update the original data.
    XmlListLocation: PropTypes.array.isRequired,
    // Tag for a single entry
    XmlSingleEntry: PropTypes.string.isRequired
};