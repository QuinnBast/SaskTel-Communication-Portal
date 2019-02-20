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
import {Button, Input, Row, Col, Container} from "reactstrap";
import MaskedInput from "react-text-mask";

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
            targetPhoneNumber : "",
            buttonText: "Call",
            length: 0,
        };
    }

    componentDidMount() {

        JsSIP.debug.enable('JsSIP:*');
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
            if(this.state.targetPhoneNumber.length  === 10) {
                this.telportPhone.call("+1" + this.state.targetPhoneNumber, options);
                this.setState({status: "calling"});
            }
            else {
                console.log("Invalid Phone Number");
            }
        });
    };

    endCall = () => {
        this.telportPhone.terminateSessions();
        this.setState({status: "available"});
    };

    /**
     * When the phone number changes, update the value of the phone number in the component
     * @param phoneNumberInput
     */
    handlePhoneNumberChange = phoneNumberInput => {
        this.setState({targetPhoneNumber: phoneNumberInput.target.value.replace(/[()_-]/g,''),
            length: phoneNumberInput.target.value.replace(/[()_-]/g,'').length})
    };

    /**
     * Conditions for a valid phone number:
     * 1. 10 digits long without country code
     * 2. 11 digits long with country code
     * 3. consists of only digits
     * @returns {boolean}
     */
    isValidPhoneNumber = () => {
        return this.state.targetPhoneNumber.length === 10;
    };

    /**
     * 1. check if the phone number is valid
     * 2. Check the state of the call
     * @returns {boolean}
     */
    isButtonDisabled = () => {
        return !this.isValidPhoneNumber();
    };

    /**
     * If the call state is anything but available, lock the input
     * @returns {boolean}
     */
    isTargetPhoneNumberInputDisabled = () =>{
        return this.state.status !== "available";
    };

    /**
     *  binary call button to handle all call states
     */
    clickCallButton = () => {
        if(this.state.buttonText === "Call")
        {
            this.setState({buttonText: "End"});
            this.makeCall();
        }
        else
        {   this.setState({buttonText: "Call"});
            this.endCall();

        }
    };

    render() {
        return(
            <div
                style={stickyBottom}
                id={"callFooter"}
            >
                <Container>
                    <Row>
                        <Col
                            xs="5"
                        >
                            <MaskedInput
                                mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="(___)-___-____"
                                id="targetPhoneNumber"
                                guide = {true}
                                autoComplete="off"
                                onChange={this.handlePhoneNumberChange}
                                render={(ref, props) => (
                                    <Input innerRef={ref} {...props} />
                                )}
                            />
                        </Col>
                        <Col
                            xs="2"
                        />
                        <Col
                            xs="5"
                        >
                            <Button
                                block={true}
                                id={"CallButton"}
                                outline = {true}
                                color={"info"}
                                onClick={this.clickCallButton} // on click, call this function
                                // disabled = return value
                                disabled={this.isButtonDisabled()}
                            >
                                {this.state.buttonText}
                            </Button>
                            <audio
                                id={"callStream"}
                                autoPlay={true}
                            />

                        </Col>
                        <Col
                            xs="2"
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}