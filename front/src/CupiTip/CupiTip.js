import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./CupiTip.css";
class CupiTip extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
    this.state = {
      comment: "",
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    if (this.props.location.olddetailstate !== undefined) {
      this.setState(this.props.location.olddetailstate);
    }
  }

  clickBack = () => {
    this.props.history.goBack();
  };

  buscarTip(idActual) {
    let tips = this.props.tips;
    for (let i = 0; i < tips.length; i++) {
      if (tips[i]._id === idActual) {
        return tips[i];
      }
    }
    return null;
  }
  sugerirTip = () => {
    this.props.history.push("/CreateTip");
  };

  sendComment = () => {
    if (this.props.autenticado) {
      let req = {};
      req["_id"] = this.state.id;
      req.comentario = this.state.comment;
      fetch("comment", {
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
            alert("Tu comentario ha sido enviado correctamente.");
          } else {
            alert("Ha ocurrido un error y tu comentario no pudo ser enviado.");
          }
        });
    } else {
      this.props.history.push({
        pathname: "/auth",
        olddetailstate: this.state
      });
    }
  };

  sendLike = () => {
    if (this.props.autenticado) {
      let req = {};
      req["_id"] = this.props.match.params.id;
      fetch("like", {
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
            this.props.actualizarTips();
          } else {
            alert("Ha ocurrido un error y tu like no pudo ser enviado.");
          }
        });
    } else {
      this.props.history.push("/auth");
    }
  };

  compliePython(event ,code) {
    if(event){
      var stringb = "def multiplicar(a,b):\n    print(a*b)\n    return a*b\nmultiplicar(2,4)";
      //alert(stringb);
      var resp = window.pyodide.runPython(stringb);
      alert(resp);
      document.getElementById("compileBien").innerText = ("El Resultado es: \n" + resp);
    }
    else{
      var stringm = code;
      var respm = window.pyodide.runPython(stringm);
      alert(respm);
      //alert(window.pyodide.runPython(stringm));
    }
    
    //console.log(window.pyodide);
    //var resp = "SE LOGRO";
    //console.log(resp);
    //var ret = window.pyodide.runPython(string);
    //console.log(ret);
  }
  handleChange(event) { this.intento2.value = event.target.value }
  handleChangeCode(event) { this.setState({ value: event.target.value }); }
  onChangeText(e) {
    this.setState({ comment: e.target.value });
  }

  keyPress = e => {
    if (e.keyCode === 13) {
      this.sendComment();
    }
  };
  render() {
    let tip = this.buscarTip(this.props.match.params.id);

    if (this.props.tips.length > 0 && tip === null) {
      this.props.history.push("/NotFound");
    }

    if (tip === null) {
      return <div></div>;
    }
    return (
      <div className="container-fluid">
        <div className="row filaNombreTip">
          <div className="col-sm-1 text-left">
            <button
              className="btn btn-primary btnbackTip"
              onClick={this.clickBack}
            >
              Back
            </button>
          </div>
          <div className="col-sm-8 my-auto">
            <div className="lblNombreTip text-center">{tip.nombre}</div>
          </div>
          <div className="col-sm-3 text-left my-auto">
            <div className="lblnivelTip">Nivel {tip.nivel}</div>
          </div>
        </div>
        <div className="row filaDescTip">
          <div className="col-sm-9">
            <div className="lblDescTip">
              <span className="descTitleTip">Descripcion:</span>
              {tip.descripcion}
            </div>
          </div>
          <div className="col-sm-3 text-left my-auto">
            <button className="btn btn-outline-like" onClick={this.sendLike}>
              {tip.likes} <span className="fas fa-star"></span>
            </button>
          </div>
        </div>
        <div className="row filaTemaTip">
          <div className="col-sm-2 my-auto text-center">Tema:</div>
          <div className="col-sm-9 mx-auto text-center">
            <div className="temaTip">{tip.tema}</div>
          </div>
        </div> 
        <div className="row filaCodigoTip1">
          <div className="col-sm-6">
            <div className="codigolblTip">Codigo Correcto:</div>
            <form onSubmit={this.compliePython}>
              <div className='codigo' cols="80" rows="10">{tip.codigo_bien_p.split("\\n").map(linea => <span>{linea}</span>)}</div>
              <p id="compileBien" ></p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.compliePython(true,tip.codigo_bien_p)}
              ><i className="fas fa-dragon"></i> Compile</button>
            </form>
          </div>
          <div className="col-sm-6">
            <div className="codigolblTip">Codigo Incorrecto:</div>
            <div className='codigo' >{tip.codigo_mal_p.split("\\n").map(linea => <span contentEditable="true">{linea}</span>)}</div>
            <p id="compileMal" ></p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.compliePython(false,tip.codigo_mal_p)}
            ><i className="fas fa-dragon"></i> Compile</button>
          </div>
        </div>
        <div className="row filaBtnsTip text-center mx-auto">
          <div className="col-sm-12 text-center mx-auto">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="collapse"
              data-target="#collapseComentario"
              aria-expanded="false"
              aria-controls="collapseComentario"
            >
              Agregar Comentario
            </button>
          </div>
        </div>
        <div className="row">
          <div
            className="collapse col-sm-8 mx-auto text-center"
            id="collapseComentario"
          >
            <div className="row colComent mx-auto text-center">
              <textarea
                onKeyDown={this.keyPress}
                onChange={this.onChangeText.bind(this)}
                className="form-control rounded-0"
                value={this.state.comment}
                rows="4"
              ></textarea>
            </div>
            <div className="row text-center">
              <button
                className="btn btn-primary mx-auto"
                onClick={this.sendComment}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CupiTip);
