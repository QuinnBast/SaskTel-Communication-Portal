import React from 'react';
import { expect }  from 'chai';
import { mount, shallow } from 'enzyme';
import Login from '../../js/routes/Login';
import {describe, it} from 'mocha';

describe('<Login />', () => {
  describe('<Login>', function () {
  it('should have a username input for the phone number', function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#username')).to.have.length(1);
  });

  it('should have a password input for the password', function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#password')).to.have.length(1);
  });

    it('should have a LoginButton', function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#LoginButton')).to.have.length(1);
  });


  it('should have a button to log in', function () {
    const wrapper = mount(<Login />);
    expect(wrapper.find('button')).to.have.length(1);
  });
});
});