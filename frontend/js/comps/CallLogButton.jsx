/**
 *  React Imports
 */
import React from "react";


/**
 *  Style Imports
 */
        import { Button } from 'reactstrap';

export default class CallLogButton extends React.Component {

        showLogs = () => {
        alert("Test");
}

    render() {
        return(
          <div>
        <Button onClick={this.showLogs}>Call Logs</Button>
          </div>
        );
    }
}