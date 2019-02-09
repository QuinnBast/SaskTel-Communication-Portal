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
import { Button, Container } from "reactstrap";

const rtcConfig = config.rtcConfig;

const stickyBottom = {
  position: "absolute",
  left: 0,
  bottom:0,
  right:0
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
        let eventHandlers = {
            'progress': function(e) {
                console.log('call is in progress');
            },
            'failed': function(e) {
                console.log('call failed with cause: '+ e.cause);
                this.setState({status: "available"});
            },
            'ended': function(e) {
                console.log('call ended with cause: '+ e.cause);
                this.setState({status: "available"});
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
                <div style={{paddingBottom: "50px", background: "rgb(33, 37, 41)"}}>
                    <Container>
                        <Button color={"primary"} onClick={this.makeCall}>Make Call </Button>
                        <Button color={"danger"} onClick={this.endCall}>End Call </Button>
                        <audio id={"callStream"}></audio>
                    </Container>
                </div>
            </div>
        );
    }

}