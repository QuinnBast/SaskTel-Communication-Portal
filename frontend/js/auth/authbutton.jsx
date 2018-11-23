import React from "react";
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import auth from "./auth";

export default class AuthButton extends React.Component{
    render() {
        if(auth.isAuthenticated())
        return (<NavLink tag={Link} to="/login" onClick={() => {
          auth.logout(() => {
            props.history.push("/login");
          });
        }}>Sign out</NavLink>);
        else
            return ("");
    }
}