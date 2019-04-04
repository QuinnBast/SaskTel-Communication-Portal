import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from '../../js/routes/Login';


describe('<Login />', () => {
  test('should have a username input for the phone number', function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#username').length).toBe(1);
  });

  test('should have a password input for the password', function () {
    const wrapper = shallow(<Login />);
expect(wrapper.find('#password').length).toBe(1);  });

    test('should have a LoginButton', function () {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#LoginButton').length).toBe(1);
  });


  test('should have a button to log in', function () {
    const wrapper = mount(<Login />);
    expect(wrapper.find('button').length).toBe(1);
  });
});