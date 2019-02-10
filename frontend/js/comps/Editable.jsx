/**
 *  React Imports
 */
import React from "react";
import Switch from 'react-switch';
import { Input } from "reactstrap";
import MaskedInput from 'react-text-mask'

export default class Editable extends React.Component {
    /**
     *
     * @param props
     *  name:string - the name of the component
     *  tooltip:string - A tooltip to display when hovering over the name
     *  type:string - the type of editable to display
     *  value:<oneOf(bool, string, int)> - the value of the editable
     *  updateLocation:{parent:React.Component, xmlLocation:array[string]} - an object which links the editable to the parent
     *
     */

    constructor(props){
        super(props);
        let value = this.props.value;
        if(this.props.type === "bool"){
            value = !!this.props.value;
        }
        this.state = {
            value: value,
        }
    }

    toggleBoolean = () => {
        this.setState({value: !this.state.value});
        this.props.updateLocation.parent.setValue(this.props.updateLocation.XmlLocation, !this.state.value);
    };

    changePhone = (event) => {
        this.setState({value: event.target.value});
        this.props.updateLocation.parent.setValue(this.props.updateLocation.XmlLocation, event.target.value);
    };

    inputChange = (event) => {
        this.setState({value: event.target.value});
        this.props.updateLocation.parent.setValue(this.props.updateLocation.XmlLocation, event.target.value);
    };

    render(){
        switch(this.props.type){
            case "bool":
                return(
                    <div>
                    <div>{this.props.name}</div>
                    <Switch onChange={this.toggleBoolean} checked={this.state.value === "true"}/>
                    </div>
            );
            case "range":
                return(
                    <div>
                    <div>{this.props.name}</div>
                    <Input type={"number"} onChange={this.inputChange}/>
                    </div>
                );
            case "phone":
                return(
                    <div>
                    <div>{this.props.name}</div>
                        <MaskedInput
                            mask={['(',/\d/, /\d/, /\d/,')','-',/\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
                            placeholder="(___)-___-____"
                            id="EditablePhone"
                            guide = {true}
                            autoComplete="off"
                            defaultValue={this.state.value}
                            onChange={(e) => this.changePhone(e)}
                        />
                    </div>
                );
        }
    }
}