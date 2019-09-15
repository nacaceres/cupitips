import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./NavBar.css";
class NavBar extends Component {
  clickAuth = () => {
    this.props.history.push("/Auth");
  };

  clickOut = () => {
    this.props.handleAuthentication(false, undefined);
  };

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

  renderNivel(niv) {
    if (niv.estado === true) {
      let act = () => {
        let filtros = this.props.filtros;
        for (let i = 0; i < filtros.nivel.length; i++) {
          if (filtros.nivel[i].nombre === niv.nombre) {
            filtros.nivel[i].estado = false;
          }
        }
        this.props.actualizarFiltros(filtros);
      };
      return (
        <div
          key={"NivButt" + niv.nombre}
          className="btn btnnivel btn-primary"
          onClick={act}
        >
          Nivel {niv.nombre}
        </div>
      );
    } else {
      let act = () => {
        let filtros = this.props.filtros;
        for (let i = 0; i < filtros.nivel.length; i++) {
          if (filtros.nivel[i].nombre === niv.nombre) {
            filtros.nivel[i].estado = true;
          }
        }
        this.props.actualizarFiltros(filtros);
      };
      return (
        <div
          key={"NivButtF" + niv.nombre}
          className="btn btnnivel btn-outline-primary"
          onClick={act}
        >
          Nivel {niv.nombre}
        </div>
      );
    }
  }

  renderNiveles(niveles) {
    if (niveles !== undefined) {
      return niveles.map(niv => this.renderNivel(niv));
    }
  }

  actualizarNombre(e) {
    let filtros = this.props.filtros;
    filtros.nombre = e.target.value;
    this.props.actualizarFiltros(filtros);
  }

  actualizarTema(e) {
    let filtros = this.props.filtros;
    filtros.tema = e.target.value;
    this.props.actualizarFiltros(filtros);
  }

  renderNombre() {
    let nombre = "";
    if (this.props.filtros.nombre !== undefined) {
      nombre = this.props.filtros.nombre;
    }
    return (
      <div className="nombreRw row">
        <div className="col-sm-2 text-center my-auto nombreStr">Name:</div>
        <div className="col-sm-10 text-left">
          <input
            type="text"
            value={nombre}
            className="form-control"
            onChange={this.actualizarNombre.bind(this)}
          />
        </div>
      </div>
    );
  }

  renderTema() {
    let tema = "";
    if (this.props.filtros.tema !== undefined) {
      tema = this.props.filtros.tema;
    }
    return (
      <div className="nombreRw row">
        <div className="col-sm-2 text-center my-auto nombreStr">Tema:</div>
        <div className="col-sm-10 text-left">
          <input
            type="text"
            className="form-control"
            value={tema}
            onChange={this.actualizarTema.bind(this)}
          />
        </div>
      </div>
    );
  }

  actualizarLikes(e) {
    let filtros = this.props.filtros;
    filtros.likes = e.target.value;
    this.props.actualizarFiltros(filtros);
  }

  renderLikes() {
    let max = 0;
    for (let i = 0; i < this.props.tips.length; i++) {
      if (this.props.tips[i].likes > max) {
        max = this.props.tips[i].likes;
      }
    }
    let likes = "";
    if (this.props.filtros.likes !== undefined) {
      likes = this.props.filtros.likes;
    }
    return (
      <div>
        <div className="row text-center my-auto">
          <div className="col-sm-12 likeslbl">
            Likes: {this.props.filtros.likes}
          </div>
        </div>
        <div className="row">
          <div className="range-slider">
            <input
              className="range-slider__range"
              type="range"
              value={likes}
              min="0"
              max={max}
              onChange={this.actualizarLikes.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  renderFilters(show) {
    if (show) {
      let col = [];
      let col2 = [];
      if (this.props.filtros.nivel !== undefined) {
        for (let i = 0; i < this.props.filtros.nivel.length; i++) {
          if (i % 2 === 0) {
            col.push(this.props.filtros.nivel[i]);
          } else {
            col2.push(this.props.filtros.nivel[i]);
          }
        }
      }

      return (
        <div className="collapse" id="collapseFilters">
          <div className="row text-center colRow">
            <div className="col-sm-3 text-center">
              <div className="row text-center">
                <div className="col-sm-6 mx-auto">
                  {this.renderNiveles(col)}
                </div>
                <div className="col-sm-6 mx-auto">
                  {this.renderNiveles(col2)}
                </div>
              </div>
            </div>
            <div className="col-sm-6 text-center">
              {this.renderNombre()} {this.renderTema()}
            </div>
            <div className="col-sm-3 text-center">{this.renderLikes()}</div>
          </div>
        </div>
      );
    }
  }
  renderLoginButton(autenticado) {
    if (!autenticado) {
      return (
        <button
          type="button"
          onClick={this.clickAuth}
          className="btn btn-primary"
        >
          Ingresar
        </button>
      );
    } else {
      return (
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.props.username}
          </button>
          <div className="dropdown-menu">
            <div className="dropdown-item itemMen">Sugerir Tip</div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item itemMen" onClick={this.clickOut}>
              Salir
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
                    src="/images/logo_disc.png"
                    alt="disc"
                  ></img>
                </a>
              </div>
              <div className="col-sm-4 text-center my-auto" id="colCenter">
                {this.renderFiltrar(this.props.show)}
              </div>
              <div className="col-sm-1" />
              <div className="col-sm-3 text-center my-auto">
                {this.renderLoginButton(this.props.autenticado)}
              </div>
            </div>
            {this.renderFilters(this.props.show)}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
