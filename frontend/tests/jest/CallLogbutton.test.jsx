import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import CallLogs from '../../js/comps/CallLogs';
import BroadSoft from '../../js/broadsoft/BroadSoft';
require('babel-polyfill');
let xmljs = require('xml-js');

describe("CallLogButton", () => {

    it('loads', () => {
        let phoneEntry = "<CallLogEntry><phoneNumber>1111111111</phoneNumber><time>7:00pm</time></CallLogEntry>";
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            let response = xmljs.xml2js("<CallLogs><missed>"+phoneEntry+"</missed><placed>"+phoneEntry+"</placed><received>"+phoneEntry+"</received></CallLogs>")
            return Promise.resolve(response)
        });
        let wrapper = shallow(<CallLogs/>);
        let async = sinon.stub(wrapper.instance(), "loadAsync").callsFake(function(){});
        sinon.restore();
    });

    it('can sort', () => {
        let phoneEntry = "<CallLogEntry><phoneNumber>1111111111</phoneNumber><time>7:00pm</time></CallLogEntry>";
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            let response = xmljs.xml2js("<CallLogs><missed>"+phoneEntry+"</missed><placed>"+phoneEntry+"</placed><received>"+phoneEntry+"</received></CallLogs>")
            return Promise.resolve(response)
        });
        let wrapper = shallow(<CallLogs/>);
        let async = sinon.stub(wrapper.instance(), "loadAsync").callsFake(function(){});
        wrapper.instance().handleSort('type');
        wrapper.instance().handleSort('type');
        wrapper.instance().handleSort('phoneNumber');
        wrapper.instance().handleSort('phoneNumber');
        wrapper.instance().handleSort('time');
        wrapper.instance().handleSort('time');
        sinon.restore();
    })
});