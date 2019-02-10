/**
 *  React Imports
 */
import React from "react";
import Switch from 'react-switch';
import {Col, Row, Container, Input, Popover, PopoverHeader, PopoverBody} from "reactstrap";
import MaskedInput from 'react-text-mask'

export default class Editable extends React.Component {
    /**
     *
     * @param props
     *  name:string - the name of the component
     *  tooltip:string - A tooltip to display when hovering over the name
     *  type:OneOf(bool, phone, range) - the type of editable to display
     *  range:[min, max] - the range of potential values of a number (optional. Required for type "range")
     *  value:<oneOf(bool, string, int)> - the value of the editable
     *  updateLocation:{parent:React.Component, xmlLocation:array[string]} - an object which links the editable to the parent
     *
     */

    constructor(props){
        super(props);
        let value = this.props.value;
        if(this.props.type === "bool"){
            value = this.props.value === "true";
        }
        this.state = {
            value: value,
            popover: false
        }
    }

    toggleBoolean = () => {
        this.setState({value: !this.state.value});
        if(validate(this.state.value, {type:"bool"})) {
            this.props.updateLocation.parent.setValue(this.props.updateLocation.XmlLocation, !this.state.value);
        }
    };

    changePhone = (event) => {
        this.setState({value: event.target.value});
        // Only send if 10 characters or null
        if(validate(event.target.value, {type:"phone"})) {
            this.props.updateLocation.parent.setValue(this.props.updateLocation.XmlLocation, event.target.value);
        }
    };

    inputChange = (event) => {
        this.setState({value: event.target.value});
        if(validate(event.target.value, {type:"range", range: [this.props.range[0], this.props.range[1]]})) {
            this.props.updateLocation.parent.setValue(this.props.updateLocation.XmlLocation, event.target.value);
        } else {
            // Validation fail
        }
    };

    togglePopover = () => {
        this.setState({popover: !this.state.popover});
    };

    render(){
        let padding = {
            padding: "10px",
        }
        switch(this.props.type){
            case "bool":
                return(
                    <Container style={padding}>
                        <Row style={{height: "40px"}}>
                            <Col xs={"6"} id={this.props.name.replace(/\s+/g, '')}><h5>{this.props.name}</h5></Col>
                            <Col xs={"6"}><Switch onChange={this.toggleBoolean} checked={this.state.value}/></Col>
                        </Row>
                        <Popover placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover}>
                            <PopoverHeader>{this.props.name}</PopoverHeader>
                            <PopoverBody>{this.props.tooltip}</PopoverBody>
                        </Popover>
                    </Container>
                );
            case "range":
                return(
                    <Container style={padding}>
                        <Row style={{height: "40px"}}>
                            <Col xs={"6"} id={this.props.name.replace(/\s+/g, '')}><h5>{this.props.name}</h5></Col>
                            <Col xs={"6"}><Input type={"number"} onChange={this.inputChange}/></Col>
                        </Row>
                        <Popover placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover}>
                            <PopoverHeader>{this.props.name}</PopoverHeader>
                            <PopoverBody>{this.props.tooltip}</PopoverBody>
                        </Popover>
                    </Container>
                );
            case "phone":
                return(
                    <Container style={padding}>
                        <Row style={{height: "40px"}}>
                            <Col xs={"6"} id={this.props.name.replace(/\s+/g, '')}><h5>{this.props.name}</h5></Col>
                            <Col xs={"6"}>
                                <MaskedInput
                                    mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                    placeholder="(___)-___-____"
                                    id="EditablePhone"
                                    guide = {true}
                                    autoComplete="off"
                                    defaultValue={this.state.value}
                                    onChange={(e) => this.changePhone(e)}
                                />
                            </Col>
                        </Row>
                        <Popover placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover}>
                            <PopoverHeader>{this.props.name}</PopoverHeader>
                            <PopoverBody>{this.props.tooltip}</PopoverBody>
                        </Popover>
                    </Container>
                );
        }
    }
}

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