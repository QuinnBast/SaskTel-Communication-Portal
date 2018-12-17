import React, {Component} from 'react';

export default class LoadingIcon extends Component {

    constructor(props){
        super(props);
        this.state = {
            active: true,
            width: 410,
            height: 288,
        };

        switch(this.props.size){
            case 'xl':
                this.state.width = 820;
                this.state.height = 576;
                break;
            case 'l':
                this.state.width = 410;
                this.state.height = 288;
                break;
            case 'm':
                this.state.width = 205;
                this.state.height = 144;
                break;
            case 's':
                this.state.width = 82;
                this.state.height = 56;
                break;
            case 'xs':
                this.state.width = 41;
                this.state.height = 28;
                break;
        }
    }

    stop = () => {
        this.setState({
                active: false
            })
    };

    start = () => {
        this.setState({
                active: true
            })
    };

    render() {
        let style = {};
        if(!this.state.active){
            style = {
                display: 'none',
            }
        }

        return (
            <div className={"LoadingContainer"} style={style}>
                <img className={"loading loadingImage"} src={"./dist/assets/TelPortPhone.png"} width={this.state.width} height={this.state.height}></img>
                <img className={"loadingImage"} src={"./dist/assets/TelPortShip.png"} width={this.state.width} height={this.state.height}></img>
            </div>
        );
    }
}