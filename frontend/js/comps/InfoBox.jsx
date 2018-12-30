/**
 *  React Imports
 */
import React, {Fragment} from "react";

/**
 *  Style/UI Imports
 */
import { Sidebar, Container} from "semantic-ui-react";

/**
 * Worker imports
 */
import UpdateQueue from "../workers/UpdateQueue";

export default class InfoBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            updateQueue : this.props.updateQueue,
        }
    }

    render() {
        if(this.state.updateQueue.status === "waiting"){
            return(
                <Fragment><div>This is a test</div></Fragment>
            );
        } else if (this.state.updateQueue.status === "processing"){
            return (
                    <Sidebar id={"infoBox"} animation={"overlay"} direction={"bottom"}>
                        <Container>
                            <Container textAlign={"center"}>
                                <div>Processing the Queue. {this.state.updateQueue.success.toString()} successful, {this.state.updateQueue.failed.toString()} failed, {(this.state.updateQueue.total - (this.state.updateQueue.success + this.state.updateQueue.failed)).toString()} pending</div>
                            </Container>
                        </Container>
                    </Sidebar>
            );
        } else if (this.state.updateQueue.status === "completed") {
            return (
                <Sidebar id={"infoBox"} animation={"overlay"} direction={"bottom"}>
                    <Container>
                        <Container textAlign={"center"}>
                            <div>Queue Processed {this.state.updateQueue.total.toString()} items. {this.state.updateQueue.success.toString()} successful, {this.state.updateQueue.failed.toString()} failed,</div>
                        </Container>
                    </Container>
                </Sidebar>
            );
        }
    }
}