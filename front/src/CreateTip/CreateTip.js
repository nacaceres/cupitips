import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./CreateTip.css";
class CreateTip extends Component {
    constructor(props) {
        super(props);
        this.props.hideFilter();
        this.state = {
            formdata: {
                nombre: "",
                descripcion: "",
                tema: "",
                nivel: "",
                codigoCorrecto: "",
                codigoErroneo: ""
            }
        };
        this.enviar = this.enviar.bind(this);
    }

  goBack = () => {
      this.props.history.goBack();
  };

  componentDidMount() {
      if (this.props.location.oldcreatestate !== undefined) {
          this.setState(this.props.location.oldcreatestate);
      }
  }
  enviar = () => {
      if (this.props.autenticado === false) {
          this.props.history.push({
              pathname: "/auth",
              oldcreatestate: this.state
          });
      } else {
          let req = {};
          req.nombre = this.state.formdata.nombre;
          req.codigo_mal_p = this.state.formdata.codigoErroneo;
          req.codigo_bien_p = this.state.formdata.codigoCorrecto;
          req.nivel = Number(this.state.formdata.nivel);
          req.tema = this.state.formdata.tema;
          req.descripcion = this.state.formdata.descripcion;
          console.log(JSON.stringify(req));
          fetch("addtip", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(req)
          })
              .then(response => response.json())
              .then(resp => {
                  if (resp.result.n > 0) {
                      alert(
                          "Tu tip ha sido enviado correctamente, lo revisaremos y en algunos dias podras verlo publicado"
                      );
                      this.props.actualizarTips();
                  } else {
                      alert("Ha ocurrido un error y tu tip no pudo ser enviado.");
                  }
              });
      }
  };

  handleInputChange = e => {
      let formdata = Object.assign({}, this.state.formdata);
      formdata[e.target.name] = e.target.value;
      this.setState({ formdata });
  };

  keyPress = e => {
      if (e.keyCode === 13) {
          this.enviar();
      }
  };

  render() {
      return (
          <div className="container-fluid">
              <div className="row text-center">
                  <div className="col-sm-2 mx-auto">
                      <button className="btn btn-primary btnbckcrt" onClick={this.goBack}>Back</button>
                  </div>
                  <div className="col-sm-8 mx-auto">
                      <div className="sugerirlbl">Sugerir Tip</div>
                  </div>
                  <div className="col-sm-2"/>
              </div>
              <div className="row text-center">
                  <div className="col-sm-3 my-auto text-right">
                      <div className="crtlbl">Nombre:</div>
                  </div>
                  <div className="col-sm-6">
                      <input
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.formdata.nombre}
                          name="nombre"
                          type="text"
                          placeholder="Nombre"
                      />
                  </div>
              </div>
              <div className="row text-center">
                  <div className="col-sm-3 my-auto text-right">
                      <div className="crtlbl">Descripcion:</div>
                  </div>
                  <div className="col-sm-6">
                      <input
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.formdata.descripcion}
                          name="descripcion"
                          type="text"
                          placeholder="Descripcion"
                      />
                  </div>
              </div>
              <div className="row text-center">
                  <div className="col-sm-3 my-auto text-right">
                      <div className="crtlbl">Tema:</div>
                  </div>
                  <div className="col-sm-6">
                      <input
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.formdata.tema}
                          name="tema"
                          type="text"
                          placeholder="Tema"
                      />
                  </div>
              </div>
              <div className="row text-center">
                  <div className="col-sm-3 my-auto text-right">
                      <div className="crtlbl">Nivel:</div>
                  </div>
                  <div className="col-sm-6">
                      <input
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.formdata.nivel}
                          name="nivel"
                          type="text"
                          placeholder="Nivel"
                      />
                  </div>
              </div>
              <div className="row text-center">
                  <div className="col-sm-3 my-auto text-right">
                      <div className="crtlbl">Codigo Correcto:</div>
                  </div>
                  <div className="col-sm-6">
                      <input
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.formdata.codigoCorrecto}
                          name="codigoCorrecto"
                          type="text"
                          placeholder="Codigo Correcto"
                      />
                  </div>
              </div>
              <div className="row text-center">
                  <div className="col-sm-3 my-auto text-right">
                      <div className="crtlbl">Codigo Erroneo:</div>
                  </div>
                  <div className="col-sm-6">
                      <input
                          onChange={this.handleInputChange.bind(this)}
                          value={this.state.formdata.codigoErroneo}
                          name="codigoErroneo"
                          type="text"
                          placeholder="Codigo Erroneo"
                      />
                  </div>
              </div>
              <div className="row text-center">
                  <div className="col-sm-6 mx-auto">
                      <button
                          className="btn btn-primary"
                          onKeyDown={this.keyPress}
                          onClick={this.enviar}
                      >
              Enviar
                      </button>
                  </div>
              </div>
          </div>
      );
  }
}

export default withRouter(CreateTip);
