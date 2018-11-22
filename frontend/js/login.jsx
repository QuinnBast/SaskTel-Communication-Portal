import React from "react";
import {
    Col,
    Row,
    Container,
    Card,
    CardHeader,Button,
    Form, FormGroup, Input, InputGroup, InputGroupAddon
} from 'reactstrap';
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

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
        }

        this.isAuthenticated = false;

        //Bind the update function to this object so that variable changes are tied to this object instance.
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username:event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    authenticate(){
        let object = {
                    "username":this.state.username,
                    "password":this.state.password,
                }
        let json = JSON.stringify(object);
        //Call server's login function
        $.ajax({
            type: "POST",
            url: "/rest/login",
            contentType: "application/json",
            data: json,
            dataType: "json",
            success: (data) => {
                if(data["login"] === true){
                //A cookit has already been set.
                this.isAuthenticated = true;

                //!!!! STORE THE CSRF TOKEN IN REACT STORE HERE!!!!!///
                }
            },
            failure: (data) => {
                console.log(data)
            }
        });
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col xs="2"/>
                    <Col xs="8">
                         <Card outline color="info" style={Padding}>
                            <CardHeader tag="h3" className="text-center">Welcome to TelPort!</CardHeader>
                            <Form style={UpperMarginForm}>
                                <Row>
                                    <Col xs="2"/>
                                    <Col xs="8">
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend" >Phone Number</InputGroupAddon>
                                                <Input value={this.state.username} onChange={this.handleUsernameChange} placeholder="#######"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend" >Password</InputGroupAddon>
                                                <Input value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="**********"/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="2"/>
                                </Row>

                            </Form>
                                <Button onClick={this.authenticate}>Log in</Button>
                        </Card>
                    </Col>
                    <Col xs="2"/>
                </Row>
            </Container>
        );

    }

}