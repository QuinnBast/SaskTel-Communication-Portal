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
            return Promise.resolve( xmljs.xml2js("<active>false</active>"));
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
            return Promise.resolve(xmljs.xml2js("<active>false</active>"));
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
            return Promise.resolve(xmljs.xml2js("<active>false</active>"));
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        expect(wrapper.debug()).toMatch("<XmlEditable");
        broadsoftStub.restore();
    });

       it('clicking the edit button triggers the carousel', async() => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.resolve(xmljs.xml2js("<active>false</active>"));
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);

        let serviceSendRequest = sinon.stub(wrapper.instance(), "loadAsync").callsFake(function(){
            return Promise.resolve();
        });

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(wrapper.instance().state.active).toEqual(false);

        // Expect the edit button to exist on the page
        expect(wrapper.find("#" + wrapper.instance().props.name.replace(/\s+/g, '') + "Edit")).toHaveLength(1);

        wrapper.find("#" + wrapper.instance().props.name.replace(/\s+/g, '') + "Edit").simulate('click');

        // Toggle the button
        //wrapper.instance().toggle(true);
        wrapper.update();

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Expect the onEdit function to be called
        expect(onEdit.calledOnce).toEqual(true);

        broadsoftStub.restore();
        serviceSendRequest.restore();
        onEdit.reset();
    });

    it('hovering a tooltip shows the tooltip', async () => {


        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.resolve(xmljs.xml2js("<active>true</active>"));
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);


        let servicePopupToggle = sinon.spy(wrapper.instance(), "togglePopover");

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
        expect(wrapper.instance().getValue(["active"])).toEqual("true");

        wrapper.instance().togglePopover();

        expect(servicePopupToggle.calledOnce).toEqual(true);
        expect(wrapper.instance().state.popover).toEqual(true);

        servicePopupToggle.restore();
        broadsoftStub.restore();
    });

    it('doesnt load if errored async', async () => {

        global.sendMessage = function(){};

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(args){
            expect(args['endpoint'] === uri);
            return Promise.reject( xmljs.xml2js("<error>false</error>"));
        });

        let wrapper = shallow(<Service name={serviceName} uri={uri} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);


        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        broadsoftStub.restore();
    })

    it('service with no uri shows not configured', async () => {

        global.sendMessage = function(){};

        let wrapper = shallow(<Service name={serviceName} uri={""} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);


        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
    })

    it('edits on failed load sends a message', async () => {

        global.sendMessage = function(){};

        let wrapper = shallow(<Service name={serviceName} uri={""} onEdit={onEdit} tooltip={tooltip} hasEdit hasToggle activePath={['active']}/>);
        let failedLoad = sinon.stub(wrapper.instance(), "loadAsync").callsFake(function(){
            return Promise.reject("Oh No");
        })

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();

        wrapper.instance().edit();
    })

});