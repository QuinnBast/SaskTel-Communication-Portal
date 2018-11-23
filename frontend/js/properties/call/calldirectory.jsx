import React from "react";
import Property from "../property"
import {Button, Table} from "reactstrap";

export default class CallDirectory extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Directory";
        this.state.description = "This property shows a call directory for possible contacts and groups.";
        this.state.title = "Call Directory";
        this.state.content = this.content();
    }

    content = () => {
        return(
            <div>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Quinn</td>
                        <td>Bast</td>
                        <td>3065194771</td>
                    </tr>
                    </tbody>
                </Table>
            </div>)
    };

    render() {
        return super.render();
    }
}