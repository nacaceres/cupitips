import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./CupiTip.css";
class CupiTip extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
  }

  componentDidMount() {
    console.log("AHHH");
  }

  click =() => {
    this.props.history.push("/");
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <div className="btn btn-primary" onClick={this.click}></div>
      </div>
    );
  }
}

export default withRouter(CupiTip);
