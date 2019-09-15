import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./Auth.css";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.props.hideFilter();
    this.usuario = React.createRef();
    this.clickLogin = this.clickLogin.bind(this);
  }


  componentDidMount() {
    console.log("Auth");
  }

  clickBack =() => {
    this.props.history.push("/");
  };
  clickLogin = () => {
    let req = {};
    req.username = this.usuario.current.value;
    console.log(req);
    fetch("auth", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(resp => {
        if(resp.length>0){
          this.props.handleAuthentication(true,resp[0].username);
          this.clickBack();
        }
        else{
          alert("Usuario no registrado");
        }
      });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <br></br>
        <label><b>Username</b></label>
        <div>
          <input type="text" placeholder="Usuario" ref={this.usuario} />
        </div>
        <div className="btn btn-primary" onClick={this.clickLogin}>Login</div>
        <div className="btn btn-primary" onClick={this.clickBack}>Cancelar</div>
      </div>
    );
  }
}

export default withRouter(Auth);
