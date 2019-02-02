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
        }
    }

    next = (editPage) => {
        // This will make the edit page appear
        this.setState({currentPage: 1, editPage: editPage});
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
                <Col><Button onClick={this.prev}>Back</Button> </Col>
                </Row>);
        }

        return(
          <Carousel activeIndex={this.state.currentPage} next={this.next} previous={this.prev} interval={false}>
              <CarouselItem key={"settings"}>
                  {header}
                  <ProfileSettings onEdit={this.next}/>
              </CarouselItem>
              <CarouselItem key={"editPage"}>
                  {header}
                  {this.state.editPage}
              </CarouselItem>
          </Carousel>
        );
    }
}