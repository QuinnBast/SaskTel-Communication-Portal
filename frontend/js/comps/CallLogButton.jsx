/**
 *  React Imports
 */
import React, {Fragment} from "react";


/**
 *  Style Imports
 */
        import {Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from 'reactstrap';
import Auth from "../router/Auth";
import CallLogs from "./CallLogs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class CallLogButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modal: false
        }
    }

        showLogs = () => {
        this.setState({modal: !this.state.modal})
};

    render() {
        return Auth.isAuthenticated() ? (
            <Fragment>
                <NavLink onClick={this.showLogs}><FontAwesomeIcon icon={"list-ul"}/>  Call Logs</NavLink>

                <Modal isOpen={this.state.modal} toggle={this.showLogs} size={"lg"}>
                    <ModalHeader toggle={this.showLogs}>Call Log</ModalHeader>
                    <ModalBody>
                        <CallLogs/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.showLogs}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        ) : null;
    }
}