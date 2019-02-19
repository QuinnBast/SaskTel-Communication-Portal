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
        <Button onClick={this.showLogs} id={"callLogButton"}>Call Logs</Button>
          </div>
        );
    }
}