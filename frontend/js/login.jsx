import React from "react";
import MaskedInput from 'react-text-mask'
import {
    Col,
    Row,
    Container,
    Card,
    CardHeader,Button, Alert, FormFeedback,
    Form, FormGroup, Input, InputGroup, InputGroupAddon
} from 'reactstrap';

import auth from "./auth/auth";

let $ = require('jquery');

const UpperMarginForm = {
    marginTop: '1em',
};

const Padding = {
    paddingRight: '2em',
    paddingBottom: '2em',
    paddingLeft: '2em',
};

export default class Login extends React.Component {

    render(){
        return (
            <Container>
                <Row>
                    <Col md="2"/>
                    <Col md="8">
                        <Card outline color="info" style={Padding}>
                            <CardHeader tag="h3" className="text-center">Welcome to TelPort!</CardHeader>
                            <Form style={UpperMarginForm}>
                                <Row>
                                    <Col md="2"/>
                                    <Col md="8">
                                        <Alert hidden={true} id="alert" color="danger">
                                            Invalid Login Credentials. Try Again
                                        </Alert>
                                        <FormGroup id='usernameGroup' style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon style={{width: "8em",}} className={'mx-auto'} addonType="prepend" ><span style={{width: '100%',}} className={'input-group-text'}>Phone Number</span></InputGroupAddon>
                                                <MaskedInput
                                                    mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                                    placeholder="(___)-___-____"
                                                    id="username"
                                                    guide = {true}
                                                    onChange={auth.handleUsernameChange}
                                                    onBlur={auth.handleUsernameBlur}
                                                    render={(ref, props) => (
                                                        <Input type="text" innerRef={ref} {...props}/>
                                                    )}
                                                />
                                            </InputGroup>
                                            <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="usernameAlert">
                                                Phone number should be exactly 10 digits.
                                            </p>
                                        </FormGroup>
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon style={{width: "8em"}} className={'mx-auto'} addonType="prepend"><span style={{width: '100%',}} className={'input-group-text'}>Password </span></InputGroupAddon>
                                                <Input onBlur={auth.handlePasswordBlur} onChange={auth.handlePasswordChange} id="password" type="password" placeholder="**********"/>
                                            </InputGroup>
                                            <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="passwordAlert">
                                                A password is required to log in.
                                            </p>
                                        </FormGroup>
                                        <Button style={{width: '100%',}} className={'mx-auto'} onClick={auth.login}>Log in</Button>
                                    </Col>
                                    <Col md="2"/>
                                </Row>

                            </Form>
                        </Card>
                    </Col>
                    <Col md="2"/>
                </Row>
            </Container>
        );

    }

}