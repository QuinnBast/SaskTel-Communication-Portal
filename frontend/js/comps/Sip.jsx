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
import AudioController from "../comps/AudioController"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const rtcConfig = config.rtcConfig;

let mediaConstraints = {
    audio: true,
    video: false
};

const stickyBottom = {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%" ,
    textAlign: "center",
    height: "80px",
    background: 'rgb(52, 58, 64)',
};

export default class Sip extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            status: "available",
            targetPhoneNumber : "",
            length: 0,
            isMuted: false,
            callDuration: null,
            session: null,
        };
    }


    componentDidMount() {

        /////////////////////////////////////
        /// debug call .enable/disable    ///
        /////////////////////////////////////

        JsSIP.debug.disable('JsSIP:*');

        /////////////////////////////////////
        /// Configuring JsSIP RTC Session ///
        /////////////////////////////////////

        // grab the username from the Auth component
        let username = "+1" + Auth.username.replace(/[()-]/g, '');
        // Connect to the websocket server to make connection
        let socket = new JsSIP.WebSocketInterface(rtcConfig.websocketsServer);
        // configure the UA
        socket.via_transport = "tcp";
        this.configuration = {
            sockets  : [ socket ],
            uri      : username + '@' + rtcConfig.domain,
            password : rtcConfig.password,
            authorization_user: username + "@" + rtcConfig.authorization_user_uri,
            session_timers_refresh_method: 'invite'
        };
        this.telportPhone = new JsSIP.UA(this.configuration);
        this.telportPhone.start();

        /////////////////////////////////////
        /// JsSIP RTC Session is started  ///
        /////////////////////////////////////

        /////////////////////////////////////
        /// On new Call Request           ///
        /////////////////////////////////////

        this.telportPhone.on('newRTCSession', (data) => {
            // log that a new session has began
            console.log("newRTCSession Attempted");

            // attempt to set up a new call
            //////////////////////////////////////////////////////////
            // decline if the recipient is busy.
            // can be changed to handle multiple calls in future
            console.log(this.state.status);
            if(data.session.direction === "incoming" && this.state.status !== "available"){
                console.log("new incoming call, but you're busy");
                data.session.terminate({
                    'status_code': 486,
                    'reason_phrase': 'Busy Here'
                });
                return;
            }
            //////////////////////////////////////
            // get a local copy of the session ///
            //////////////////////////////////////
            this.session = data.session;
            // report the call direction
            console.log(this.session.direction);

            /////////////////////////////////////
            /// Bidirectional Call Events     ///
            /////////////////////////////////////



            /////////////////////////////////////
            /// Outgoing Call Events          ///
            /////////////////////////////////////
            if(this.session.direction === "outgoing"){
                this.setState({status : "inCall"});
                let phone = this;
                let session = this.session;

                console.log(this.state.status);
                AudioController.play("tone_ringback", true);
                session.on("ended",(e) =>{
                    clearInterval(this.timer);
                    AudioController.stop("tone_ringback");
                    AudioController.play("tone_click", false);
                    console.log('call has ended with: ' + e.cause);
                    phone.endCall();
                });

                session.on("failed",(e) =>{
                    AudioController.stop("tone_ringback");
                    console.log('call has failed with: ' + e.cause);
                    phone.setState({status: "available"});
                });

                session.on('accepted', () => {
                    AudioController.stop("tone_ringback");
                    this.timer = setInterval(() => {
                        let duration = Date.now() - session.start_time;
                        phone.setState({callDuration: duration})
                    });
                    console.log('call is accepted');
                });

                session.connection.addEventListener('addstream', (event) =>{
                    let callStream = $("#callStream").get(0);
                    callStream.srcObject = event.stream;
                    callStream.play();
                });

                return;
                // outgoing call.
            }

            /////////////////////////////////////
            /// Incoming Call Events          ///
            /////////////////////////////////////
            if(this.session.direction === "incoming") {
                this.setState({status : "incoming"});
                // start ring tone
                AudioController.play('tone_ringtone', true);
                let phone = this;
                let session = this.session;
                session.on("ended",(e) =>{
                    clearInterval(this.timer);
                    AudioController.stop("tone_ringtone");
                    AudioController.play("tone_click", false);
                    console.log('call has ended with: ' + e.cause);
                    phone.endCall();
                });
                session.on("failed",(e) =>{
                    AudioController.stop("tone_ringtone");
                    console.log('call has failed with: ' + e.cause);
                    phone.setState({status: "available"});
                });

                session.on('accepted', () => {
                    AudioController.stop("tone_ringtone");
                    this.timer = setInterval(() => {
                        let duration = Date.now() - session.start_time;
                        phone.setState({callDuration: duration})
                    });
                    console.log('call is accepted');
                });
            }

        });

    }


    ///////////////////////////////////////
    /// toggles the call audio of or on ///
    ///////////////////////////////////////
    toggleMute = () => {
        if(this.session != null){
            if(this.session.isMuted()['audio']){
                this.session.unmute({audio: true});
                this.setState({isMuted: false})
            } else {
                this.session.mute({audio: true});
                this.setState({isMuted: true})
            }
        } else {
            this.setState({isMuted: false})
        }
    };


    /////////////////////////////////////
    /// Initiates an outgoing Call    ///
    /////////////////////////////////////
    handleCall = () => {
        // Ask the user to access their microphone for the call.
        navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
            let options = {
                'mediaConstraints' : mediaConstraints,
                'mediaStream': stream,
                'pcConfig': {
                    'iceServers': [
                        { 'urls': [rtcConfig.stunServer] }
                    ]
                },
            };
            if(this.state.status === "incoming") {
                console.log("incoming calll");
                this.session.answer(options);
                this.session.connection.addEventListener('addstream', (event) =>{
                    console.log("called");
                    let callStream = $("#callStream").get(0);
                    console.log(event.stream);
                    callStream.srcObject = event.stream;
                    callStream.play();
                });
                this.setState({status: "inCall"});
                console.log(this.state.status);
            }
            else {
                // Stream is the user's input from the microphone. We want to send this stream to the RTCConnection.
                if (this.state.targetPhoneNumber.length === 10) {
                    this.telportPhone.call("+1" + this.state.targetPhoneNumber, options);
                    this.setState({status: "inCall"})
                } else {
                    // should never reach this
                    console.log("Invalid Phone Number");
                }
            }
        });

    };

    endCall = () => {
        this.telportPhone.terminateSessions();
        this.setState({status: "available"});
        this.session = null;
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
    callStateChange = () => {
        if(this.state.status === "available") {
            this.handleCall();

        }
        else if (this.state.status === "incoming") {
            this.handleCall();
        }
        else {
            this.endCall();
            this.setState({status: "available"});
        }
    };

    render() {
        if(this.state.status === "available"){

            //////////////////////////////////////
            // Phone number input & Call button
            //////////////////////////////////////
            return (
                <div
                    style={stickyBottom}
                    id={"callFooter"}
                >
                    <Container style={{paddingTop: "15px"}}>
                        <Row>
                            <Col
                                xs="8"
                            >
                                <MaskedInput
                                    mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                                    placeholder="(___)-___-____"
                                    id="targetPhoneNumber"
                                    guide = {true}
                                    autoComplete="off"
                                    onChange={this.handlePhoneNumberChange}
                                    style={{color: "#17a2b8",
                                        backgroundColor: "rgb(33, 37, 41)",
                                        fontSize: "40px",
                                        border: "none",
                                        height: "50px"}}
                                    render={(ref, props) => (
                                        <Input innerRef={ref} {...props} />
                                    )}
                                />
                            </Col>
                            <Col
                                xs="4"
                            >
                                <Button
                                    block={true}
                                    id={"CallButton"}
                                    outline = {true}
                                    color={"info"}
                                    onClick={this.callStateChange} // on click, call this function
                                    disabled = {this.isButtonDisabled()}
                                    style={{width: "100%", height: "50px"}}
                                >
                                    <FontAwesomeIcon
                                        icon={"phone"}
                                        style={{color: "#17a2b8"}}
                                        inverse
                                        size={"lg"}
                                    />
                                    <b
                                        style={{fontSize: "20px"}}
                                    >
                                        &nbsp;&nbsp;Call
                                    </b>
                                </Button>
                                <audio
                                    id={"callStream"}
                                    autoPlay={true}
                                />

                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        } else if (this.state.status === "inCall"){


            //////////////////////////////////////
            // Call controls, status & End call
            //////////////////////////////////////

            let mic_state = <FontAwesomeIcon icon={"microphone"} style={{color: "#FFFFFF"}} size={"3x"}/>;
            if(this.state.isMuted){
                mic_state = <FontAwesomeIcon icon={"microphone-slash"} style={{color: "#FF0000"}} size={"3x"}/>;
            }

            let call_duration = "00:00";
            if(this.session != null) {
                let minutes = Math.floor(this.state.callDuration / 60000) % 60;
                let seconds = ((this.state.callDuration % 60000) / 1000).toFixed(0);
                let hours = Math.floor(this.state.callDuration / (60000*60));
                if(hours === 0) {
                    call_duration = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                } else {
                    call_duration = hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }
            }


            return(
                <div
                    style={stickyBottom}
                    id={"callFooter"}
                >
                    <Container style={{paddingTop: "15px"}}>
                        <Row>
                            <Col
                                xs="6"
                            >
                                <a onClick={this.toggleMute}>{mic_state}</a>
                            </Col>
                            <Col
                                xs="3"
                                style={{color: "#17a2b8"}}
                            >
                                <div> Duration: {call_duration} </div>
                                <div>{this.state.status}</div>
                            </Col>
                            <Col xs={"3"}>
                                <Button
                                    block={true}
                                    id={"CallButton"}
                                    outline = {true}
                                    color={"info"}
                                    onClick={this.callStateChange} // on click, call this function
                                    // disabled = return value
                                    style={{width: "100%", height: "50px"}}
                                >
                                    <FontAwesomeIcon icon={"phone"} style={{color: "#FF0000"}} inverse transform={{rotate: -140}} size={"lg"}/><b style={{fontSize: "20px"}}>&nbsp;&nbsp;End</b>
                                </Button>
                                <audio
                                    id={"callStream"}
                                    autoPlay={true}
                                />

                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else if (this.state.status === "incoming") {


            //////////////////////////////////////
            // Call controls, status & End call
            //////////////////////////////////////
            let call_duration = "00:00";
            if(this.session != null) {
                let minutes = Math.floor(this.state.callDuration / 60000) % 60;
                let seconds = ((this.state.callDuration % 60000) / 1000).toFixed(0);
                let hours = Math.floor(this.state.callDuration / (60000*60));
                if(hours === 0) {
                    call_duration = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                } else {
                    call_duration = hours + ":" + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }
            }


            return(
                <div
                    style={stickyBottom}
                    id={"callFooter"}
                >
                    <Container style={{paddingTop: "15px"}}>
                        <Row>
                            <Col xs={"12"}>
                                <Button
                                    block={true}
                                    id={"CallButton"}
                                    outline = {true}
                                    color={"info"}
                                    onClick={this.callStateChange} // on click, call this function
                                    // disabled = return value
                                    style={{width: "100%", height: "50px"}}
                                >
                                    <FontAwesomeIcon icon={"phone"} style={{color: "#00FF00"}} inverse transform={{rotate: -140}} size={"lg"}/><b style={{fontSize: "20px"}}>&nbsp;&nbsp;Answer</b>
                                </Button>
                                <audio
                                    id={"callStream"}
                                    autoPlay={true}
                                />

                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}