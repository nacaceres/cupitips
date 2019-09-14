import React from "react";
import TipList from "./TipList/TipList.js";
import NavBar from "./NavBar/NavBar.js";
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
          tips: tips,
          showFilters: true
        })
      );
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

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route
            exact
            path="/"
            render={props => <TipList tips={this.state.tips} />}
          />
          <Route
            path="/cupitip/:id"
            render={props => <NavBar tips={this.state.tips} />}
          />


        </Switch>
      </div>
    );
  }
}

export default App;
