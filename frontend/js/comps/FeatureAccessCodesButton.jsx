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
        return Auth.isAuthenticated() ? (
            <Fragment>
                <NavLink onClick={this.showFeatureAccessCodes}><FontAwesomeIcon icon={"book"}/>  Feature Access Codes</NavLink>

                <Modal isOpen={this.state.modal} toggle={this.showFeatureAccessCodes} size={"lg"}>
                    <ModalHeader toggle={this.showFeatureAccessCodes}>Feature Access Codes</ModalHeader>
                    <ModalBody>
                        <FeatureAccessCodes/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.showFeatureAccessCodes}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        ) : null;
    }
}