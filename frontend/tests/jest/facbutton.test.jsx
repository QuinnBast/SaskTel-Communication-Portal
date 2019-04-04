import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import FeatureAccessCodesButton from '../../js/comps/FeatureAccessCodesButton';

describe("FACButton", () => {

    it('loads', () => {
        let wrapper = shallow(<FeatureAccessCodesButton/>);
    });
});