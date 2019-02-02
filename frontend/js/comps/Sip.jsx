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
import { Button } from "semantic-ui-react";

const rtcConfig = config.rtcConfig;

export default class Sip extends React.Component {

    constructor(props){

        JsSIP.debug.enable('JsSIP:*');

        super(props);
        let username = "+1" + Auth.username.replace('(', '').replace(')', '').replace('-', '').replace('-', '');

        var socket = new JsSIP.WebSocketInterface(rtcConfig.websocketsServer); // Connect to the websocket server to make connection
        var configuration = {
            sockets  : [ socket ],
            uri      : 'sip:' + username + '@' + rtcConfig.domain,
            password : rtcConfig.password,
            authorization_user: username + "@" + rtcConfig.authorization_user_uri,
        };

        this.telportPhone = new JsSIP.UA(configuration);
        this.telportPhone.start();

        this.telportPhone.on('newRTCSession', ({ originator, session: rtcSession, request: rtcRequest }) => {
            // Determine the call direction
            if(originator === "local"){
                // outgoing call.
            }

            // Check if user is currently busy. If they are, return a 486 "Busy here" response.


            // When the call is accepted,
            rtcSession.on('accepted', (event) => {
                $("#callStream").get(0).srcObject = rtcSession.connection.getRemoteStreams()[0];
                $("#callStream").get(0).play();
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
        let eventHandlers = {
            'progress': function(e) {
                console.log('call is in progress');
            },
            'failed': function(e) {
                console.log('call failed with cause: '+ e.cause);
            },
            'ended': function(e) {
                console.log('call ended with cause: '+ e.cause);
            },
            'confirmed': function(e) {
                console.log('call confirmed');
            }
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
                }
            };

            // Stream is the user's input from the microphone. We want to send this stream to the RTCConnection.
            this.telportPhone.call("+13065194771", options);
        });
    };

    streamSelf = () => {
         let mediaConstraints = {
            audio: true,
            video: false
        };

        // Ask the user to access their microphone for the call.
        navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
                $("#callStream").get(0).srcObject = stream;
                $("#callStream").get(0).play();
        });
    };

    render() {
        return(
            <div>
                <Button onClick={this.makeCall}>Make Call </Button>
                <Button onClick={this.endCall}>End Call </Button>
                <Button onClick={this.streamSelf}>Stream self</Button>
                <audio id={"callStream"}></audio>
            </div>
        );
    }

}