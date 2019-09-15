import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./CupiTip.css";
class CupiTip extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
    this.comentario = React.createRef();
    this.sendComment = this.sendComment.bind(this);
  }

  buscarTip(idActual) {
    let tips = this.props.tips;
    for (let i = 0; i < tips.length; i++) {
      if (tips[i]._id === idActual) {
        return tips[i];
      }
    }
    return null;
  }

  sendComment = () => {
    if (this.props.autenticado) {
      let req = {};
      req["_id"] = this.props.match.params.id;
      req.comentario = this.comentario.current.value;
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
      alert("Debes ingresar primero para poder enviar un like.");
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
      alert("Debes ingresar primero para poder enviar un like.");
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
          <div className="col-sm-2 text-left">
            <button className="btn btn-primary btnbackTip" onClick={this.clickBack}>
              Back
            </button>
          </div>
          <div className="col-sm-7 my-auto"><div className="lblNombreTip">{tip.nombre}</div></div>
          <div className="col-sm-3"></div>
        </div>
        <button className="btn btn-primary" onClick={this.sendLike}>
          Like
        </button>
        <h3> Nivel: {tip.nivel}</h3>
        <h3> #likes: {tip.likes}</h3>
        <h5>Tema: {tip.tema}</h5>
        <h6>Descripcion: {tip.descripcion}</h6>
        <h1>Codigo de Ejemplo</h1>
        <h2>Codigo correcto</h2>
        <div dangerouslySetInnerHTML={{ __html: tip.codigo_bien }} />
        <h2>Codigo correcto</h2>
        <div dangerouslySetInnerHTML={{ __html: tip.codigo_mal }} />
        <h1>Corrección, comentario o sugerencia:</h1>
        <div>
          <input type="text" placeholder="Comentario" ref={this.comentario} />
        </div>
        <button className="btn btn-primary" onClick={this.sendComment}>
          Enviar
        </button>
      </div>
    );
  }
}

export default withRouter(CupiTip);
