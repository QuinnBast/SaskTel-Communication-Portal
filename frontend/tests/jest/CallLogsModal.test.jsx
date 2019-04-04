import React from 'react';
import { mount, shallow } from 'enzyme';
import CallLogsModal from '../../js/comps/CallLogsModal';

describe("CallLogsModal", () => {

    it('loads', () => {
        let wrapper = shallow(<CallLogsModal/>);
        // open modal;
        wrapper.instance().showLogs();
        // close modal;
        wrapper.instance().showLogs();
    });
});