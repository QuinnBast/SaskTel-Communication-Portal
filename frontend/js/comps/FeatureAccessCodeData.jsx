
/**
 *  React Imports
 */
import React from "react";

/**
 *  Style Imports
 */

export default class FeatureAccessCodeData extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
            return (
                <Table.Row>
                    <Table.Cell>{this.props.code}</Table.Cell>
                    <Table.Cell>{this.props.fac}</Table.Cell>
                </Table.Row>
            );
    }
}