import React, {Component, Fragment} from 'react';
import {Checkbox} from 'semantic-ui-react';
class CallToggle extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            checked: props.checked
        };

        this.toggle = this.toggle.bind(this);

    }

    toggle () {
        this.setState({checked : !this.state.checked});
    }

    render() {
        return (
            <Fragment>
                <Checkbox toggle checked={this.state.checked} onClick={this.toggle}/>
            </Fragment>
        );
    }
}

export default CallToggle;