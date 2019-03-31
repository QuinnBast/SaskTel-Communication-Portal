/**
 *  React Imports
 */
import React, {Fragment} from "react";
/**
 *  Style Imports
 */
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from 'reactstrap';
import CallLogs from "./CallLogs";
import {NavButton} from "./NavButton"
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
        return (
            <Fragment>
                <NavButton onClick={this.showLogs} icon={<FontAwesomeIcon icon={"list-ul"}/>} text = {"Call Logs"}/>
                <Modal isOpen={this.state.modal} toggle={this.showLogs} size={"lg"}>
                    <ModalHeader toggle={this.showLogs}><h1>Call Logs</h1></ModalHeader>
                    <ModalBody style={{height: "70vh"}}>
                        <CallLogs/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.showLogs}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}