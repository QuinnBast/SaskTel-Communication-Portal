/**
 *  React Imports
 */
import React from "react";


/**
 *  Style Imports
 */
        import { Button } from 'reactstrap';

export default class FeatureAccessCodesButton extends React.Component {

        showFeatureAccessCodes = () => {
        alert("Feature Access Codes");
}

    render() {
        return(
          <div>
        <Button onClick={this.showFeatureAccessCodes}>Feature Access Codes</Button>
          </div>
        );
    }
}