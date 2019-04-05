import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import XmlEditable from '../../js/comps/XmlEditable';
import { getTag, setTag, generateKeyValueXml, generateXml } from '../../js/broadsoft/xmlParse';
require('babel-polyfill');
let xmljs = require('xml-js');

describe("XmlEditable", () => {

    it('getTag', () => {
        let xml = xmljs.xml2js("<tag>value</tag>");
        expect(getTag(xml, ["tag"])).toEqual("value");
    });

    it('setTag', () => {
        let xml = xmljs.xml2js("<tag>value</tag>");
        setTag(xml, ["tag"], "newValue");
        expect(getTag(xml, ["tag"])).toEqual("newValue");
    });

    it('generateKeyValueXml', () =>{
        let xml = generateKeyValueXml("root", "entry", "key", 1, "value", 1);
        let check = xmljs.xml2js("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><root xmlns=\"http://schema.broadsoft.com/xsi\"><entry><key>1</key><value>1</value></entry></root>");
        expect(xml).toEqual(check);
    })

    it('generateXml', ()=>{
        let xml = generateXml(["root", "value"], "value");
        let check = xmljs.xml2js("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><root xmlns=\"http://schema.broadsoft.com/xsi\"><value>value</value></root>");
        expect(xml).toEqual(check);
    })

    it('setTag adds net elements', () => {
        let xml = xmljs.xml2js("<root><tag>value</tag></root>");
        setTag(xml, ["root", "newTag"], "newValue");
        expect(getTag(xml, ["root", "newTag"])).toEqual("newValue");
    })
});