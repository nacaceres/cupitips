import React from "react";

import Tweet from "./Tweet.js";

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      tweets:[]
    }
  }

  componentDidMount() {
    fetch("/data")
      .then(res => res.json())
      .then ( tweets => this.setState({
        tweets: tweets
      }));
  }
  renderTweets (){
     return this.state.tweets.map( t => <Tweet tweet={t}></Tweet>)
  };
  render(){
    return(
      <div className="row">
        <div className="col-8">
         <h2> Tweets </h2>
         {this.renderTweets()}
        </div>
        <div className="col-4">
          <h2> Controls </h2>
        </div>
      </div>
    );
  };
}

export default App;