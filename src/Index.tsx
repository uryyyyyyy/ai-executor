import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {Routes} from "./Routes";

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>
  , document.getElementById('app')
);