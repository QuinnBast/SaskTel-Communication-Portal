import React from 'react';
import { mount, shallow } from 'enzyme';
import Interface from '../../js/routes/Interface';
jest.mock('../../js/comps/AudioController', () => () => 'SomeComponent');

describe("App", () => {

    it('loads', () => {
        let wrapper = shallow(<Interface/>);
    });
});