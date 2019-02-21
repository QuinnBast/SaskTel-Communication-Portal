
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
                <tr>
                    <td>{this.props.code}</td>
                    <td>{this.props.fac}</td>
                </tr>
            );
    }
}