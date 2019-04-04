import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import BroadSoft from '../../js/broadsoft/BroadSoft';
import FeatureAccessCodes from "../../js/comps/FeatureAccessCodes";
require('babel-polyfill');
let xmljs = require('xml-js');

describe("FeatureAccessCodes", () => {

    it('loads', () => {
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            let response = xmljs.xml2js("<FAC><code>123</code><codeName>name</codeName></FAC>");
            return Promise.resolve(response)
        });
        let wrapper = shallow(<FeatureAccessCodes/>);
        let async = sinon.stub(wrapper.instance(), "loadAsync").callsFake(function(){});
        sinon.restore();
    });
});