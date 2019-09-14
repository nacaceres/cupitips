import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./Auth.css";
class Auth extends Component {
    constructor(props) {
        super(props);
        this.props.hideFilter();
      }


  componentDidMount() {
    console.log("Auth");
  }

  click =() => {
    this.props.history.push("/");
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Auth</h1>
        <div className="btn btn-primary" onClick={this.click}>Back</div>
      </div>
    );
  }
}

export default withRouter(Auth);
