/**
 *  React Imports
 */
import React from "react";


/**
 *  Style Imports
 */
import {Button, Carousel, CarouselItem, Col, Container, Row} from 'reactstrap';
import ProfileSettings from "./ProfileSettings";

const headerStyle = {
    borderBottom: "2px solid black",
    background: "#e9ecef",
    padding: "5px"
};

export default class CarouselManager extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: 0,
            editPage: null,
            title: ""
        }
    }

    next = (editPage, title) => {
        // This will make the edit page appear
        this.setState({currentPage: 1, editPage: editPage, title: title});
    };

    prev = () => {
        // Remove the edit page from the component
        this.setState({currentPage: 0, editPage: null});
    };

    render() {
        let header = (
                <Row style={headerStyle}>
                    <Col xs={"6"}><h3>Setting</h3></Col>
                    <Col xs={"3"}><h3>Enabled</h3></Col>
                    <Col xs={"3"}><h3>Configure</h3></Col>
                </Row>);
        if(this.state.currentPage !== 0){
            header = (
                <Row style={headerStyle}>
                <Col xs={"3"}><Button onClick={this.prev}>Back</Button></Col>
                    <Col xs={"9"}><h3>{this.state.title}</h3></Col>
                </Row>);
        }

        return(
          <Carousel id={"carousel"} activeIndex={this.state.currentPage} next={this.next} previous={this.prev} interval={false}>
              <CarouselItem id={"carouselHeader"} key={"settings"}>
                  {header}
                  <ProfileSettings onEdit={this.next}/>
              </CarouselItem>
              <CarouselItem id={"carouselBody"} key={"editPage"}>
                  {header}
                  {this.state.editPage}
              </CarouselItem>
          </Carousel>
        );
    }
}