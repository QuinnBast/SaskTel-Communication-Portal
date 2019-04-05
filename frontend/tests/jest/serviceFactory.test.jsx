import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import ServiceFactory from '../../js/comps/ServiceFactory';


describe("ServiceFactory", () => {

    it('builds all cases', () => {
        ServiceFactory.build("Call Forwarding Always", "fakeuri", function(){});
        ServiceFactory.build("Call Forwarding Busy", "fakeuri", function(){});
        ServiceFactory.build("Call Forwarding No Answer", "fakeuri", function(){});
        ServiceFactory.build("Do Not Disturb", "fakeuri", function(){});
        ServiceFactory.build("Call Forwarding Selective", "fakeuri", function(){});
        ServiceFactory.build("Speed Dial 8", "fakeuri", function(){});
        ServiceFactory.build("Third-Party Voice Mail Support", "fakeuri", function(){});
        ServiceFactory.build("Call Waiting", "fakeuri", function(){});
        ServiceFactory.build("Call Forwarding Not Reachable", "fakeuri", function(){});
        ServiceFactory.build("Calling Name Delivery", "fakeuri", function(){});
        ServiceFactory.build("Calling Number Delivery", "fakeuri", function(){});
        ServiceFactory.build("Integrated IMP", "fakeuri", function(){});
        ServiceFactory.build("NonExistantService", "fakeuri", function(){});
    });
});