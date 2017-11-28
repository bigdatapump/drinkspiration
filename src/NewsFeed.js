import React, { Component } from 'react';
import './NewsFeed.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDz34nFHd2Z8weGVlY9izRzbSIcWvoInS8",
    authDomain: "drinking-buddy-1acb2.firebaseapp.com",
    databaseURL: "https://drinking-buddy-1acb2.firebaseio.com",
    projectId: "drinking-buddy-1acb2",
    storageBucket: "drinking-buddy-1acb2.appspot.com",
    messagingSenderId: "894370662410"
  };

firebase.initializeApp(config);

// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
function getMsgTimeSince(timestamp) {

    var now = Date.now();

    if (!(typeof(timestamp) === "number" && timestamp > 0 && timestamp <= now)) {
      return '';
    }

    var elapsed = now - timestamp;

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return '~ ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return '~ ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return '~ ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      ratingsQueue: []
    }
    firebase.database().ref('initialState').set(this.state);
  }

  componentDidMount() {
    const ratingsRef = firebase.database().ref("ratings");
    ratingsRef.on("child_added", data => {
      this.setState({ratingsQueue: this.state.ratingsQueue.concat(data.val())});
    });
  }

  handleSubmit(event) {
    const listRef = firebase.database().ref("ratings");
    const postRef = listRef.push();
    postRef.set({
      drink: "Vodka Gimlet",
      user: "User Name",
      vote: "like",
      timestamp: Date.now()
    })
    event.preventDefault()
  }

  render() {

    return (
      <div className="newsfeed">
        <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="submit" value="Vote" />
      </form>
      <div>
        {this.state.ratingsQueue.map( x=> {
          return (<div><h3>{x.user} {x.vote === 'like' ? 'likes' : 'dislikes'} {x.drink}</h3><span>{getMsgTimeSince(x.timestamp)}</span></div>);
        }).reverse().slice(0, 10)}
      </div>
      </div>
    );
  }
}

export default NewsFeed;
