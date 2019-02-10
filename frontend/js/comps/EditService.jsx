/**
 *  React Imports
 */
import React from "react";
import Editable from "./Editable";
import { getTag } from "../broadsoft/xmlParse";
import { Container } from 'reactstrap';

export default class EditService extends React.Component {
    /**
     *
     * @param props
     *  editables:array[{editable}] - An array of editables generated by the ServiceFactory
     *  parent:React.Component - the parent service component
     */


    // KNOWN ISSUE: For Third party voicemail support endpoint the "XmlLocation" array is being set to an empty array after it mounts?

    render(){

        let elements = [];
        if(this.props.editables === null){
            return <div>This component has no editable parameters</div>;
        }
        for(let edit of this.props.editables){
            let name = edit.name;
            let updateLocation = {parent: this.props.parent, XmlLocation: edit.XmlLocation};
            let type = edit.type;
            let tooltip = edit.tooltip;
            let range = null;
            if(edit.type === "range"){
                range = edit.range;
            }
            elements.push(<Editable key={name} type={type} range={range} tooltip = {tooltip} name={name} updateLocation={updateLocation} value={updateLocation.parent.getValue(updateLocation.XmlLocation)} />)
        }

        return(
            <Container key={"Editable"}>
                {elements}
            </Container>
        );
    }
}