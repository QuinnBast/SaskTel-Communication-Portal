import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Profile from '../../js/comps/Profile';
import Auth from '../../js/router/Auth';
import BroadSoft from '../../js/broadsoft/BroadSoft';
require('babel-polyfill');
let xmljs = require('xml-js');

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


describe("Profile", () => {

    it('shows loading while waiting for a response', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve(xmljs.xml2js("<Profile><details><firstName>FakeFirstName</firstName><lastName>fakeLastName</lastName><number>7777777777</number><extension>7777</extension></details></Profile>"));});

        let wrapper = shallow(<Profile/>);
        expect(wrapper.debug()).toMatch("Welcome");
        broadsoftStub.restore();
    });

    it('sends a request', async () => {
        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve(xmljs.xml2js("<Profile><details><firstName>FakeFirstName</firstName><lastName>fakeLastName</lastName><number>7777777777</number><extension>7777</extension></details></Profile>"));});

        let wrapper = shallow(<Profile/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        wrapper.update();

        expect(broadsoftStub.calledOnce).toEqual(true);
        broadsoftStub.restore();
    });

});