import React from 'react';
import { mount, shallow } from 'enzyme';
import NavBar from "../../js/comps/NavBar";

describe("NavBar", () => {

    it('loads', () => {
        let wrapper = shallow(<NavBar/>);
    });

        it('toggles', () => {
        let wrapper = shallow(<NavBar/>);
        wrapper.instance().toggle();
    });
});