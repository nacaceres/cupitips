import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./NotFound.css";
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
  }
}

export default withRouter(NotFound);
