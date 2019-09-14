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
      showFilters: false
    };
  }

  componentDidMount() {

    fetch("/tips")
      .then(res => res.json())
      .then(tips =>
        this.setState({
          tips: tips
        })
      );
      console.log("HMM");
  }

  renderNavBar() {
    return (
      <NavBar
        show={this.state.showFilters}
        hideFilter={this.hideFilter}
      />
    );
  }

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

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route
            exact
            path="/"
            render={props => <TipList tips={this.state.tips} showFilter={this.showFilter}/>}
          />
          <Route
            path="/Auth"
            render={props => <Auth /> }
          />
          <Route
            path="/cupitip/:id"
            render={props => <CupiTip tips={this.state.tips} hideFilter={this.hideFilter}/> }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
