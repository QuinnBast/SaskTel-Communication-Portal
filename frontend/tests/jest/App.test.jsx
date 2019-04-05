import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../../js/App';
import history from "../../js/router/history";
jest.mock('../../js/comps/AudioController', () => () => 'SomeComponent');
jest.mock('../../css/main.css', () => () => 'SomeComponent');
jest.mock('bootstrap/dist/css/bootstrap.min.css', () => () => 'SomeComponent');
jest.mock('react-dom', () => ({
     render: jest.fn(),
}));

describe("App", () => {

    it('loads', () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='content'/>";

        let wrapper = shallow(<App/>);
    });

    it('loads invalid pages with 404', () => {


        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='content'/>";

        let wrapper = shallow(<App/>);
        history.push("/somefakeurl");
    })
});