import React from "react";
import TipList from "./TipList/TipList.js";
import NavBar from "./NavBar/NavBar.js";
import CupiTip from "./CupiTip/CupiTip.js";
import Auth from "./Auth/Auth.js";
import { Switch, Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
      filtros: [],
      tipsFiltrados: [],
      showFilters: false,
      autenticado: false,
      username:  undefined
    };
  }

  componentDidMount() {
    fetch("/tips")
      .then(res => res.json())
      .then(tips => {
        let filtros = {
          nivel: [],
          nombre: "",
          likes: 0,
          tema: ""
        };
        for (let i = 0; i < tips.length; i++) {
          let encontrado = false;
          for (let j = 0; j < filtros.nivel.length; j++) {
            if (filtros.nivel[j].nombre === tips[i].nivel) {
              encontrado = true;
            }
          }
          if (!encontrado) {
            filtros.nivel.push({ nombre: tips[i].nivel, estado: false });
          }
        }
        this.setState({
          tips: tips,
          filtros: filtros,
          tipsFiltrados: tips
        });
      });
  }

  renderNavBar() {
    return (
      <NavBar
        show={this.state.showFilters}
        filtros={this.state.filtros}
        actualizarFiltros={this.actualizarFiltros}
        hideFilter={this.hideFilter}
        autenticado={this.state.autenticado}
        username={this.state.username}
        handleAuthentication={this.handleAuthentication}
      />
    );
  }

  actualizarFiltros = nuevosFiltros => {
    let tipsFiltrados = [];
    let todosOff = true;
    for(let i = 0; i < nuevosFiltros.nivel.length;i++){
      if(nuevosFiltros.nivel[i].estado === true){
        todosOff = false;
      }
    }
    for (let i = 0; i < this.state.tips.length; i++) {
      let aceptado = true;
      for (let j = 0; j < nuevosFiltros.nivel.length; j++) {
        if (!todosOff && nuevosFiltros.nivel[j].nombre === this.state.tips[i].nivel) {
          aceptado = nuevosFiltros.nivel[j].estado;
        }
      }
      if (
        nuevosFiltros.nombre !== "" &&
        this.state.tips[i].nombre.indexOf(nuevosFiltros.nombre) === -1
      ) {
        //Si no esta en el filtro de nombre
        aceptado = false;
      }
      if (
        nuevosFiltros.tema !== "" &&
        this.state.tips[i].tema.indexOf(nuevosFiltros.tema) === -1
      ) {
        //Si no esta en el filtro de tema
        aceptado = false;
      }
      if (this.state.tips[i].likes < nuevosFiltros.likes) {
        aceptado = false;
      }
      if (aceptado) {
        tipsFiltrados.push(this.state.tips[i]);
      }
    }
    this.setState({
      filtros: nuevosFiltros,
      tipsFiltrados: tipsFiltrados
    });
  };

  hideFilter = () => {
    this.setState({
      showFilters: false
    });
  };

  showFilter = () => {
    this.setState({
      showFilters: true
    });
  };

  handleAuthentication = (auth, user ) => {
    this.setState({ autenticado: auth });
    this.setState({ username: user });
  }

  actualizarTips=() =>{
    fetch("/tips")
      .then(res => res.json())
      .then(tips => {
        this.setState({
          tips: tips
        });
        this.actualizarFiltros(this.state.filtros);
      });
  }

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <TipList
                tips={this.state.tipsFiltrados}
                showFilter={this.showFilter}
              />
            )}
          />
          <Route
            path="/Auth"
            render={props => <Auth hideFilter={this.hideFilter} handleAuthentication={this.handleAuthentication}/>}
          />
          <Route
            path="/cupitip/:id"
            render={props => (
              <CupiTip
                tips={this.state.tips}
                hideFilter={this.hideFilter}
                actualizarTips = {this.actualizarTips}
                autenticado = {this.autenticado}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
