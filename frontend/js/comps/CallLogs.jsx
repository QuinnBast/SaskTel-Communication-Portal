
/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import CallProperties from "./call/CallProperties";

/**
 *  REST API Imports
 */
import BroadSoft from "../BroadSoft/BroadSoft";

/**
 *  Style Imports
 */
import { Table } from 'semantic-ui-react'

export default class CallLogs extends CallProperties {

    constructor(props){
        super(props);
        this.state = {
            logs : [],
            name : "Call CallLogs",
            description : "This property shows the history of all your previous calls.",
            title : "Call CallLogs",
            content : "" // Can't set to this.content() here, because it creates an unbounded loop.
        };
        // this.loadAsync() triggers componentDidUpdate() and the contents are loaded.
        this.loadAsync()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.logs !== prevState.logs){
            this.setState({content: this.content()})
        }
    }

    content = () => {
        let i = 0;
        let tableRows = [];
        for(let property of Array.from(this.state.logs)){
            tableRows.push(<Table.Row key={this.state.name + (i++).toString()}>
                            <Table.Cell>{property['type']}</Table.Cell>
                            <Table.Cell>{property['phoneNumber']}</Table.Cell>
                            <Table.Cell>{property['time']}</Table.Cell>
                        </Table.Row>);
        }

        return (
            <div>
                <Table striped id={"CallLogs"}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Phone Number</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {tableRows}
                    </Table.Body>
                </Table>
            </div>
        );
    };

        // Asynchronous function that updates the object.
    loadAsync(){
        let self= this;
        BroadSoft.sendRequest({
            endpoint:"/user/<user>/directories/CallLogs",
            callback: function(response) {
                let data = response['data']['CallLogs'];

                for (let missedCall of Array.from(data['missed']['callLogsEntry'])){
                    self.setState(prevState => (
                        {logs: [...prevState.logs,
                                {type:  "Missed",
                                    phoneNumber:missedCall['phoneNumber'],
                                    time:missedCall['time']
                                }]
                        }));
                }

                for(let placedCall of Array.from(data['placed']['callLogsEntry'])){
                    self.setState(prevState => (
                        {logs: [...prevState.logs,
                                {type:  "Outgoing",
                                    phoneNumber:placedCall['phoneNumber'],
                                    time:placedCall['time']
                                }]
                        }));
                }

                for(let receivedCall of Array.from(data['received']['callLogsEntry'])){
                    self.setState(prevState => (
                        {logs: [...prevState.logs,
                                {type:  "Received",
                                    phoneNumber:receivedCall['phoneNumber'],
                                    time:receivedCall['time']
                                }]
                        }));
                }
            }
        });
    }

    render() {
        return super.render();
    }
}