import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./Auth.css";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
    this.usuario = React.createRef();
    this.clickLogin = this.clickLogin.bind(this);
    this.state = {
      usr: ""
    };
  }

  clickBack = () => {
    if(this.props.location.oldcreatestate !== undefined){
      this.props.history.push({
        pathname:"/createtip",
        oldcreatestate: this.props.location.oldcreatestate
      });
    }else{
      this.props.history.goBack();
    }
  };

  clickLogin = () => {
    let req = {};
    req.username = this.usuario.current.value;
    fetch("auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.length > 0) {
          this.props.handleAuthentication(true, resp[0].username);
          this.clickBack();
        } else {
          alert("Usuario no registrado");
        }
      });
  };

  handleChange(e) {
    this.setState({ usr: e.target.value });
  }

  keyPress = (e) => {
    if (e.keyCode === 13) {
      this.clickLogin();
    }
  }

  render() {
    return (
      <div className="container contauth">
        <div className="row text-center">
          <div className="col-sm-12 usrlbl">Usuario</div>
        </div>
        <div className="row text-center">
          <div className="col-sm-6 inusr mx-auto">
            <input type="text" value={this.state.usr} placeholder="Usuario" onKeyDown={this.keyPress} onChange={this.handleChange.bind(this)} ref={this.usuario} />
          </div>
        </div>
        <div className="row text-center">
          <div className="col-sm-6 text-right">
            <button className="btn btn-primary" onClick={this.clickLogin}>
              Login
            </button>
          </div>
          <div className="col-sm-6 text-left">
            <button className="btn btn-primary" onClick={this.clickBack}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Auth);
