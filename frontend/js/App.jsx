import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom";
import {
    Col,
    Row,
    Container,
    Card,
    CardHeader,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav, Button,
    NavItem, NavLink,
    Form, FormGroup, Input, InputGroup, InputGroupAddon
} from 'reactstrap';

import Interface from "./interface";
import Login from "./login";


const UpperMargin = {
    marginTop: '5em',
};

const UpperMarginForm = {
    marginTop: '1em',
}

const Padding = {
    paddingRight: '2em',
    paddingBottom: '2em',
    paddingLeft: '2em',
};




export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render () {
        return (
            <Router>
                <div>
                    <Navbar color="dark" dark expand="md">
                        <NavbarBrand tag={Link} to="/">TelPort</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <AuthButton/>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Container style={UpperMargin}>
                        <Row>
                            <Col>
                                <Switch>
                                    <Route exact path="/" component={Interface}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="*" component={NoMatch}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
        return cb;
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

class AuthButton extends React.Component{
    render() {
        if(fakeAuth.isAuthenticated)
        return (<NavLink tag={Link} to="/" onClick={() => {fakeAuth.signout();}}>Sign out</NavLink>)
        else
            return ("");
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class LLogin extends React.Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

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
                                                <Input placeholder="#######"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup style={UpperMarginForm}>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend" >Password</InputGroupAddon>
                                                <Input type="password" placeholder="**********"/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="2"/>
                                </Row>

                            </Form>
                                <Button onClick={this.login}>Log in</Button>
                        </Card>
                    </Col>
                    <Col xs="2"/>
                </Row>
            </Container>
        );
    }
}

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

