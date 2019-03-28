/**
 *  React Imports
 */
import React from "react";
import PropTypes from 'prop-types';
import Auth from '../router/Auth'

/**
 *  Component Imports
 */
import {Col, Container, Row} from 'reactstrap';
import ServiceFactory from "./ServiceFactory"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import { getTag } from "../broadsoft/xmlParse";

export default class ProfileSettings extends React.Component {
    /**
     *
     * @param props
     *      onEdit(editPage:React.Component):function - function that sets and moves to the containing carousel's edit page (param)
     */

    constructor(props) {
        super(props);
        this.state = {
            status: "loading",
            services: []
        };
    }

    componentDidMount() {
        let self = this;
        if(Auth.isAuthenticated()) {
            self.loadServices();
        } else {
            let interval = setInterval(function () {
                if (Auth.isAuthenticated()) {
                    self.loadServices();
                    clearInterval(interval);
                }
            }, 500)
        }
    }

    loadServices = () => {
        let self = this;
        return BroadSoft.sendRequest({endpoint: "/user/<user>/services"}).then((response) => {
            let serviceList = getTag(response, ["Services"]).elements;
            let services = [];

            for(let service of serviceList){
                let name = getTag(service, ["name"]);
                let uri = getTag(service, ["uri"]);

                if(uri !== null){
                    uri = uri.substring(5);
                    services.push(ServiceFactory.build(name, uri, self.props.onEdit));
                }
            }
            self.setState({status: "ready", services});
        }, (response) => {
            self.setState({status: "error"})
        });
    };

    render() {
        if(this.state.status === "loading"){
            return(
                <Container id={"ProfileServices"}>
                    <div>Loading services...</div>
                </Container>
            );
        } else if(this.state.status === "error"){
            return(
                <Container id={"ProfileServices"}>
                    <div>An error has occurred.</div>
                </Container>
            );
        } else if (this.state.status === "ready"){
            return(
                <Container id={"ProfileServices"}>
                    {this.state.services}
                </Container>
            );
        }
    }
}

ProfileSettings.propTypes = {
    // A function passed from the CarouselManager to handle changing pages.
    onEdit: PropTypes.func
};