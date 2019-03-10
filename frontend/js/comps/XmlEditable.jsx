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
import {getTag, setTag} from "../broadsoft/xmlParse";


let $ = require('jquery');

export default class XmlEditable extends React.Component {

    constructor(props){
        super(props);
        let value = getTag(this.props.parent, this.props.XmlLocation);
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

    inputChange = (event) => {
        switch(this.props.type){
            case "range":
                this.setState({value: event.target.value});
                if(validate(event.target.value, {type:"range", range: [this.props.range[0], this.props.range[1]]})) {
                    setTag(this.props.parent, this.props.XmlLocation, event.target.value);
                    this.props.sendUpdate();
                } else {
                    // Validation fail
                }
                break;
            case "bool":
                this.setState({value: !this.state.value});
                if(validate(this.state.value, {type:"bool"})) {
                    setTag(this.props.parent, this.props.XmlLocation, !this.state.value);
                    this.props.sendUpdate();
                }
                break;
            default:
                if(validate(event.target.value, {type:this.props.type})) {
                    setTag(this.props.parent, this.props.XmlLocation, event.target.value);
                    this.props.sendUpdate();
                }
                break;
        }
    };

    updateValue = (event) => {
        this.setState({value: event.target.value});
    };

    onRangeSlide = (event) => {
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

        let name = <h5>{this.props.name} <FontAwesomeIcon className={"d-none d-md-inline"} icon={"question-circle"} id={this.props.name.replace(/\s+/g, '')}/></h5>;

        let titlePopover = <Popover placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover} delay={0}>
            <PopoverHeader>{this.props.name}</PopoverHeader>
            <PopoverBody>{this.props.tooltip}</PopoverBody>
        </Popover>;
        if(this.props.hideTitle){
            name = [];
            titlePopover = []
        }

        if(this.props.locked){
            return(
                <Container id={this.props.name.replace(/\s+/g, '') + "Locked"} style={padding}>
                    <div>{name}</div>
                    <div>{this.state.value}</div>
                    {titlePopover}
                </Container>
            );
        }


        switch(this.props.type){
            case "bool":
                return(
                    <Container id={this.props.name.replace(/\s+/g, '') + "EditableBool"} style={padding}>
                        <div>{name}</div>
                        <div><Switch
                            onChange={this.inputChange}
                            checked={this.state.value}
                            onColor="#1dd5f3"
                            onHandleColor="#17a2b8"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}/>
                        </div>
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
                                           onChange={this.onRangeSlide}
                                           onMouseUp={this.inputChange}
                                           value={this.state.value}
                                           style={{border: "none"}}
                                    />
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
                                onChange={(e) => this.inputChange(e)}
                                className={"form-control"}
                            />
                        </div>
                        {titlePopover}
                    </Container>
                );
            case "number":
                return(
                    <Container id={this.props.name.replace(/\s+/g, '') + "EditableNumber"} style={padding}>
                        <div>{name}</div>
                        <div>
                            <Input value={this.state.value} onChange={this.inputChange}/>
                        </div>
                        {titlePopover}
                    </Container>
                );
            case "string":
                return(
                    <Container id={this.props.name.replace(/\s+/g, '') + "EditableString"} style={padding}>
                        <div>{name}</div>
                        <div>
                            <Input value={this.state.value} onChange={this.updateValue} onBlur={this.inputChange}/>
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
    type: PropTypes.oneOf(["bool", "range", "phone", "number", "string"]).isRequired,
    // Optional: if type is 'range', an array of the [min, max] values
    range: PropTypes.array,
    // An object that links the parent object and the XmlLocation to update the original data.
    XmlLocation: PropTypes.array.isRequired,
    // A reference to the XML object that is updated.
    parent: PropTypes.object,
    // A boolean which determines if the object should be locked.
    locked: PropTypes.bool,
    // Determines if the title should be hidden
    hideTitle: PropTypes.bool
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
        default:
            return true;
    }
}