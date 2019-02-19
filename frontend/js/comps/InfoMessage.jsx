/**
 * React imports
 */
import React from "react";

/**
 * Component imports
 */
import { Container, Button, Alert, Row, Col } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const stickyBottom = {
    position: "fixed",
    left: 0,
    bottom: "60px",
    width: "100%" ,
    textAlign: "center",
};

const InfoMessageContect = React.createContext('infomessage');

export default class InfoMessage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            message: null,
            timeout: 100,
            color: "primary"
        };
        global.sendMessage = this.sendMessage;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextState.message !== null) {
            setTimeout(this.close, nextState.timeout);
        }
    }

    sendMessage = (message, options) => {
        this.setState({message: message, timeout: options.timeout, color: options.color});
    };

    close = () => {
        this.setState({message: null})
    };

    render() {
        if(this.state.message !== null) {
            return (
                <Container style={stickyBottom} fluid>
                    <Container style={{width: "50%"}} id={"MessageCenterMessage"}>
                        <Alert color={this.state.color}>
                            <Row>
                                <Col xs={"10"}>{this.state.message}</Col>
                                <Col xs={"2"}><FontAwesomeIcon icon={"times"} color={"grey"} onClick={this.close}/></Col>
                            </Row>
                        </Alert>
                    </Container>
                </Container>
            )
        } else {
            return null;
        }
    }
}