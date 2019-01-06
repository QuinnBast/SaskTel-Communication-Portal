import _ from 'lodash'
/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import AccordionWrap from "./AccordionWrap";

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import { getTag } from "../broadsoft/xmlParse";

/**
 *  Style Imports
 */
import { Table } from 'semantic-ui-react'

export default class CallLogs extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            logs : [],
            column : null,
            direction : null
        };
        // this.loadAsync() triggers componentDidUpdate() and the contents are loaded.
        this.loadAsync();

    }

    handleSort = clickedColumn => () => {
        let column = this.state.column;
        let logs = [];
        let direction = null;

        // if column isn't current column, sort by ascending order
        if (this.state.column !== clickedColumn) {
            column = clickedColumn;
            logs = _.sortBy(this.state.logs, [clickedColumn]);
            direction = 'ascending';
        }
        // if column is currently selected, sort by opposite order
        else {
            if(this.state.direction === 'ascending') {
                logs = _.sortBy(this.state.logs, [clickedColumn]).reverse();
                direction = 'descending';
            }
            else {
                logs = _.sortBy(this.state.logs, [clickedColumn]);
                direction = 'ascending';
            }
        }
        // save the state to trigger  rerender
        this.setState({
            logs: logs,
            direction: direction,
            column : column
        })
    };

    // Asynchronous function that updates the object.
    loadAsync(){
        let self= this;
        BroadSoft.sendRequest({
            endpoint:"/user/<user>/directories/CallLogs",
            success: function(response) {

                let data = getTag(response, ["CallLogs"]);

                for (let missedCall of Array.from(getTag(data, ['missed']).elements)){
                    self.setState(prevState => (
                        {logs: [...prevState.logs,
                                {type:  "Missed",
                                    phoneNumber:getTag(missedCall, ['phoneNumber']),
                                    time:getTag(missedCall,['time'])
                                }]
                        }));
                }

                for(let placedCall of Array.from(getTag(data, ['placed']).elements)){
                    self.setState(prevState => (
                        {logs: [...prevState.logs,
                                {type:  "Outgoing",
                                    phoneNumber:getTag(placedCall, ['phoneNumber']),
                                    time:getTag(placedCall, ['time'])
                                }]
                        }));
                }

                for(let receivedCall of Array.from(getTag(data, ['received']).elements)){
                    self.setState(prevState => (
                        {logs: [...prevState.logs,
                                {type:  "Received",
                                    phoneNumber:getTag(receivedCall, ['phoneNumber']),
                                    time:getTag(receivedCall, ['time'])
                                }]
                        }));
                }
                self.setState({
                    column : 'time',
                    logs : _.sortBy(self.state.logs, ['time']).reverse(),
                    direction : 'descending'});
            }

        });
    }

    render() {
        let i = 0;
        let tableRows = [];
        for(let property of Array.from(this.state.logs)){
            tableRows.push(<Table.Row key={this.state.name + (i++).toString()}>
                <Table.Cell>{property['type']}</Table.Cell>
                <Table.Cell>{property['phoneNumber']}</Table.Cell>
                <Table.Cell>{(new Date(property['time']))
                    .toLocaleString('en-CA',
                        {   day: 'numeric',
                            month: 'short',
                            weekday :'short',
                            hour: 'numeric',
                            minute: 'numeric', localeMatcher : "best fit" }).replace('.', '')}</Table.Cell>
            </Table.Row>);
        }
        return (
            <AccordionWrap title={"Call Logs"} description={"This property shows the history of all your previous calls."}>
                <div>
                    <Table sortable striped id={"CallLogs"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={this.state.column === 'type' ? this.state.direction : null}
                                    onClick={this.handleSort('type')}
                                >
                                    Type
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={this.state.column === 'phoneNumber' ? this.state.direction : null}
                                    onClick={this.handleSort('phoneNumber')}
                                >
                                    Number
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={this.state.column === 'time' ? this.state.direction : null}
                                    onClick={this.handleSort('time')}
                                >
                                    Time
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableRows}
                        </Table.Body>
                    </Table>
                </div>
            </AccordionWrap>
        );
    }
}