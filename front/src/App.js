import React from "react";
import TipList from "./TipList/TipList.js";
import NavBar from "./NavBar/NavBar.js";

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
      ></NavBar>
    );
  }

  hideFilter = () => {
    this.setState({
      showFilters: false
    });
  };

  renderList() {
    return <TipList tips={this.state.tips}></TipList>;
  }
  render() {
    return (
      <div>
        <div className="row">{this.renderNavBar()}</div>
        {this.renderList()}
      </div>
    );
  }
}

export default App;
