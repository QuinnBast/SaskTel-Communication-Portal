import React from 'react';
import sinon from 'sinon';
import Auth from '../../js/router/Auth';
import BroadSoft from '../../js/broadsoft/BroadSoft';
require('babel-polyfill');
let xmljs = require('xml-js');

describe("Auth session not stubbed", () => {
        it('Attempts to setup a session', async () => {

            // Create broadsoft stub to prevent server calls
            let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function () {
                return Promise.resolve();
            });

            Auth.sessionSetup();

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
            broadsoftStub.restore();
        });
    });

describe("Auth", () => {

beforeAll(() => {
    // Setup the session
let authSetupStub = sinon.stub(Auth, "sessionSetup").callsFake(function() {
    this.authenticated = true;
    this.username = "(111)111-1111";
    this.password = "fakepassword";
});

// setup the auth component
Auth.sessionSetup();

let serviceName = "FakeName";
let uri = "fakeUri";
let onEdit = sinon.stub();
let tooltip = "fakeTooltip";

});

    it('Attempts to setup a session', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        Auth.sessionSetup();

        broadsoftStub.restore();
    });

    it('Attempts to refresh an undefined session', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        sessionStorage.removeItem("refreshToken");
        Auth.refreshToken = undefined;
        Auth.attemptRefresh();

        broadsoftStub.restore();
    });

        it('Attempts to refresh a session', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        Auth.attemptRefresh();

        broadsoftStub.restore();
    });

    it('Checks if a session exists', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        Auth.doesSessionExist();

        broadsoftStub.restore();
    });

    it('checks if user is authenticated', () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        Auth.isAuthenticated();

        broadsoftStub.restore();
    });

    it("handles a username change", () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        Auth.handleUsernameChange({target: {value: "1234567890"}});

        broadsoftStub.restore();
    });


    it("handles a password change", () => {

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});

        Auth.handlePasswordChange({target: {value: "1234567890"}});

        broadsoftStub.restore();
    });


    it("handles a login", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='alert'></div>";
        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});

        Auth.login(new Event("submit"));
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

        it("handles a rejected login due to server connection", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='alert'></div>";
        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.reject({status: 599});});

        Auth.login(new Event("submit"));
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

it("handles a rejected login", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='alert'></div>";
        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.reject({status: 404});});

        Auth.login(new Event("submit"));
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

    it("handles a login with bad username", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='username'/><div id='usernameAlert'/>";

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});
        Auth.username = "";
        Auth.login(new Event("submit"));
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

    it("handles a login with bad password", async () => {
        Auth.logout();
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

    });
    it("handles a login with bad password", async () => {


        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='password'/><div id='passwordAlert'/>";
        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});
        Auth.username = "1234567890";
        Auth.password = "";
        Auth.login(new Event("submit"));

        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));
        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

    it("handles usernameBlur with invalid username", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='username'/><div id='usernameAlert'/>";

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});
       Auth.handleUsernameBlur({target:{value: "12345" }});
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

        it("handles usernameBlur with valid username", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='username'/><div id='usernameAlert'/>";

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});
       Auth.handleUsernameBlur({target:{value: "1234567890" }});
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });


            it("handles passwordBlur with invalid password", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='password'/><div id='passwordAlert'/>";

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});
       Auth.handlePasswordBlur({target:{value: "" }});
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });

        it("handles PasswordBlur with valid Password", async () => {

        document.body = document.createElement("body");
        document.body.innerHTML = "<div id='password'/><div id='passwordAlert'/>";

        // Create broadsoft stub to prevent server calls
        let broadsoftStub = sinon.stub(BroadSoft, "sendRequest").callsFake(function(){return Promise.resolve();});
        let broadsoftStub2 = sinon.stub(BroadSoft, "login").callsFake(function(){return Promise.resolve();});
       Auth.handlePasswordBlur({target:{value: "1234567890" }});
        // Block test until event loop has processed any queued work (including our data retrieval)
        await new Promise((resolve) => setTimeout(resolve, 0));

        broadsoftStub.restore();
        broadsoftStub2.restore();
    });



});