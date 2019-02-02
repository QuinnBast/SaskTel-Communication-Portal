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

export default class Service extends React.Component {

    /**
     *
     * @param props
     *     hasEdit:boolean - if the item should have an edit button.
     *     hasToggle - if the item should have an active toggle button.
     *     onEnable:function - callback for when the component's toggle is set to active.
     *     active:boolean - if the component is already active.
     *     name:string - the title of the setting.
     *     tabbed:boolean - if the title should be tabbed as a subset of a larger
     *     uri:string - the url for the service to access data
     *     onEdit(editPage:React.Component):function - a function that sets and moves the containing carousel to the edit page of the component
     */

    constructor(props) {
        super(props);
        this.state = {
            toggleState: !!this.props.active,
        }
    }


    // TEMPORARY FUNCTION
    // TODO: Determine how to render content
    edit = () => {
        let self = this;
        // Get the data from the uri
        Broadsoft.sendRequest({
            endpoint: this.props.uri,
            method: "GET",
            success: function(response){
                let content = <div>{JSON.stringify(response)}</div>;
                self.props.onEdit(content);
            },
            error: function(response){
                let content = <div>{JSON.stringify(response)}</div>;
                self.props.onEdit(content);
            }
        })
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

        let name = <Col xs={"6"}><h5>{this.props.name}</h5></Col>;
        if(this.props.tabbed){
            name = <Row><Col xs={"12"}><Row><Col xs={"2"}><br/></Col><Col xs={"10"}>{this.props.name}</Col></Row></Col></Row>;
        }

        let toggle = null;
        if(this.props.hasToggle){
            toggle = <Switch onChange={this.setToggle} checked={this.state.toggleState}/>;
                }

        return (
            <Container>
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