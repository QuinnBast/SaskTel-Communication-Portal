/**
 *  React Imports
 */
import React, {Component, Fragment} from "react";

/**
 *  Component Imports
 */
import Profile from "../comps/Profile";
import ProfileSettings from "../comps/ProfileSettings"

import { Container} from "reactstrap";

export default class Interface extends Component {

    //Create a list of all user properties to show to the user
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id={"dashboard"}>
                <Container>
                    <Profile/>
                    <ProfileSettings/>
                </Container>
            </div>
        );
    }
}

