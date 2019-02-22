/**
 *  React Imports
 */
import React, {Fragment} from "react";
import PropTypes from 'prop-types';

/**
 * Component Imports
 */
import Switch from 'react-switch';
import {Col, Row, Container, Input, Popover, PopoverHeader, PopoverBody} from "reactstrap";
import MaskedInput from 'react-text-mask';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


let $ = require('jquery');

export default class XmlEditable extends React.Component {
    /**
     *
     * @param props
     *  name:string - the name of the component
     *  tooltip:string - A tooltip to display when hovering over the name
     *  type:OneOf(bool, phone, range) - the type of editable to display
     *  range:[min, max] - the range of potential values of a number (optional. Required for type "range")
     *  value:<oneOf(bool, string, int)> - the value of the editable
     *  XmlLocation:{parent:React.Component, xmlLocation:array[string]} - an object which links the editable to the parent
     *
     */

    constructor(props){
        super(props);
        let value = this.props.parent.current.getValue(this.props.XmlLocation);
        if(this.props.type === "bool"){
            value = value === "true" || value === true;
        } else if(this.props.type === "range"){
            value = parseInt(value);
        }
        this.state = {
            originalValue: value,
            value: value,
            popover: false,
            statusPopover: false
        }
    }

    toggleBoolean = () => {
        this.setState({value: !this.state.value});
        if(validate(this.state.value, {type:"bool"})) {
            this.props.parent.current.setValue(this.props.XmlLocation, !this.state.value);
        }
    };

    changePhone = (event) => {
        this.setState({value: event.target.value});
        // Only send if 10 characters or null
        if(validate(event.target.value, {type:"phone"})) {
            this.props.parent.current.setValue(this.props.XmlLocation, event.target.value);
        }
    };

    inputChange = (event) => {
        this.setState({value: event.target.value});
        if(validate(event.target.value, {type:"range", range: [this.props.range[0], this.props.range[1]]})) {
            this.props.parent.current.setValue(this.props.XmlLocation, event.target.value);
        } else {
            // Validation fail
        }
    };

    rangeChange = (event) => {
        this.setState({value: event.target.value});
    };

    togglePopover = () => {
        this.setState({popover: !this.state.popover});
    };

    validate = () => {
        return validate(this.state.value, {type: this.props.type, range: this.props.range})
    };

    toggleStatusPopover = () => {
        this.setState({statusPopover: !this.state.statusPopover});
    };

    render(){
        let padding = {
            padding: "10px"
        };
        let centered = {
            margin: "auto",
            textAlign: "center"
        };

        let name = <h5>{this.props.name} <FontAwesomeIcon icon={"question-circle"} id={this.props.name.replace(/\s+/g, '')}/></h5>;

        let titlePopover = <Popover placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover} delay={0}>
            <PopoverHeader>{this.props.name}</PopoverHeader>
            <PopoverBody>{this.props.tooltip}</PopoverBody>
        </Popover>;


        switch(this.props.type){
            case "bool":
                return(
                    <Container id={this.props.name.replace(/\s+/g, '') + "EditableBool"} style={padding}>
                        <div>{name}</div>
                        <div><Switch onChange={this.toggleBoolean} checked={this.state.value}/></div>
                        {titlePopover}
                    </Container>
                );
            case "range":
                return(
                    <Container id={this.props.name.replace(/\s+/g, '') + "EditableRange"} style={padding}>
                        <div>{name}</div>
                        <div>
                            <div style={{textAlign: "center"}}><h3>Value: {this.state.value}</h3></div>
                            <Row>
                                <Col xs={"1"}><h4>{this.props.range[0]}</h4></Col>
                                <Col xs={"9"}>
                                    <Input name={this.props.name.replace(/\s+/g, '')}
                                        type={"range"}
                                        min={this.props.range[0]}
                                        max={this.props.range[1]}
                                        step={1}
                                        onChange={this.rangeChange}
                                        onMouseUp={this.inputChange}
                                        value={this.state.value}/>
                                </Col>
                                <Col xs={"1"}><h4>{this.props.range[1]}</h4></Col>
                            </Row>
                        </div>
                        {titlePopover}
                    </Container>
                );
            case "phone":
                return(
                    <Container id={this.props.name.replace(/\s+/g, '') + "EditablePhone"} style={padding}>
                        <div>{name}</div>
                        <div>
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="EditablePhone"
                                guide = {true}
                                autoComplete="off"
                                defaultValue={this.state.value}
                                onChange={(e) => this.changePhone(e)}
                                className={"form-control"}
                            />
                        </div>
                        {titlePopover}
                    </Container>
                );
        }
    }
}

XmlEditable.propTypes = {
    // The name of the setting to edit
    name: PropTypes.string.isRequired,
    // A tooltip that appears when hovering the item's (?) icon
    tooltip: PropTypes.string.isRequired,
    // The type of data that the editable information takes on
    type: PropTypes.oneOf(["bool", "range", "phone"]).isRequired,
    // Optional: if type is 'range', an array of the [min, max] values
    range: PropTypes.array,
    // An object that links the parent object and the XmlLocation to update the original data.
    XmlLocation: PropTypes.array.isRequired,
    // The parent update to update
    parent: PropTypes.object.isRequired,
};

export function validate(value, type){
    if(value === null){
        return false;
    }
    switch(type.type){
        case "bool":
            return value === true || value === false;
        case "phone":
            return value.replace(/[_()-]/g, '').length === 10;
        case "range":
            return  value >= type.range[0] || value <= type.range[1]
    }
}