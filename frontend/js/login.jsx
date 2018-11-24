import React from "react";
import MaskedInput from 'react-text-mask'
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
                    <Col md="2"/>
                    <Col md="8">
                        <Card outline color="info" style={Padding}>
                            <CardHeader tag="h3" className="text-center">Welcome to TelPort!</CardHeader>
                            <Form style={UpperMarginForm}>
                                <Row>
                                    <Col md="2"/>
                                    <Col md="8">
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon style={{width: "10em",}} addonType="prepend" >Phone Number</InputGroupAddon>
                                                <MaskedInput
                                                    mask={[/\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                                    placeholder="___-___-____"
                                                    id="username"
                                                    guide = {true}
                                                    onChange={auth.handleUsernameChange}
                                                    render={(ref, props) => (
                                                        <Input type="text" innerRef={ref} {...props}/>
                                                    )}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon style={{width: "10em"}} className={'mx-auto'} addonType="prepend" >Password</InputGroupAddon>
                                                <Input onChange={auth.handlePasswordChange} type="password" placeholder="**********"/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2"/>
                                </Row>

                            </Form>
                            <Button onClick={auth.login}>Log in</Button>
                        </Card>
                    </Col>
                    <Col md="2"/>
                </Row>
            </Container>
        );

    }

}