/**
 *  React Imports
 */
import React, {Fragment} from "react";

/**
 *  Style/UI Imports
 */
import MaskedInput from 'react-text-mask'
import {Form, Button, Message} from "semantic-ui-react";
import LoadingIcon from "../comps/LoadingIcon"

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
                <Message negative style={{visibility: "hidden"}} id="alert">
                    Invalid Login Credentials. Try Again
                </Message>
                <Form  autoComplete="off" style={UpperMarginForm} onSubmit={Auth.login}>

                    <Form.Field  id='usernameGroup' style={UpperMarginForm}>
                        <Form.Input label="Phone Number">
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="username"
                                guide = {true}
                                autoComplete="off"
                                onChange={Auth.handleUsernameChange}
                                onBlur={Auth.handleUsernameBlur}
                            />
                        </Form.Input>
                        <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="usernameAlert">
                            Phone number should be exactly 10 digits.
                        </p>
                    </Form.Field>
                    <Form.Field style={UpperMarginForm}>
                        <Form.Input label="Password" onBlur={Auth.handlePasswordBlur} onChange={Auth.handlePasswordChange} id="password" type="password" autoComplete="off" placeholder="**********"/>
                        <p style={{visibility: "hidden", color : '#e74c3c'}} align="right" id="passwordAlert">
                            A password is required to log in.
                        </p>
                    </Form.Field>
                    <Button type={'submit'} style={{width: '100%',}} className={'mx-auto'}>Log in</Button>
                </Form>
            </Fragment>
        );

    }

}