/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container, Col, Row, CustomInput, Button, Table} from 'reactstrap';
import Switch from 'react-switch';
import Broadsoft from "../broadsoft/BroadSoft";
import { getTag, setTag } from "../broadsoft/xmlParse"
import EditService from "./EditService";

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
     *     editables - A list of editable components at the specified URI.
     *
     */

    constructor(props) {
        super(props);
        this.state = {
            toggleState: false,
            responseData: null,
            editComponent: null,
        };
        this.loadAsync();
    }

    loadAsync = () => {
        let self = this;
        Broadsoft.sendRequest({
            endpoint: this.props.uri,
            method: "GET",
            success: function(response){
                let toggleState = getTag(response, self.props.activePath) === "true";
                self.setState({responseData: response, toggleState: toggleState});
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

    setValue = (XmlLocation, value) => {
        return setTag(this.state.responseData, XmlLocation, value);
    };

    edit = () => {
        this.props.onEdit(<EditService key={this.props.name} parent={this} editables={this.props.editables} />);
    };

    onEnable(){
        // pass in the enable prop as this.props.onEnable
    }

    setToggle = (toggleState) => {
        this.setState({toggleState})
    };

    render() {
        let editButton = null;
        if (this.props.hasEdit) {
            editButton = <Button color={"primary"} onClick={this.edit}>Edit</Button>;
        }

        let name = <h5>{this.props.name}</h5>;
        if(this.props.tabbed){
            name = <Row><Col xs={"12"}><Row><Col xs={"2"}><br/></Col><Col xs={"10"}>{this.props.name}</Col></Row></Col></Row>;
        }

        let toggle = null;
        if(this.props.hasToggle){
            toggle = <Switch onChange={this.setToggle} checked={this.state.toggleState}/>;
                }

        return (
            <Container style={{padding: "10px"}}>
                <Container>
                    <Row style={{height: "40px"}}>
                        <Col xs={"6"}>{name}</Col>
                        <Col xs={"3"}>{toggle}</Col>
                        <Col xs={"3"}>{editButton}</Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}