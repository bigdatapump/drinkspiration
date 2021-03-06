import React, { Component } from 'react';
import './NewsFeed.css';
import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDz34nFHd2Z8weGVlY9izRzbSIcWvoInS8',
  authDomain: 'drinking-buddy-1acb2.firebaseapp.com',
  databaseURL: 'https://drinking-buddy-1acb2.firebaseio.com',
  projectId: 'drinking-buddy-1acb2',
  storageBucket: 'drinking-buddy-1acb2.appspot.com',
  messagingSenderId: '894370662410'
};

firebase.initializeApp(config);

// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
function getMsgTimeSince(timestamp) {

  if (timestamp == null) {
    return '';
  }
  else {
    const elapsed = Date.now() - timestamp;

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    if (elapsed < msPerMinute) {
      return 'a few seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return '~ ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return '~ ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return '~ ' + Math.round(elapsed / msPerYear) + ' years ago';
    }

  }

}

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      ratingsQueue: []
    };
    firebase.database().ref('initialState').set(this.state);
  }

  componentDidMount() {
    const ratingsRef = firebase.database().ref('ratings');
    ratingsRef.on('child_added', data => {
      this.setState({ ratingsQueue: this.state.ratingsQueue.concat(data.val()) });
    });
  }

  render() {

    return (
      <div className='newsfeed'>
        <h4>News</h4>
        <div>

          {this.state.ratingsQueue.map(x => {
            return (
              <div>
                <div className='panel'>
                  <span>{x.user} {x.vote === 'like' ? 'likes' : 'dislikes'} {x.drink}</span>
                  <div style={{ margin: '1px' }}><span style={{ fontSize: '0.6em' }}><i className='icon icon-back-in-time' />  {getMsgTimeSince(x.timestamp)}</span></div>
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
