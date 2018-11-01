import React from "react";
import { Button } from 'reactstrap';
var $ = require('jquery');

export default class Hello extends React.Component {

    //Constructor for the <Hello> object
    constructor(props){
        super(props);

        // Set the greeting to the passed in name
        this.state = {greetings: 'Hello ' + this.props.name};

        // Binding is nessecary to make 'this' work in the callback
        // sets the "getPythonHello" function to this object's reference.
        this.getPythonHello = this.getPythonHello.bind(this);
    }

    getPythonHello(){
        $.get(window.location.href + 'hello', (data) => {
            console.log(data);
            this.personalizedGreeting(data)
        });
    }

    //Reset the class's state to a new greeting.
    personalizedGreeting(greeting) {
        this.setState({greetings: greeting + ' ' + this.props.name + '!'});
    }

    render() {
        return(
            <div>
            <h1>{this.state.greetings}</h1>
                <hr/>
                <Button onClick={this.getPythonHello}>Say Hello!</Button>
            </div>
        );
    }
}