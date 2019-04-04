import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Auth from "../../js/router/Auth";
import {ProtectedRoute} from "../../js/router/ProtectedRoute";
require('babel-polyfill');
let xmljs = require('xml-js');


describe("NavButton", () => {

    it('shows nothing if not authenticated', () => {
        let wrapper = shallow(<ProtectedRoute/>);
        expect(wrapper.children()).toHaveLength(0);
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

        let wrapper = shallow(<ProtectedRoute/>);
    });

});