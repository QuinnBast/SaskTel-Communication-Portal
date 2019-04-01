/**
 *  React Imports
 */
import React, {Fragment} from "react";


/**
 *  Style Imports
 */
import {Button, Carousel, CarouselItem, Col, Container, Row} from 'reactstrap';
import ProfileSettings from "./ProfileSettings";
import Switch from 'react-switch';

const headerStyle = {
    borderBottom: "2px solid black",
    background: "#e9ecef",
    paddingBottom: "10px",
    paddingTop: "10px"
};

export default class CarouselManager extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: 0,
            editPage: null,
            title: "",
            toggleMe: null
        }
    }

    next = (editPage, title, toggleMe) => {
        // This will make the edit page appear
        this.setState({currentPage: 1, editPage: editPage, title: title, toggleMe});
    };

    prev = () => {
        // Remove the edit page from the component
        this.state.toggleMe.loadAsync();
        this.setState({currentPage: 0, editPage: null, toggleMe: null});
    };

    render() {
        let header = (
            <Container>
                <Row style={headerStyle}>
                    <Col xs={"6"}><h4>Setting</h4></Col>
                    <Col xs={"3"}><h4>Enable</h4></Col>
                    <Col xs={"3"}><h4>Edit</h4></Col>
                </Row>
            </Container>);
        if(this.state.currentPage !== 0){
            header = (
                <Container>
                    <Row style={headerStyle}>
                        <Col xs={"2"} style={{textAlign: "center"}}><Button onClick={this.prev}>Back</Button></Col>
                        <Col xs={"8"} style={{textAlign: "center"}}><h4>{this.state.title}</h4></Col>
                    </Row>
                </Container>);
        }

        return(
            <div style={{marginBottom: "240px"}}>
                <Carousel id={"carousel"} activeIndex={this.state.currentPage} next={this.next} previous={this.prev} interval={false} keyboard={false}>
                    <CarouselItem id={"carouselHeader"} key={"settings"}>
                        {header}
                        <ProfileSettings onEdit={this.next}/>
                    </CarouselItem>
                    <CarouselItem id={"carouselBody"} key={"editPage"}>
                        {header}
                        {this.state.editPage}
                    </CarouselItem>
                </Carousel>
            </div>
        );
    }
}