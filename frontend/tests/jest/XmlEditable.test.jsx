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
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"phone"} XmlLocation={['phone']} getValue={fakeGetValue}/>);
        sinon.restore();
    });

    it('creates a range', () => {
        let fakeGetValue = sinon.fake(function(){
            return 4;
        });
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"range"} XmlLocation={['range']} range={[2, 20]} getValue={fakeGetValue}/>);
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

        wrapper.find("#" + wrapper.instance().props.name.replace(/\s+/g, '') + "Switch").simulate('change', true);
        sinon.restore();

        expect(wrapper.instance().state.value).toEqual(true);
    })
});