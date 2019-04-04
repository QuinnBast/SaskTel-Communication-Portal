import React from 'react';
import { mount, shallow } from 'enzyme';
import Sip from "../../js/comps/Sip";
jest.mock('../../js/comps/AudioController', () => () => 'SomeComponent');


const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });



describe("SIP", () => {

    it('loads', () => {

        let wrapper = shallow(<Sip/>);
        wrapper.instance().endCall();
    });

    it('endsCall', () => {

        let wrapper = shallow(<Sip/>);
        wrapper.instance().endCall();
    });

        it('checks button status', () => {

        let wrapper = shallow(<Sip/>);
        wrapper.instance().isTargetPhoneNumberInputDisabled();
    });


    it('handlesPhoneNumberChange < 10', () => {

        let wrapper = shallow(<Sip/>);
        wrapper.instance().handlePhoneNumberChange({target : {value: "12345"}});
    });

    it('handlesPhoneNumberChange == 10', () => {

        let wrapper = shallow(<Sip/>);
        wrapper.instance().handlePhoneNumberChange({target : {value: "1234567890"}});
    });

    it('has valid phone number', () => {

        let wrapper = shallow(<Sip/>);
        wrapper.instance().handlePhoneNumberChange({target : {value: "1234567890"}});
        expect(wrapper.instance().isValidPhoneNumber()).toBe(true);
    });


    it('has invalid phone number', () => {
        let wrapper = shallow(<Sip/>);
        wrapper.instance().handlePhoneNumberChange({target : {value: "12345"}});
        expect(wrapper.instance().isValidPhoneNumber()).toBe(false);
    });


    it('renders incoming state', () => {
        let wrapper = shallow(<Sip/>);
        wrapper.instance().setState({status : "incoming"});
    });

    it('renders inCall state', () => {
        let wrapper = shallow(<Sip/>);
        wrapper.instance().setState({status : "inCall"});
    });

    it('renders inCall state muted', () => {
        let wrapper = shallow(<Sip/>);
        wrapper.instance().setState({isMuted : true, status : "inCall"});
    });

    it('renders inCall timer', () => {
        let wrapper = shallow(<Sip/>);
        wrapper.instance().setState({status : "inCall", session : true, callDuration: 6000});
    });

    it('toggles mute', () => {
        let wrapper = shallow(<Sip/>);
        wrapper.instance().setState({session : 1});
        wrapper.instance().toggleMute();
    });

});