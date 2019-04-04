import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import BroadSoft from '../../js/broadsoft/BroadSoft';
import CarouselManager from "../../js/comps/CarouselManager";
require('babel-polyfill');
let xmljs = require('xml-js');

describe("Carousel", () => {

    it('loads', () => {
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve()
        });
        let wrapper = shallow(<CarouselManager/>);
        sinon.restore();
    });

     it('a second page', () => {
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve()
        });
        let wrapper = shallow(<CarouselManager/>);
        wrapper.instance().setState({currentPage: 1});
        sinon.restore();
    });


          it('the next page', () => {
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve()
        });
        let wrapper = shallow(<CarouselManager/>);
        wrapper.instance().next(1,2,3);
        sinon.restore();
    });
                    it('the previous page', () => {
        let broadsoft = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){
            return Promise.resolve()
        });

        let toggle = {loadAsync : jest.fn(() => {})};


        let wrapper = shallow(<CarouselManager/>);
        wrapper.instance().next(1,2,toggle);
        wrapper.instance().prev();
        sinon.restore();
    });



});