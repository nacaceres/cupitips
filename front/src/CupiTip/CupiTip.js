import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./CupiTip.css";
class CupiTip extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
  }

  componentDidMount() {

  }

  click =() => {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <div className="btn btn-primary" onClick={this.click}>Back</div>
      </div>
    );
  }
}

export default withRouter(CupiTip);
