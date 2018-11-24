import React from "react";
import {
    Col,
    Row,
    Container,
    Card,
    CardHeader,Button,
    Form, FormGroup, Input, InputGroup, InputGroupAddon
} from 'reactstrap';

import auth from "./auth/auth";

let $ = require('jquery');

const UpperMarginForm = {
    marginTop: '1em',
}

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
                    <Col sm="2"/>
                    <Col sm="8">
                         <Card outline color="info" style={Padding}>
                            <CardHeader tag="h3" className="text-center">Welcome to TelPort!</CardHeader>
                            <Form style={UpperMarginForm}>
                                <Row>
                                    <Col sm="2"/>
                                    <Col sm="8">
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend" >Phone Number</InputGroupAddon>
                                                <Input type="number" onChange={auth.handleUsernameChange} placeholder="#######"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend" >Password</InputGroupAddon>
                                                <Input onChange={auth.handlePasswordChange} type="password" placeholder="**********"/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="2"/>
                                </Row>

                            </Form>
                                <Button onClick={auth.login}>Log in</Button>
                        </Card>
                    </Col>
                    <Col sm="2"/>
                </Row>
            </Container>
        );

    }

}