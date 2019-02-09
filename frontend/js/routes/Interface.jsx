/**
 *  React Imports
 */
import React, {Component, Fragment} from "react";

/**
 *  Component Imports
 */
import Profile from "../comps/Profile";
import CarouselManager from "../comps/CarouselManager";
import Sip from "../comps/Sip";

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
                    <CarouselManager/>
                    <Sip/>
                </Container>
            </div>
        );
    }
}

