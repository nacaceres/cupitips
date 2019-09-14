import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom"
import createHistory from 'history/createBrowserHistory'
import App from "./App.js"
const history = createHistory();

ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById("root")
  )