import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import ProfileSettings from '../../js/comps/ProfileSettings';
import Auth from '../../js/router/Auth';

// Setup the session
let authSetupStub = sinon.stub(Auth, "sessionSetup").callsFake(function() {
    this.authenticated = true;
    this.username = "(111)111-1111";
    this.password = "fakepassword";
});

// setup the auth component
Auth.sessionSetup();


describe("ProfileSettings", () => {
    it('shows loading while waiting for a response', () => {
        let wrapper = shallow(<ProfileSettings/>);
        expect(wrapper.find("#ProfileServices").html()).toMatch("Loading");
    });
});