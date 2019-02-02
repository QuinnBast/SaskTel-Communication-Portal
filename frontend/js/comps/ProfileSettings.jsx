/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Col, Container, Row} from 'reactstrap';
import Service from "./Service";

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
        this.loadServices();
    }

    loadServices = () => {
      let self = this;
      BroadSoft.sendRequest({
          endpoint: "/user/<user>/services",
          method: "GET",
          success: function(response){
              let serviceList = getTag(response, ["Services"]).elements;
              let services = [];

              for(let service of serviceList){
                  let name = getTag(service, ["name"]);
                  let uri = getTag(service, ["uri"]);

                  if(uri !== null){
                      uri = uri.substring(5);
                      services.push(<Service key={name} hasEdit hasToggle name={name} uri={uri} onEdit={self.props.onEdit}/>);
                  }
              }
              self.setState({status: "ready", services});
          },
          error: function(response){
              self.setState({status: "error"})
          }
      })
    };

    render() {
        if(this.state.status === "loading"){
            return(
            <Container>
                <div>Loading services...</div>
            </Container>
            );
        } else if(this.state.status === "error"){
            return(
            <Container>
                <div>An error has occurred.</div>
            </Container>
            );
        } else if (this.state.status === "ready"){
            return(
            <Container>
                {this.state.services}
            </Container>
            );
        }
    }
}