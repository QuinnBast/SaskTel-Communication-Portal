import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Service from '../../js/comps/Service';
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

let serviceName = "FakeName";
let uri = "fakeUri";
let onEdit = sinon.stub();
let tooltip = "fakeTooltip";


describe("Service", () => {

    it('shows loading while waiting for a response', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip}/>);
        expect(wrapper.debug()).toMatch("Loading");
        broadsoftStub.restore();
    });

    it('sends a request', async () => {
        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.resolve("<fakeXml></fakeXml>fakeXml>");
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);


        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        expect(broadsoftStub.calledOnce).toEqual(true);
        broadsoftStub.restore();
    });

    it('hasEdit shows an edit button', async () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.resolve("<fakeXml></fakeXml>");
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        expect(wrapper.find("#" + wrapper.instance().props.name.replace(/\s+/g, '') + "Edit")).toHaveLength(1);
        broadsoftStub.restore();
    })

    it('hasToggle shows a toggle button', async() => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.resolve("<fakeXml></fakeXml>");
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        expect(wrapper.find("#" + wrapper.instance().props.name.replace(/\s+/g, '') + "Toggle")).toHaveLength(1);
        broadsoftStub.restore();
    })

       it('clicking the toggle changes the state', async() => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.resolve("<active>false</active>");
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        expect(wrapper.find("#" + wrapper.instance().props.name.replace(/\s+/g, '') + "Toggle")).toHaveLength(1);
        broadsoftStub.restore();
    })


});