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
                    let feature =
                        <tr style={{display: "block"}} key={getTag(fac, ["code"])}>
                            <td style={{display: "inline-block", width:"33%"}}>{getTag(fac, ["code"])}</td>
                            <td style={{display: "inline-block", width:"66%"}}>{getTag(fac, ["codeName"])}</td>
                        </tr>;
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
                <Table striped id={"FeatureAccessCodes"} style={{height: "100%"}}>
                    <thead style={{display: "block"}}>
                    <tr style={{display: "block"}}>
                        <th style={{display: "inline-block", width:"33%"}}>Access Code</th>
                        <th style={{display: "inline-block", width:"66%"}}>Feature Description</th>
                    </tr>
                    </thead>
                    <tbody key={"FeatureAccessKey"} style={{overflowY: "scroll", display: "block", height: "90%"}}>
                    {this.state.features}
                    </tbody>
                </Table>
        );
    }
}