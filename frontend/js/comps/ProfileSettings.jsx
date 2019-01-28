/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Container} from 'reactstrap';
import ProfileSetting from "../comps/ProfileSetting";

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

export default class ProfileSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <ProfileSetting name={"Call Forwarding Always"}/>
            </Container>
        )
    }
}