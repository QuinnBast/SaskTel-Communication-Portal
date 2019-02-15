/**
 *  React Imports
 */
import React, {Fragment} from "react";

/**
 *  Style/UI Imports
 */
import MaskedInput from 'react-text-mask'
import {Form, Button, Alert, Container, FormGroup, Input, Label } from "reactstrap";
//import LoadingIcon from "../comps/LoadingIcon"

/**
 *  Authentication Imports
 */
import Auth from "../router/Auth";



/**
 *  Local Style Definitions
 */
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
            <Fragment>
                <Container>
                    <Alert color={"danger"} style={{visibility: "hidden"}} id="alert">
                        Invalid Login Credentials. Try Again
                    </Alert>
                    <Form id="LoginForm" autoComplete="off" style={UpperMarginForm} onSubmit={Auth.login}>

                        <FormGroup  id='usernameGroup' style={UpperMarginForm}>
                            <Label>Phone Number</Label>
                                <MaskedInput
                                    mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                    placeholder="(___)-___-____"
                                    id="username"
                                    guide = {true}
                                    autoComplete="off"
                                    onChange={Auth.handleUsernameChange}
                                    onBlur={Auth.handleUsernameBlur}
                                    className={"form-control"}
                                />
                            <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="usernameAlert">
                                Phone number should be exactly 10 digits.
                            </p>
                        </FormGroup>
                        <FormGroup style={UpperMarginForm}>
                            <Label>Password</Label>
                            <Input label="Password" onBlur={Auth.handlePasswordBlur} onChange={Auth.handlePasswordChange} id="password" type="password" autoComplete="off" placeholder="**********"/>
                            <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="passwordAlert">
                                A password is required to log in.
                            </p>
                        </FormGroup>
                        <Button color="primary" id="LoginButton" type={'submit'} style={{width: '100%',}} className={'mx-auto'}>Log in</Button>
                    </Form>
                </Container>
            </Fragment>
        );

    }

}