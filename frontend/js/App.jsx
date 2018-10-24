import React from "react";
import Hello from "./Hello";

export default class App extends React.Component {
    render() {
        return (
            <div className='header-contents'>
                <Hello name='Quinn'/>
            </div>
        );
    }
}