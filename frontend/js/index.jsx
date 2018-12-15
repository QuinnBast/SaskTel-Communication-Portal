import React from "react";
import {render} from "react-dom";
import {Router} from "react-router-dom";
import App from "./App";
import 'semantic-ui-css/semantic.min.css';
import history from "./router/history";

require("../css/main.css"); //Requires the CSS file

render((
  <Router history={history}>
    <App />
  </Router>
    ),document.getElementById('content'));