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

  componentDidMount() {

  }

  click = () => {
    this.props.history.push("/");
  }

  findTip = (idActual) =>{
    let tips = this.props.tips;
    for (let i=0; i < tips.length; i++)
    {
      if(tips[i]._id === idActual)
      {
        return tips[i];
      }
    }
  }

  clickBack =() => {
    this.props.history.push("/");
  }

  sendComment = () => {
    let req = {};
    req["_id"]= this.props.match.params.id;
    req.comentario = this.comentario.current.value;
    console.log(JSON.stringify(req));
    fetch("comment", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(resp => {
        if(resp.result.n > 0){
          alert("Tu comentario ha sido enviado correctamente.");
        }
        else{
          alert("Ha ocurrido un error y tu comentario no pudo ser enviado.");
        }
      });
  }
  sendLike = () =>
  {
    let req = {};
    req["_id"]= this.props.match.params.id;
    console.log(JSON.stringify(req));
    fetch("like", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(resp => {
        if(resp.result.n > 0){
          this.props.actualizarTips();
        }
        else{
          alert("Ha ocurrido un error y tu like no pudo ser enviado.");
        }
      });
  }

  render() {
    let tip = this.findTip(this.props.match.params.id);
    if(tip!= null)
    {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.clickBack}>Back</button>
          <button className="btn btn-primary" onClick={this.sendLike}>Like</button>
          <h2> {tip.nombre} </h2>
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
          <button className="btn btn-primary" onClick={this.sendComment}>Enviar</button>
        </div>
      );
    }
    else
    {
      return(<div></div>);
    }
  }
}

export default withRouter(CupiTip);
