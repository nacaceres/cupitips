import React,{Component} from "react"

import "./Tweet.css";

class Tweet extends Component {
  constructor(props){
    super(props);

    this.state = {
      votes: 0
    }
  }

  onVote() {
    this.setState({
      votes: this.state.votes+1
    });
  }

  render() {
    return( <div className="tweet">
      {this.props.tweet.text}
      <label htmlFor="btnVote">
        <button  onClick = {this.onVote.bind(this)} id="btnVote" className ="btn btn-primary">
          Vote {" "}
          <span role="img" araia-label="thumbs up">
            👍
          </span>
        </button>
        <span> Votes: <span id="spVoteValue">{this.state.votes}</span></span>
      </label>
    </div>
    );
  }
}

export default Tweet;