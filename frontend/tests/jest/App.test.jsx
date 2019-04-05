import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../../js/App';
jest.mock('../../js/comps/AudioController', () => () => 'SomeComponent');
jest.mock('../../css/main.css', () => () => 'SomeComponent');
jest.mock('bootstrap/dist/css/bootstrap.min.css', () => () => 'SomeComponent');

describe("App", () => {

    it('loads', () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='content'/>";

        let wrapper = shallow(<App/>);
    });
});