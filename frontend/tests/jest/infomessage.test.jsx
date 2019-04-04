import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import InfoMessage from '../../js/comps/InfoMessage';
require('babel-polyfill');
let xmljs = require('xml-js');


describe("InfoMessage", () => {

    it('shows nothing by default', () => {
        let wrapper = shallow(<InfoMessage/>);
        expect(wrapper.debug()).toEqual("");
    });

    it('sendMessage displays a message', () => {
        let wrapper = shallow(<InfoMessage/>);
        expect(wrapper.debug()).toEqual("");
        let message = "This is a message!";
        let options = {
            timeout: 100,
            color: "primary"
        };
        wrapper.instance().sendMessage(message, options)
        expect(wrapper.find("#MessageCenterMessage").debug()).toMatch(message);
    });

    it('close() closes the message', () => {
        let wrapper = shallow(<InfoMessage/>);
        expect(wrapper.debug()).toEqual("");
        let message = "This is a message!";
        let options = {
            timeout: 100,
            color: "primary"
        };
        wrapper.instance().sendMessage(message, options)
        expect(wrapper.find("#MessageCenterMessage").debug()).toMatch(message);
        wrapper.instance().close();
        expect(wrapper.debug()).toEqual("");

    });

    it('handles timeouts', () => {
        let wrapper = shallow(<InfoMessage/>);
        expect(wrapper.debug()).toEqual("");
        let message = "This is a message!";
        let options = {
            timeout: 5000,
            color: "primary"
        };
        wrapper.instance().sendMessage(message, options);
        wrapper.instance().sendMessage(message, options);
        expect(wrapper.find("#MessageCenterMessage").debug()).toMatch(message);
        wrapper.instance().close();
        expect(wrapper.debug()).toEqual("");

    })

});