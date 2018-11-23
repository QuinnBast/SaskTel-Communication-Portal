import React, {Component} from "react";
import {Card, CardHeader, CardBody, CardTitle, CardText, Button, Collapse} from "reactstrap";

var margin = {
    marginBottom: '40px',
}


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

    toggle = () => {
        this.setState({
            'collapse': !this.state.collapse
        });
    }

    render() {
        return (
            <Card style={margin}>
                <CardHeader>
                    {this.state.name}
                    <Button color="primary" onClick={this.toggle} style={{float:'right'}}>
                    Toggle
                    </Button>
                </CardHeader>
                <Collapse  isOpen={this.state.collapse}>
                    <CardBody>
                        <CardTitle>{this.state.title}</CardTitle>
                        <CardText>{this.state.description}</CardText>
                        <div>{this.state.content}</div>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}