import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import XmlEditable from '../../js/comps/XmlEditable';
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

let name = "Some Editable Property";
let tooltip = "Fake tooltip";

describe("XmlEditable", () => {

    it('creates a boolean', () => {
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"bool"} XmlLocation={['active']} parent={xmljs.xml2js("<active>false</active>")}/>);
    });

    it('creates a phone input', () => {
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"phone"} XmlLocation={['phone']} parent={xmljs.xml2js("<phone>7777777777</phone>")}/>);
    })

    it('creates a range', () => {
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"range"} XmlLocation={['range']} parent={xmljs.xml2js("<range>5</range>")} range={[2, 20]}/>);
    })

    it('creates a number', () => {
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"number"} XmlLocation={['number']} parent={xmljs.xml2js("<number>5</number>")}/>);
    });

    it('creates a string', () => {
        let wrapper = shallow(<XmlEditable name={name} tooltip={tooltip} type={"string"} XmlLocation={['string']} parent={xmljs.xml2js("<string>hello</string>")}/>);
    });

});