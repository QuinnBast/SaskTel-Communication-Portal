import _ from 'lodash'
/**
 *  React Imports
 */
import React from "react";

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import { getTag } from "../broadsoft/xmlParse";

/**
 *  Style Imports
 */
import {Table, Badge, Container} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class CallLogs extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            logs : [],
            column : null,
            direction : null,
            status: "loading"
        };
    }

    componentDidMount() {
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
    loadAsync = () => {
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
                    direction : 'descending',
                    status: "ready"});
            }

        });
    }

    render() {
        if(this.state.status === "loading"){
            return(
                <div>Loading call history...</div>
            )
        }

        let i = 0;
        let tableRows = [];
        for(let property of Array.from(this.state.logs)){

            let badge = null;
            switch(property['type']){
                case "Outgoing":
                    badge = <h4><Badge pill color={"primary"}>{property['type']}</Badge></h4>;
                    break;
                case "Missed":
                    badge = <h4><Badge pill color={"danger"}>{property['type']}</Badge></h4>;
                    break;
                case "Received":
                    badge = <h4><Badge pill color={"success"}>{property['type']}</Badge></h4>;
                    break;
            }

            tableRows.push(<tr key={this.state.name + (i++).toString()} style={{display: "block"}}>
                <td style={{display: "inline-block", width:"33%"}}>{badge}</td>
                <td style={{display: "inline-block", width:"33%"}}>{property['phoneNumber']}</td>
                <td style={{display: "inline-block", width:"33%"}}>{(new Date(property['time']))
                    .toLocaleString('en-CA',
                        {   day: 'numeric',
                            month: 'short',
                            weekday :'short',
                            hour: 'numeric',
                            minute: 'numeric', localeMatcher : "best fit" }).replace('.', '')}</td>
            </tr>);
        }

        let sortIcons = [null, null, null];
        if(this.state.column === 'type'){
            sortIcons[0] = this.state.direction === 'descending' ? <FontAwesomeIcon icon={"caret-down"}/> : <FontAwesomeIcon icon={"caret-up"}/>;
        } else if (this.state.column === 'phoneNumber') {
            sortIcons[1] = this.state.direction === 'descending' ? <FontAwesomeIcon icon={"caret-down"}/> : <FontAwesomeIcon icon={"caret-up"}/>;
        } else if (this.state.column === 'time') {
            sortIcons[2] = this.state.direction === 'descending' ? <FontAwesomeIcon icon={"caret-down"}/> : <FontAwesomeIcon icon={"caret-up"}/>;
        }

        return (
                    <Table striped id={"CallLogs"} style={{height: "100%"}}>
                        <thead style={{display: "block"}}>
                            <tr style={{display: "block"}}>
                                <th onClick={this.handleSort('type')} style={{display: "inline-block", width:"33%"}}>
                                    Type {sortIcons[0]}
                                </th>
                                <th onClick={this.handleSort('phoneNumber')} style={{display: "inline-block", width:"33%"}}>
                                    Number {sortIcons[1]}
                                </th>
                                <th onClick={this.handleSort('time')} style={{display: "inline-block", width:"33%"}}>
                                    Time {sortIcons[2]}
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{overflowY: "scroll", display: "block", height: "90%"}}>
                            {tableRows}
                        </tbody>
                    </Table>
        );
    }
}