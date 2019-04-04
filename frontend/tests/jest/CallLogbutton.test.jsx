import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import CallLogs from '../../js/comps/CallLogs';
import BroadSoft from '../../js/broadsoft/BroadSoft';
require('babel-polyfill');
let xmljs = require('xml-js');

describe("CallLogButton", () => {

    it('loads', () => {
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            let response = xmljs.xml2js("<CallLogs><missed></missed></CallLogs>")
            return Promise.resolve(response)
        })
        let wrapper = shallow(<CallLogs/>);
        let async = sinon.stub(wrapper.instance(), "loadAsync").callsFake(function(){});
        sinon.restore();
    });
});