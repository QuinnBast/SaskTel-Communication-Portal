/**
 *  React Imports
 */
import React, {Fragment} from "react";
import PropTypes from 'prop-types';

/**
 *  Component Imports
 */
import {Container, Col, Row, Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import Broadsoft from "../broadsoft/BroadSoft";
import { getTag } from "../broadsoft/xmlParse"

/**
 * Font awesome imports
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import XmlEditable from "./XmlEditable";

export default class Service extends React.Component {

    /**
     *
     * @param props
     *     hasEdit:boolean - if the item should have an edit button.
     *     hasToggle - if the item should have an active toggle button.
     *     onEnable:function - callback for when the component's toggle is set to active.
     *     activePath:array[string] - An array of strings which points to the XML response's location indicating if the service is active.
     *     name:string - the title of the setting.
     *     uri:string - the url for the service to access data
     *     onEdit(editPage:React.Component):function - a function that sets and moves the containing carousel to the edit page of the component
     *
     */

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            responseData: null,
            popover: false,
            status: "loading"
        };
    }

    componentDidMount() {
        this.loadAsync();
    }

    loadAsync = (silent = false) => {
        let self = this;
        if(!silent) {
            self.setState({status: "loading"});
        }
        if(this.props.uri !== "") {
            return Broadsoft.sendRequest({endpoint: this.props.uri}).then((response) => {
                if (self.props.hasToggle) {
                    let active = getTag(response, self.props.activePath) === "true";
                    self.setState({responseData: response, active: active, status: "ready"});
                } else {
                    self.setState({responseData: response, status: "ready"});
                }
            }, (response) => {
                let content = <div>{JSON.stringify(response)}</div>;
                self.props.onEdit(content);
            });
        } else {
            self.setState({status: "NotConfigured"});
        }
    };

    getValue = (XmlLocation) => {
        return getTag(this.state.responseData, XmlLocation);
    };

    edit = () => {

        this.loadAsync(true).then(() => {
         let toggle = null;
        if(this.props.hasToggle){
            toggle = <XmlEditable
                    name={"Active"}
                    tooltip={"Toggle that indicates if the services is currently enabled or not."}
                    type={"bool"}
                    XmlLocation={this.props.activePath}
                    getValue = {this.getValue}
                    uri={this.props.uri}/>;
            }

        let children = React.Children.map(this.props.children, child => {return React.cloneElement(child, {getValue: this.getValue, uri: this.props.uri});});

        let editPage = (
            <Container>
                <Container>
                    <div style={{marginTop: "15px"}}>
                        <p>{this.props.tooltip}</p>
                    </div>
                </Container>
                {toggle}
                {children}
            </Container>
        );

        this.props.onEdit(editPage, this.props.name, this);   
        }, () => {
            global.sendMessage("Could not load data from the service. This information may be incorrect.", {timeout: 7500, color: "warning"});
            let toggle = null;
        if(this.props.hasToggle){
            toggle = <XmlEditable
                    name={"Active"}
                    tooltip={"Toggle that indicates if the services is currently enabled or not."}
                    type={"bool"}
                    XmlLocation={this.props.activePath}
                    getValue = {this.getValue}
                    uri={this.props.uri}/>;
            }

        let children = React.Children.map(this.props.children, child => {return React.cloneElement(child, {getValue: this.getValue, uri: this.props.uri});});

        let editPage = (
            <Container>
                <Container>
                    <div style={{marginTop: "15px"}}>
                        <p>{this.props.tooltip}</p>
                    </div>
                </Container>
                {toggle}
                {children}
            </Container>
        );

        this.props.onEdit(editPage, this.props.name, this);
        });
    };

    togglePopover = () => {
        this.setState({popover: !this.state.popover})
    };

    render() {
        if(this.state.status === "loading"){
            let name = <h5 id={this.props.name.replace(/\s+/g, '') + "Name"}>{this.props.name} <FontAwesomeIcon className={"d-none d-md-inline"} id={this.props.name.replace(/\s+/g, '') + "TooltipHover"} icon={"question-circle"}/> </h5>;
            return(
                <Container>
                        <Row>
                            <Col xs={"6"} style={{paddingTop: "10px", margin: "auto"}}>{name}</Col>
                            <Col xs={"6"} style={{margin: "auto"}}>Loading...</Col>
                        </Row>
                </Container>
            )
        }

        if(this.state.status === "NotConfigured"){
            let name = <h5 id={this.props.name.replace(/\s+/g, '') + "Name"}>{this.props.name} <FontAwesomeIcon className={"d-none d-md-inline"} id={this.props.name.replace(/\s+/g, '') + "TooltipHover"} icon={"question-circle"}/> </h5>;
            return(
                <Container>
                        <Row>
                            <Col xs={"6"} style={{paddingTop: "10px", margin: "auto"}}>{name}</Col>
                            <Col xs={"6"} style={{margin: "auto"}}>Not configured. Contact admins for assistance.</Col>
                        </Row>
                </Container>
            )
        }

        let children = React.Children.map(this.props.children, child => {return React.cloneElement(child, {getValue: this.getValue, uri: this.props.uri});});

        let editButton = null;
        if (this.props.hasEdit) {
            editButton = <Button id={this.props.name.replace(/\s+/g, '') + "Edit"} color={"info"} onClick={this.edit}><FontAwesomeIcon icon={"edit"}/> <p className={"d-none d-md-inline"} style={{display: "inline"}}>Configure</p></Button>;
            children = null;
        }

        let name = <h5 id={this.props.name.replace(/\s+/g, '') + "Name"}>{this.props.name} <FontAwesomeIcon className={"d-none d-md-inline"} id={this.props.name.replace(/\s+/g, '') + "TooltipHover"} icon={"question-circle"}/> </h5>;
        // if(this.props.tabbed){
        //     name = <Row><Col xs={"12"}><Row><Col xs={"2"}><br/></Col><Col xs={"10"}>{this.props.name} <FontAwesomeIcon icon={"question-circle"} id={this.props.name.replace(/\s+/g, '')}/></Col></Row></Col></Row>;
        // }

        let toggle = null;
        if(this.props.hasToggle){
            let text = "Off";
            if(this.state.active) {
                text = "On"
            }
            toggle = <Fragment>
                <XmlEditable
                    name={"Active"}
                    tooltip={"Toggle that indicates if the services is currently enabled or not."}
                    type={"bool"}
                    XmlLocation={this.props.activePath}
                    getValue = {this.getValue}
                    hideTitle
                    uri={this.props.uri}/></Fragment>;
            }

        return (
            <React.Fragment key={this.state.uri}>
                <Container id={this.props.name + "Service"} style={{padding: "10px", borderBottom: "1px solid #80808026"}}>
                    <Container>
                        <Row>
                            <Col xs={"6"} style={{paddingTop: "10px", margin: "auto"}}>{name}</Col>
                            <Col xs={"3"} style={{margin: "auto"}}>{toggle}</Col>
                            <Col xs={"3"} style={{margin: "auto"}}>{editButton}</Col>
                        </Row>

                        <Popover id={this.props.name.replace(/\s+/g, '') + "Tooltip"} placement={"top"} trigger={"hover"} isOpen={this.state.popover} target={this.props.name.replace(/\s+/g, '') + "TooltipHover"} toggle={this.togglePopover} delay={0}>
                            <PopoverHeader>{this.props.name}</PopoverHeader>
                            <PopoverBody>{this.props.tooltip}</PopoverBody>
                        </Popover>
                    </Container>
                </Container>
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
    // The object's tooltip
    tooltip: PropTypes.string.isRequired
}