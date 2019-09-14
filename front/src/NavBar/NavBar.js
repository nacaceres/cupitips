import React, { Component } from "react";

import "./NavBar.css";
class NavBar extends Component {
  renderFiltrar(show) {
    if (show) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="collapse"
          data-target="#collapseFilters"
          aria-expanded="false"
          aria-controls="collapseFilters"
        >
          Filtrar
        </button>
      );
    }
  }

  renderFilters(show) {
    if (show) {
      return (
        <div className="collapse" id="collapseFilters">
          <div className="row">
            <div className="col-sm-4 text-center">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
            <div className="col-sm-4 text-center">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
            <div className="col-sm-4 text-center">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="topnav" id="navBar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4 text-right">
                <a href="/" className="text-right">
                  <img
                    className="logo"
                    src="./images/logo_disc.png"
                    alt="disc"
                  ></img>
                </a>
              </div>
              <div className="col-sm-4 text-center my-auto" id="colCenter">
                {this.renderFiltrar(this.props.show)}
              </div>
              <div className="col-sm-1"></div>
              <div className="col-sm-3 text-center my-auto">
                <button
                  type="button"
                  onClick={this.props.hideFilter}
                  className="btn btn-primary"
                >
                  Ingresar
                </button>
              </div>
            </div>
            {this.renderFilters(this.props.show)}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
