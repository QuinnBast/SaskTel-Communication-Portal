import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import XmlEditable from '../../js/comps/XmlEditable';
import Auth from '../../js/router/Auth';
import BroadSoft from '../../js/broadsoft/BroadSoft';
require('babel-polyfill');
let xmljs = require('xml-js');
import ReactTestUtils from 'react-dom/test-utils'; // ES6

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

let name = "Some Editable Property";
let tooltip = "Fake tooltip";

global.sendMessage = function(){};

describe("XmlEditable", () => {

    it('creates a boolean', () => {
        let fakeGetValue = sinon.fake(function(){
            return true;
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"bool"} XmlLocation={['active']} getValue={fakeGetValue}/>);
        sinon.restore();
    });

    it('creates a phone input', () => {
        let fakeGetValue = sinon.fake(function(){
            return 3333333333;
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"phone"} XmlLocation={['phone']} getValue={fakeGetValue} hideTitle/>);
        sinon.restore();
    });

    it('creates a range', () => {
        let fakeGetValue = sinon.fake(function(){
            return 4;
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"range"} XmlLocation={['range']} range={[2, 20]} getValue={fakeGetValue} locked/>);
        sinon.restore();
    })

    it('creates a number', () => {
        let fakeGetValue = sinon.fake(function(){
            return 4;
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"number"} XmlLocation={['number']} getValue={fakeGetValue}/>);
        sinon.restore();
    });

    it('creates a string', () => {
        let fakeGetValue = sinon.fake(function(){
            return "String";
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"string"} XmlLocation={['string']} getValue={fakeGetValue}/>);
        sinon.restore();
    });

    it('can edit a boolean', async () => {
        let fakeGetValue = sinon.fake(function(){
            return true;
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve(false);
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"bool"} XmlLocation={['service', 'active']} getValue={fakeGetValue}/>);
        expect(wrapper.instance().state.value).toEqual(true);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        wrapper.instance().inputChange(false)
        sinon.restore();
        broadsoft.restore();
        wrapper.instance().validate();

        expect(wrapper.instance().state.value).toEqual(false);
    })

    it('can edit a phone', async () => {

        let fakeGetValue = sinon.fake(function(){
            return 3333333333;
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve(false);
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"phone"} XmlLocation={['service', 'phone']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().inputChange({"target": {"value": "1111111111"}});
        sinon.restore();
        broadsoft.restore();
        wrapper.instance().validate();

        expect(wrapper.instance().state.value).toEqual("1111111111");
    })

    it('can edit a number', async () => {
        let fakeGetValue = sinon.fake(function(){
            return 5;
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve(5);
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"number"} XmlLocation={['service', 'number']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().inputChange({"target": {"value": "5"}});
        sinon.restore();
        broadsoft.restore();
        wrapper.instance().validate();

        expect(wrapper.instance().state.value).toEqual("5");
    })

    it('can edit a range', async () => {

        let fakeGetValue = sinon.fake(function(){
            return 5;
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve(5);
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"range"} range={[1, 20]} XmlLocation={['service', 'number']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().inputChange({"target": {"value": "5"}});
        sinon.restore();
        broadsoft.restore();
        wrapper.instance().validate();

        expect(wrapper.instance().state.value).toEqual("5");
    })

    it('can edit a string', async () => {

        let fakeGetValue = sinon.fake(function(){
            return "T";
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve("T");
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"string"} XmlLocation={['service', 'value']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().inputChange({"target": {"value": "Test"}});
        sinon.restore();
        broadsoft.restore();
        wrapper.instance().validate();

        expect(wrapper.instance().state.value).toEqual("Test");
    })

    it('updates on range slide', async () => {

        let fakeGetValue = sinon.fake(function(){
            return 5;
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve(5);
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"range"} range={[1, 20]} XmlLocation={['service', 'number']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().onRangeSlide({"target": {"value": "6"}});
        sinon.restore();
        broadsoft.restore();
        wrapper.instance().validate();

        expect(wrapper.instance().state.value).toEqual("6");
    })

    it('shows a tooltip', async () => {


        let fakeGetValue = sinon.fake(function(){
            return 5;
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"range"} range={[1, 20]} XmlLocation={['service', 'number']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().togglePopover();
        wrapper.instance().toggleStatusPopover();
        sinon.restore();
    })

    it('sends error messages when problems', async () => {


        let fakeGetValue = sinon.fake(function(){
            return "T";
        });
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.reject("T");
        })
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"string"} XmlLocation={['service', 'value']} getValue={fakeGetValue}/>);

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.instance().inputChange({"target": {"value": "Test"}});
        sinon.restore();
        broadsoft.restore();
    })
});