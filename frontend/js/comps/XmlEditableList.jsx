/**
 *  React Imports
 */
import React, {Fragment} from "react";
import PropTypes from 'prop-types';

/**
 * Component Imports
 */
import {Container, Popover, PopoverHeader, PopoverBody, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { getTag } from "../broadsoft/xmlParse";


let $ = require('jquery');

export default class XmlEditableList extends React.Component {
    /**
     *
     * @param props
     *  name:string - the name of the component
     *  tooltip:string - A tooltip to display when hovering over the name
     *  valueMap:[[name, XmlLocation, type, tooltip]] - a map of the list's values.
     *  XmlListLocation:{parent:React.Component, xmlListLocation:array[string], listIndex:int} - an object which links the editable to the parent
     *
     */

    constructor(props){
        super(props);
        this.state = {
            list: this.props.parent.current.getValue(this.props.XmlListLocation).elements,
            popover: false,
            dropdown: false,
            selectedItem: this.props.parent.current.getValue(this.props.XmlListLocation).elements[0],
        }
    }

    toggleDropdown = () => {
        this.setState({dropdown: !this.state.dropdown})
    };

    setSelectedItem = (itemIndex) => {
        this.setState({selectedItem: itemIndex})
    };

    render(){
        let padding = {
            padding: "10px"
        };

        let name = <h5>{this.props.name} <FontAwesomeIcon className={"d-none d-md-inline"} icon={"question-circle"} id={this.props.name.replace(/\s+/g, '')}/></h5>;

        let titlePopover = <Popover placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover} delay={0}>
            <PopoverHeader>{this.props.name}</PopoverHeader>
            <PopoverBody>{this.props.tooltip}</PopoverBody>
        </Popover>;

        let items = [];
        let index = 0;
        for(let element of this.state.list) {
            items.push(<DropdownItem onClick={() => this.setSelectedItem(element)} key={getTag(element, [this.props.valueMap[0][1]])}>{this.props.valueMap[0][0]} {getTag(element, [this.props.valueMap[0][1]])}</DropdownItem>);
        }

        return (
            <Container id={this.props.name.replace(/\s+/g, '') + "EditableBool"} style={padding}>
                <div>{name}</div>
                <div>
                    <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown} direction={'down'}>
                        <DropdownToggle caret>
                            {this.props.valueMap[0][0]} {getTag(this.state.selectedItem, [this.props.valueMap[0][1]])}
                        </DropdownToggle>
                        <DropdownMenu>
                            {items}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {titlePopover}
            </Container>
        );
    }
}

XmlEditableList.propTypes = {
    // The name of the setting to edit
    name: PropTypes.string.isRequired,
    // A tooltip that appears when hovering the item's (?) icon
    tooltip: PropTypes.string.isRequired,
    // The value map which describes the values within the list.
    valueMap: PropTypes.array.isRequired,
    // An object that links the parent object and the XmlLocation to update the original data.
    XmlListLocation: PropTypes.array.isRequired,
    // A reference to the parent service.
    parent: PropTypes.object.isRequired,
};