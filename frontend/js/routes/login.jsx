import React from "react";
import MaskedInput from 'react-text-mask'
import {Form, Button, Message} from "semantic-ui-react";


import auth from "../auth/auth";

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
            <div>
                <Message negative style={{visibility: "hidden"}} id="alert">
                    Invalid Login Credentials. Try Again
                </Message>
                <Form  autocomplete="off" style={UpperMarginForm}>

                    <Form.Field  id='usernameGroup' style={UpperMarginForm}>
                        <Form.Input label="Phone Number">
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="username"
                                guide = {true}
                                onChange={auth.handleUsernameChange}
                                onBlur={auth.handleUsernameBlur}
                            />
                        </Form.Input>
                        <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="usernameAlert">
                            Phone number should be exactly 10 digits.
                        </p>
                    </Form.Field>
                    <Form.Field style={UpperMarginForm}>
                        <Form.Input label="Password" onBlur={auth.handlePasswordBlur} onChange={auth.handlePasswordChange} id="password" type="password" placeholder="**********"/>
                        <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="passwordAlert">
                            A password is required to log in.
                        </p>
                    </Form.Field>
                    <Button style={{width: '100%',}} className={'mx-auto'} onClick={auth.login}>Log in</Button>
                </Form>
            </div>
        );

    }

}