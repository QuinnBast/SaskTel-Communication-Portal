/**
 *  React Imports
 */
import React, {Component} from "react";

/**
 *  Style Imports
 */
import {Accordion, Icon, Container} from 'semantic-ui-react'



/**
 *  Local Style Definitions
 */
let margin = {
    marginBottom: '40px',
};


export default class CallProperties extends Component {

    constructor(props){
        super(props);
        this.state = {
            'name':'Default CallProperties',
            'title':'Default Title',
            'description':'Default Description',
            'content':'Default Content',
            'collapse':true
        };
    };

    content = () => {};

    toggle = () => {
        this.setState({
            'collapse': !this.state.collapse
        });
    };

    render() {
        return (
            <Container>
            <Accordion styled fluid>
                <Accordion.Title onClick={this.toggle} active={this.state.collapse === true}>
                    <Icon name='dropdown'/>
                    {this.state.title}
                </Accordion.Title>
                <Accordion.Content active={this.state.collapse === true}>
                    <div>{this.state.name}</div>
                    <div>{this.state.description}</div>
                    <div>{this.state.content}</div>
                </Accordion.Content>
            </Accordion>
            </Container>
        );
    }
}