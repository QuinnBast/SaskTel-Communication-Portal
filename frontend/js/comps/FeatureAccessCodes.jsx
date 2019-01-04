/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import CallProperties from "./call/CallProperties"

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";
import {Popup, Table} from "semantic-ui-react";

/**
 * Broadsoft imports
 */
import { getTag } from "../broadsoft/xmlParse"
import FeatureAccessCodeData from "./FeatureAccessCodeData";

export default class FeatureAccessCodes extends CallProperties {

    constructor(props) {
        super(props);
        this.state = {
            features : [],
            name : "Feature Access Codes",
            description : "Feature Access Codes list the star codes for services that you have. To activate a service, hit the * key and the number followed by the # key. Some require additional information such as a phone number, but you are prompted for that information. You cannot change your feature access codes.",
            title : "Feature Access Codes",
            content : this.content()
        };
    this.loadAsync();
}

componentDidUpdate(prevProps, prevState){
        if(this.state.features !== prevState.features){
            this.setState({content: this.content()})
        }
    }

content = () => {
    return (
        <div>
            <Table striped id={"FeatureAccessCodes"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Popup trigger={<div>Access Code</div>} content={"Access code to dial in order to access the specified feature."}/>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Popup trigger={<div>Feature Description</div>} content={"Description of the feature able to be accessed."}/></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body key={"FeatureAccessKey"}>
                    {this.state.features}
                </Table.Body>
            </Table>
        </div>
    );
};

// Asynchronous function that updates the object.
loadAsync(){
    let self = this;
    BroadSoft.sendRequest({
        endpoint: "/user/<user>/profile/Fac",
        success: function(response) {

            let features = getTag(response, ["FAC"]).elements;

            for(let fac of features){
                // Get information about the features
                let feature = <FeatureAccessCodeData key={getTag(fac, ["code"])} code={getTag(fac, ["code"])} fac={getTag(fac, ["codeName"])}/>
                self.setState((prevState) => ({ features: [...prevState.features, feature]}));
            }
        },
        error: function(response) {
            // User does not have access to the endpoint.
        }
    });
}

render() {
    return super.render();
}
}