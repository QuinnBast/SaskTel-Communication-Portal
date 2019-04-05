import React from 'react';
import { mount, shallow } from 'enzyme';
import AudioController from '../../js/comps/AudioController';

jest.autoMock(true);

describe("App", () => {

    it('loads', () => {
        let wrapper = shallow(<AudioController/>);
    });
});