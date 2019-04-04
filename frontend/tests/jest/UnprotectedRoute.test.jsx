import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Auth from "../../js/router/Auth";
import history from "../../js/router/history"
import {UnprotectedRoute} from "../../js/router/UnprotectedRoute";
import {MemoryRouter, Switch} from "react-router";
import NavBar from "../../js/comps/NavBar";
require('babel-polyfill');
let xmljs = require('xml-js');


describe("UnprotectedRoute", () => {

    it('shows nothing if not authenticated', () => {
        history.push("/");
        let wrapper = shallow(
                <UnprotectedRoute/>
        );
    });

    it('shows a button if authenticated', () => {

        //
        //  Auth component stubs
        //

        // Setup the session
        let authSetupStub = sinon.stub(Auth, "sessionSetup").callsFake(function() {
            this.authenticated = true;
            this.username = "(111)111-1111";
            this.password = "fakepassword";
        });

        // setup the auth component
        Auth.sessionSetup();
        history.push("/");
        let wrapper = shallow(
            <MemoryRouter>
                <UnprotectedRoute/>
            </MemoryRouter>
        );
    });

});