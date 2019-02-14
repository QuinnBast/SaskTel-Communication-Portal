/**
 *  React Imports
 */
import React from "react";

/**
 * SIP imports
 */
import JsSIP from "jssip";
import config from "../config/config";
import Auth from "../router/Auth"

/**
 * Style imports
 */
import { Button, Container, Navbar } from "reactstrap";

const rtcConfig = config.rtcConfig;

const stickyBottom = {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%" ,
    textAlign: "center",
    height: "60px",
    background: "rgb(33, 37, 41)",
};

export default class Sip extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            status: "available",
        };

        JsSIP.debug.enable('JsSIP:*');

        super(props);
        let username = "+1" + Auth.username.replace(/[()-]/g, '');

        var socket = new JsSIP.WebSocketInterface(rtcConfig.websocketsServer); // Connect to the websocket server to make connection
        socket.via_transport = "tcp";
        var configuration = {
            sockets  : [ socket ],
            uri      : username + '@' + rtcConfig.domain,
            password : rtcConfig.password,
            authorization_user: username + "@" + rtcConfig.authorization_user_uri,
            session_timers_refresh_method: 'invite'
        };

        this.telportPhone = new JsSIP.UA(configuration);
        this.telportPhone.start();

        this.telportPhone.on('newRTCSession', ({ originator, session: rtcSession, request: rtcRequest }) => {
            this.session = rtcSession;
            // Determine the call direction
            if(originator === "local"){
                // outgoing call.
            }

            // Check if user is currently busy. If they are, return a 486 "Busy here" response.


            // When the call is accepted,
            rtcSession.on('accepted', (event) => {
                this.setState({status: "inCall"});
            });

            rtcSession.connection.addEventListener('addstream', (event) => {
                // Load and play the remote stream.
                $("#callStream").get(0).srcObject = event.stream;
                $("#callStream").get(0).play();
            })
        });
    }

    makeCall = () => {
        // Register callbacks to desired call events
        let phone = this;
        let eventHandlers = {
            'connecting': function(e) {
                console.log('call is connecting');
            },
            'peerconnection': function(e) {
                console.log('call is setting up peerconnection');
            },
            'sending': function(e) {
                console.log('call is sending an invite');
            },
            'progress': function(e) {
                console.log('call is in progress');
            },
            'accepted': function(e) {
                console.log('call is accepted');
            },
            'confirmed': function(e) {
                console.log('call is confirmed');
            },
            'ended': function(e) {
                console.log('call has ended with: ' + e.cause);
                phone.setState({status: "available"});
            },
            'failed': function(e) {
                console.log('call has failed with: ' + e.cause);
                phone.setState({status: "available"});
            },
            'newDMTF': function(e) {
                console.log('call setting up newDMTF');
            },
            'newInfo': function(e) {
                console.log('call setting up newInfo');
            },
            'hold': function(e) {
                console.log('call is on hold');
            },
            'unhold': function(e) {
                console.log('call is off hold');
            },
            'muted': function(e) {
                console.log('call is muted');
            },
            'unmuted': function(e) {
                console.log('call is unmuted');
            },
            'reinvite': function(e) {
                console.log('call is reinviting');
            },
            'update': function(e) {
                console.log('call is updating');
            },
            'refer': function(e) {
                console.log('call is referring');
            },
            'replaces': function(e) {
                console.log('call is replacing');
            },
            'sdp': function(e) {
                console.log('call is configuring sdp');
            },
            'icecandidate': function(e) {
                console.log('call is checking ice candidates');
            },
            'getusermediafailed': function(e) {
                console.log('getusermediafailed with: ' + e.cause);
            },
            'peerconnection:createofferfailed': function(e) {
                console.log('peerconnection:createofferfailed with: ' + e.cause);
            },
            'peerconnection:createanswerfailed': function(e) {
                console.log('peerconnection:createanswerfailed with: ' + e.cause);
            },
            'peerconnection:setlocaldescriptionfailed': function(e) {
                console.log('peerconnection:setlocaldescriptionfailed with: ' + e.cause);
            },
            'peerconnection:setremotedescriptionfailed': function(e) {
                console.log('peerconnection:setremotedescriptionfailed with: ' + e.cause);
            },
        };

        let mediaConstraints = {
            audio: true,
            video: false
        };

        // Ask the user to access their microphone for the call.
        navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {

            let options = {
                'eventHandlers'    : eventHandlers,
                'mediaConstraints' : mediaConstraints,
                'mediaStream': stream,
                'pcConfig': {
                    'iceServers': [
                        { 'urls': [rtcConfig.stunServer] },
                    ]
                },
            };

            // Stream is the user's input from the microphone. We want to send this stream to the RTCConnection.
            this.telportPhone.call("+13065395729", options);
            this.setState({status: "calling"});
        });
    };

    endCall = () => {
        this.telportPhone.terminateSessions();
        this.setState({status: "available"});
    };

    render() {
        return(
            <div style={stickyBottom}>
                <Container>
                    <Button color={"primary"} onClick={this.makeCall}>Make Call </Button>
                    <Button color={"danger"} onClick={this.endCall}>End Call </Button>
                    <audio id={"callStream"} autoPlay={true}/>
                </Container>
            </div>
        );
    }
}