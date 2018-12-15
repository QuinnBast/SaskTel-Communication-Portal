import React, {Component} from "react";
import {Accordion, Icon} from 'semantic-ui-react'

let margin = {
    marginBottom: '40px',
};


export default class Property extends Component {

    constructor(props){
        super(props);
        this.state = {
            'name':'Default Property',
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
            <Accordion style={margin}>
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
        );
    }
}