
/**
 *  React Imports
 */
import React from "react";

/**
 *  Style Imports
 */
import { Table } from 'semantic-ui-react'

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