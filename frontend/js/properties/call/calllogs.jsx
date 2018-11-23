import React from "react";
import Property from "../property"
import {Button, Table} from "reactstrap";

export default class CallLogs extends Property {

    constructor(props){
        super(props);
        this.state.name = "Call Logs";
        this.state.description = "This property shows the history of all your previous calls.";
        this.state.title = "Call Logs";
        this.state.content = this.content();
    }

    content = () => {
        return(
            <div>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Date Recieved</th>
                        <th>Call Type</th>
                        <th>From</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>November something</td>
                        <td>Incoming</td>
                        <td>3065194771</td>
                        <td>Missed</td>
                    </tr>
                    </tbody>
                </Table>
            </div>)
    };

    render() {
        return super.render();
    }
}