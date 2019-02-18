/**
 *  React Imports
 */
import React from "react";
import PropTypes from 'prop-types';

/**
 *  Component Imports
 */
import {Container, Col, Row, CustomInput, Button, Table, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import Switch from 'react-switch';
import Broadsoft from "../broadsoft/BroadSoft";
import { getTag, setTag } from "../broadsoft/xmlParse"
import { validate } from "./XmlEditable";

/**
 * Font awesome imports
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Service extends React.Component {

    /**
     *
     * @param props
     *     hasEdit:boolean - if the item should have an edit button.
     *     hasToggle - if the item should have an active toggle button.
     *     onEnable:function - callback for when the component's toggle is set to active.
     *     activePath:array[string] - An array of strings which points to the XML response's location indicating if the service is active.
     *     name:string - the title of the setting.
     *     tabbed:boolean - if the title should be tabbed as a subset of a larger
     *     uri:string - the url for the service to access data
     *     onEdit(editPage:React.Component):function - a function that sets and moves the containing carousel to the edit page of the component
     *     inLineEdit - determines if the editables of the component should be visible and grouped under the component
     *
     */

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            responseData: null,
            editComponent: null,
            popover: false,
            status: "loading"
        };
    }

    componentDidMount() {
        this.loadAsync();
    }

    loadAsync = () => {
        let self = this;
        Broadsoft.sendRequest({
            endpoint: this.props.uri,
            method: "GET",
            success: function(response){
                if(self.props.hasToggle) {
                    let active = getTag(response, self.props.activePath) === "true";
                    self.setState({responseData: response, active: active, status: "ready"});
                } else {
                    self.setState({responseData: response, status: "ready"});
                }
            },
            error: function(response){
                let content = <div>{JSON.stringify(response)}</div>;
                self.props.onEdit(content);
            }
        })
    };

    getValue = (XmlLocation) => {
        return getTag(this.state.responseData, XmlLocation);
    };

    sendRequest = () => {
        let request = {
            endpoint: this.props.uri,
            method: "PUT",
            data: this.state.responseData,
            success: function(response){
                console.log("Successful Update.")
            },
            error: function(response){
                console.log("ERROR SENDING UPDATE.")
                // Permanently change background to red to indicate error to user.
                //jQuery("#" + nextProps.info.type).get(0).style.background = '#e74c3c';
                // Reset the state of the component by fetching the current state.
            }
        };

        Broadsoft.sendRequest(request);
    };

    setValue = (XmlLocation, value) => {
        setTag(this.state.responseData, XmlLocation, value);

        this.sendRequest();
    };

    edit = () => {
        let editPage = (
            <Container>
                {this.props.children}
            </Container>
        );
        this.props.onEdit(editPage, this.props.name, this);
    };

    isActive = () => {
        return this.state.active;
    };

    toggle = (toggleState) => {
        this.setState({active: toggleState});
        this.setValue(this.props.activePath, toggleState);
    };

    togglePopover = () => {
        this.setState({popover: !this.state.popover})
    };

    tabChildren = (children) => {
        let tabs = [];
        if(children == null){
            return null;
        }
        for(let child of children) {
            tabs.push(
                <Row key={child.props.name}>
                    <Col xs={"12"}>
                        <Row>
                            <Col xs={"1"}><br/></Col>
                            <Col xs={"11"}>{child}</Col>
                        </Row>
                    </Col>
                </Row>);
        }
        return tabs;
    };

render() {
    if(this.state.status === "loading"){
        return(
            <div>Loading...</div>
        )
    }

    let editButton = null;
    let children = this.props.children;
    if (this.props.hasEdit) {
        editButton = <Button id={this.props.name.replace(/\s+/g, '') + "Edit"} color={"primary"} onClick={this.edit}><FontAwesomeIcon icon={"edit"}/> Configure</Button>;
        children = null;
    }

    let name = <h5 id={this.props.name.replace(/\s+/g, '') + "Name"}>{this.props.name} <FontAwesomeIcon id={this.props.name.replace(/\s+/g, '') + "TooltipHover"} icon={"question-circle"} id={this.props.name.replace(/\s+/g, '')}/> </h5>;
    // if(this.props.tabbed){
    //     name = <Row><Col xs={"12"}><Row><Col xs={"2"}><br/></Col><Col xs={"10"}>{this.props.name} <FontAwesomeIcon icon={"question-circle"} id={this.props.name.replace(/\s+/g, '')}/></Col></Row></Col></Row>;
    // }

    let toggle = null;
    if(this.props.hasToggle){
        toggle = <Switch id={this.props.name.replace(/\s+/g, '') + "Toggle"} onChange={this.toggle} checked={this.state.active}/>;
    }

    return (
        <React.Fragment key={this.state.uri}>
            <Container style={{padding: "10px", borderBottom: "1px solid #80808026"}}>
                <Container>
                    <Row style={{height: "40px"}}>
                        <Col xs={"6"}>{name}</Col>
                        <Col xs={"3"}>{toggle}</Col>
                        <Col xs={"3"}>{editButton}</Col>
                    </Row>

                    <Popover id={this.props.name.replace(/\s+/g, '') + "Tooltip"} placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '')} toggle={this.togglePopover} delay={0}>
                        <PopoverHeader>{this.props.name}</PopoverHeader>
                        <PopoverBody>{this.props.tooltip}</PopoverBody>
                    </Popover>
                </Container>
            </Container>
            {this.tabChildren(children)}
        </React.Fragment>
    );
}
}

Service.propTypes = {
    // If the item has an 'Edit' button
    hasEdit: PropTypes.bool,
    // If the item has a toggle button
    hasToggle: PropTypes.bool,
    // The path to determine if the service is active within the XML response
    activePath: PropTypes.array,
    // The name of the service
    name: PropTypes.string.isRequired,
    // The uri to access for endpoint data and updates.
    uri: PropTypes.string.isRequired,
    // A function passed from CarouselManager to handle changing carousel slides
    onEdit: PropTypes.func.isRequired,
    // A list of editable properties in the XML response and their types.
    editables: PropTypes.object,
    // The object's tooltip
    tooltip: PropTypes.string.isRequired
}