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
    })
    event.preventDefault()
  }

  render() {

    return (
      <div className="newsfeed">
        <h4>News</h4>
        {/*<form onSubmit={this.handleSubmit.bind(this)}>
        <input type="submit" value="Vote" />
      </form>*/}
      <div>

        {this.state.ratingsQueue.map( x=> {
          return (
            <div>
            <div className='panel'>
            <span>{x.user} {x.vote === 'like' ? 'likes' : 'dislikes'} {x.drink}</span>
            <div style={{margin:'1px'}}><span style={{fontSize: "0.6em"}}>4 min ago</span></div>
            </div>
            </div>
          );
        }).reverse().slice(0, 10)}
      </div>
      </div>
    );
  }
}

export default NewsFeed;
