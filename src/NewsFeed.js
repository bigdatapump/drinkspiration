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
      myVal: 10,
      value: 'say something...',
      messageQueue: []
    }
    firebase.database().ref('initialState').set(this.state);
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('myVal');
    rootRef.on('value', snapshot => {
      console.log(snapshot.val())
      this.setState({myVal: snapshot.val()})
    })

    const messagesRef = firebase.database().ref("messages");
    messagesRef.on("child_added", data => {
      this.setState({messageQueue: this.state.messageQueue.concat(data.val())});
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const listRef = firebase.database().ref("messages");
    const postRef = listRef.push();
    postRef.set({
      commenter: "me",
      message: this.state.value
    })
    event.preventDefault()
  }



  render() {

    return (
      <div className="App">
        <h1>{this.state.myVal}</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {this.state.messageQueue.map( x=> {
          return (<h2>{x.message}</h2>);
        })}
      </div>
      </div>
    );
  }
}

export default App;
