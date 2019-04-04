/**
 *  React Imports
 */
import React, {Fragment} from "react";


/**
 *  Style Imports
 */
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from 'reactstrap';
import Auth from "../router/Auth";
import FeatureAccessCodes from "./FeatureAccessCodes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavButton} from "./NavButton";

export default class FeatureAccessCodesButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false
        }
    }

    showFeatureAccessCodes = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    render() {
        return (
            <Fragment>
                <NavButton onClick={this.showFeatureAccessCodes} icon={<FontAwesomeIcon icon={"book"}/>} text = {"Feature Access Codes"}/>
                <Modal isOpen={this.state.modal} toggle={this.showFeatureAccessCodes} size={"lg"}>
                    <ModalHeader toggle={this.showFeatureAccessCodes}><h1>Feature Access Codes</h1></ModalHeader>
                    <ModalBody style={{height: "70vh"}}>
                        <FeatureAccessCodes/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.showFeatureAccessCodes}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}