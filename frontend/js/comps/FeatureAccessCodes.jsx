/**
 *  React Imports
 */
import React from "react";

/**
 *  Component Imports
 */
import {Popover, PopoverBody, PopoverHeader, Table} from 'reactstrap';

/**
 *  REST API Imports
 */
import BroadSoft from "../broadsoft/BroadSoft";

/**
 * Broadsoft imports
 */
import { getTag } from "../broadsoft/xmlParse"
import FeatureAccessCodeData from "./FeatureAccessCodeData";

export default class FeatureAccessCodes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            features : [],
        };
        this.loadAsync();
    }

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
        return (
            <div>
                <Table striped id={"FeatureAccessCodes"}>
                    <thead>
                    <tr>
                        <th>Access Code</th>
                        <th>Feature Description</th>
                    </tr>
                    </thead>
                    <tbody key={"FeatureAccessKey"}>
                        {this.state.features}
                    </tbody>
                </Table>
            </div>
        );
    }
}