import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import ProfileSettings from '../../js/comps/ProfileSettings';
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

//
//  Broadsoft component stubs
//
let broadsoftRequest = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
    expect(args['endpoint']).toBe("/user/<user>/services");

    let fakeResponse = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><Services xmlns=\"http://schema.broadsoft.com/xsi\"><service><name>Do Not Disturb</name> <uri>/v2.0/user/fakeuser/services/donotdisturb</uri></service><service><name>FakeService</name> <uri>/v2.0/user/fakeuser/services/fakeservice</uri></service></Services>";

    // Convert the response into xml object.
    let response = xmljs.xml2js(fakeResponse);

    return Promise.resolve(response);
});


describe("ProfileSettings", () => {

    beforeEach(() => {
        // Reset function spies
        broadsoftRequest.resetHistory();
    });

    it('shows loading while waiting for a response', () => {
        let wrapper = shallow(<ProfileSettings onEdit={() => {return true}}/>);
        expect(wrapper.find("#ProfileServices").html()).toMatch("Loading");
    });

    it('sends a request', async () => {
        let wrapper = shallow(<ProfileSettings onEdit={() => {return true}}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        wrapper.update();
        expect(broadsoftRequest.calledOnce).toEqual(true);
    });

    it('renders new services', async () => {
        const wrapper = shallow(<ProfileSettings onEdit={() => {return true}}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        wrapper.update();

        expect(broadsoftRequest.calledOnce).toEqual(true);
        expect(wrapper.find("#ProfileServices").children()).toHaveLength(2);
        expect(wrapper.find("#ProfileServices").debug()).toMatch("Do Not Disturb");
        expect(wrapper.find("#ProfileServices").debug()).toMatch("FakeService");
    });

    it('displays an error if services cannot be loaded', async () => {

        // Unset the stub
        broadsoftRequest.restore();

        let failedBroadsoftRequest = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint']).toBe("/user/<user>/services");

            return Promise.reject();
        });

        let wrapper = shallow(<ProfileSettings onEdit={() => {return true}}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        wrapper.update();

        expect(failedBroadsoftRequest.calledOnce).toEqual(true);
        expect(wrapper.find("#ProfileServices").html()).toMatch("error");
    })

    it('should not render services without a uri', async () => {

        // Unset the stub
        broadsoftRequest.restore();

        let broadsoftNoUri = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint']).toBe("/user/<user>/services");

            let fakeResponse = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><Services xmlns=\"http://schema.broadsoft.com/xsi\"><service><name>ServiceWithNoUri</name><uri>FakeUri</uri></service></Services>";

            // Convert the response into xml object.
            let response = xmljs.xml2js(fakeResponse);

            // Set uri to be null value
            response.elements[0].elements[0].elements[1].elements[0].text = null;

            return Promise.resolve(response);
        });

        let wrapper = shallow(<ProfileSettings onEdit={() => {return true}}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        wrapper.update();

        expect(broadsoftNoUri.calledOnce).toEqual(true);
        expect(wrapper.children()).toHaveLength(0);
    })

    afterAll(() => {
       BroadSoft.sendRequest.restore();
       Auth.sessionSetup.restore();
    });

});