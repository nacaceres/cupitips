import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./TipInList.css";
class TipInList extends Component {

  clicked = () => {
    this.props.history.push("/cupitip/"+this.props.tip._id);
  };

  render() {

    return (
      <div
        className="tipInList container-flex disable-select"
        onClick={this.clicked.bind(this)}
      >
        <div className="row tipTitle">
          <div className="col-sm-2">
            <div className="numeroNivel mx-auto">
              <div className="txtNumeroNivel">{"N" + this.props.tip.nivel}</div>
            </div>
          </div>
          <div className="col-sm-10 text-left my-auto txtNombre">
            {this.props.tip.nombre}
          </div>
        </div>
        <div className="row">b</div>
        <div className="row">c</div>
      </div>
    );
  }
}

export default withRouter(TipInList);
