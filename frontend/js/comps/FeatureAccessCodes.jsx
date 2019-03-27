/**
 *  React Imports
 */
import React, {Fragment} from "react";

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
        return BroadSoft.sendRequest({endpoint: "/user/<user>/profile/Fac"}).then( (response) => {

            let features = getTag(response, ["FAC"]).elements;

            for (let fac of features) {
                // Get information about the features
                let feature =
                    <tr key={getTag(fac, ["code"])}>
                        <td>{getTag(fac, ["code"])}</td>
                        <td>{getTag(fac, ["codeName"])}</td>
                    </tr>;
                self.setState((prevState) => ({features: [...prevState.features, feature]}));
            }
        });
    }

    render() {
        return (
            <Fragment>
                <Table striped id={"FeatureAccessCodes"}>
                    <thead>
                    <tr>
                        <th>Access Code</th>
                        <th>Feature Description</th>
                    </tr>
                    </thead>
                </Table>
            <div style={{height: "60vh", overflowY: "scroll"}}>
                <Table striped id={"FeatureAccessCodes"} style={{height: "100%"}}>
                    <tbody key={"FeatureAccessKey"}>
                    {this.state.features}
                    </tbody>
                </Table>
            </div>
            </Fragment>
        );
    }
}