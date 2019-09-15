import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./NotFound.css";
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
  }
  render() {
    return (
      <div className="row text-center">
        <div className="col-sm-6 mx-auto notfoundlbl">404 Not Found</div>
      </div>
    );
  }
}

export default withRouter(NotFound);
