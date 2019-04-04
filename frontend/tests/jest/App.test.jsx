import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../../js/App';

describe("App", () => {

    it('loads', () => {
        let wrapper = shallow(<App/>);
    });
});