/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container, Col, Row, CustomInput, Button, Table} from 'reactstrap';
import Switch from 'react-switch';

export default class ProfileSettings extends React.Component {

    /**
     *
     * @param props
     *     hasEdit:boolean - if the item should have an edit button.
     *     hasToggle - if the item should have an active toggle button.
     *     onEnable:function - callback for when the component's toggle is set to active.
     *     active:boolean - if the component is already active.
     *     name:string - the title of the setting.
     *     tabbed:boolean - if the title should be tabbed as a subset of a larger setting
     */

    constructor(props) {
        super(props);
        this.state = {
            toggleState: !!this.props.active,
        }
    }

    onEnable(){
        // pass in the enable prop as this.props.onEnable
    }

    setToggle = (toggleState) => {
        this.setState({toggleState})
    };

    render() {
        let editButton = null;
        if (this.props.hasEdit) {
            editButton = <Button color={"primary"} onClick={this.props.onEdit}>Edit</Button>;
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