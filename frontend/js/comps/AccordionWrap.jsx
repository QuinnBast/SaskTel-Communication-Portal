/**
 *  React Imports
 */
import React from "react";

/**
 *  Style Imports
 */
import {Accordion, Icon, Container} from 'semantic-ui-react'


export default class AccordionWrap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open : false
        };
    };

    toggle = () => {
        this.setState({
            open : !this.state.open
        });
    };

    render() {
        if(this.props.unauthorized === true) {
            return <Container><div>Unauthorized access. (TODO: change this to return null)</div></Container>;
        } else {
            return (
                <Container>
                    <Accordion styled fluid>
                        <Accordion.Title onClick={this.toggle} active={this.state.open === true}>
                            <Icon name='dropdown'/>
                            {this.props.title}
                        </Accordion.Title>
                        <Accordion.Content active={this.state.open === true}>
                            <div>{this.props.description}</div>
                            <div>{this.props.children}</div>
                        </Accordion.Content>
                    </Accordion>
                </Container>
            );
        }
    }
}