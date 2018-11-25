import React from "react";
import {
    Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";
import {
    Col,
    Row,
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

// Globally include jQuery
window.$ = window.jQuery = require("jquery");

import Interface from "./interface";
import Login from "./login";
import {ProtectedRoute} from "./auth/protectedroute";
import AuthButton from "./auth/authbutton";
import history from "./router/history";

const UpperMargin = {
    marginTop: '5em',
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
            <Router history={history}>
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
                                    <ProtectedRoute exact path="/" component={Interface}/>
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

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);

