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
     *     uri:string - the url for the service to access data
     *     onEdit(editPage:React.Component):function - a function that sets and moves the containing carousel to the edit page of the component
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
        return Broadsoft.sendRequest({endpoint: this.props.uri}).then((response) => {
            if(self.props.hasToggle) {
                let active = getTag(response, self.props.activePath) === "true";
                self.setState({responseData: response, active: active, status: "ready"});
            } else {
                self.setState({responseData: response, status: "ready"});
            }
        }, (response) => {
            let content = <div>{JSON.stringify(response)}</div>;
            self.props.onEdit(content);
        });
    };

    getValue = (XmlLocation) => {
        return getTag(this.state.responseData, XmlLocation);
    };

    sendRequest = () => {
        let self = this;
        let request = {
            endpoint: this.props.uri,
            method: "PUT",
            data: this.state.responseData,
        };

        return Broadsoft.sendRequest(request).then((response) => {
            console.log("Successful Update.");
            global.sendMessage(self.props.name + " successfully updated.", {timeout: 3000, color: "success"});
        }, (response) => {
            console.log("ERROR SENDING UPDATE.");
            global.sendMessage("Error updating the " + self.props.name + " service!", {timeout: 3000, color: "danger"});
            // Permanently change background to red to indicate error to user.
            //jQuery("#" + nextProps.info.type).get(0).style.background = '#e74c3c';
            // Reset the state of the component by fetching the current state.
        });
    };

    setValue = (XmlLocation, value) => {
        setTag(this.state.responseData, XmlLocation, value);

        this.sendRequest();
    };

    edit = () => {
        let children = React.Children.map(this.props.children, child => {return React.cloneElement(child, {parent: this.state.responseData, sendUpdate: this.sendRequest});});

        let editPage = (
            <Container>
                <Container>
                    <div style={{marginTop: "15px"}}>
                        <p>{this.props.tooltip}</p>
                    </div>
                </Container>
                {children}
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

    render() {
        if(this.state.status === "loading"){
            return(
                <div>Loading...</div>
            )
        }

        let children = React.Children.map(this.props.children, child => {return React.cloneElement(child, {setValue: this.setValue, getValue: this.getValue});});

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
            toggle = <Switch
                id={this.props.name.replace(/\s+/g, '') + "Toggle"}
                onChange={this.toggle} checked={this.state.active}
                onColor="#1dd5f3"
                onHandleColor="#17a2b8"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}/>;
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