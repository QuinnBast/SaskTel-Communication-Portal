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
            toggleMe: null,
            toggleState: false
        }
    }

    next = (editPage, title, toggleMe) => {
        // This will make the edit page appear
        this.setState({currentPage: 1, editPage: editPage, title: title, toggleMe: toggleMe, toggleState: toggleMe.isActive()});
    };

    prev = () => {
        // Remove the edit page from the component
        this.setState({currentPage: 0, editPage: null, toggleMe: null, toggleState: false});
    };

    toggle = (toggleState) => {
        this.setState({toggleState: toggleState});
        this.state.toggleMe.toggle(toggleState);
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

        let toggle = [];
        if(this.state.toggleMe) {
            let text = "Off";
            if(this.state.toggleState){
                text = "On"
            }

            if (this.state.toggleMe.props.hasToggle) {
                toggle = <Container key={"editToggle"}>
                    <div>
                        <h5>Active</h5>
                        <Switch
                            id={this.state.toggleMe.props.name.replace(/\s+/g, '') + "Toggle"}
                            onChange={this.toggle} checked={this.state.toggleState}
                            onColor="#1dd5f3"
                            onHandleColor="#17a2b8"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                        /> <b>{text}</b>
                    </div>
                </Container>;
            }
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
                        {toggle}
                        {this.state.editPage}
                    </CarouselItem>
                </Carousel>
            </div>
        );
    }
}