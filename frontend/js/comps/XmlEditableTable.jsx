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
import { getTag, setTag } from "../broadsoft/xmlParse";
import XmlEditable from "./XmlEditable";
import MaskedInput from "./PersonalContacts";


let $ = require('jquery');

export default class XmlEditableTable extends React.Component {

    constructor(props){
        super(props);
        let elementList = getTag(this.props.parent, this.props.XmlListLocation).elements;
        this.state = {
            list: elementList,
            popover: false,
        };
    }

    togglePopover = () => {
        this.setState({popover: !this.state.popover});
    };

    getValue = (element, XmlLocation) => {
      return getTag(element, XmlLocation);
    };

    sendUpdate = () => {
        this.props.sendUpdate();
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
                let referencedChild = React.cloneElement(child, {parent: element, sendUpdate: this.sendUpdate});
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
};