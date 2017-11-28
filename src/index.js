import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

// Initialize Firebase

/*
var config = {
    apiKey: 'AIzaSyDORY1FqIyxJUw90VqMdVRsFmPYDTicZLY',
    authDomain: 'drinkspiration-app.firebaseapp.com',
    databaseURL: 'https://drinkspiration-app.firebaseio.com',
    projectId: 'drinkspiration-app',
    storageBucket: '',
    messagingSenderId: '181837525563'
  };
*/

var config = {
    apiKey: 'AIzaSyDz34nFHd2Z8weGVlY9izRzbSIcWvoInS8',
    authDomain: 'drinking-buddy-1acb2.firebaseapp.com',
    databaseURL: 'https://drinking-buddy-1acb2.firebaseio.com',
    projectId: 'drinking-buddy-1acb2',
    storageBucket: 'drinking-buddy-1acb2.appspot.com',
    messagingSenderId: '894370662410'
  };

firebase.initializeApp(config);


fetch(document.location.origin+'/.auth/me').then(
    (resp) => {
        resp.json().then( (value) => {
            let username = value[0].user_id.split('@')[0].split('.').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
            ReactDOM.render(<App user={username}/>, document.getElementById('root'));
            }
        );        
    }
).catch(
    () => {
        ReactDOM.render(<App user='user name'/>, document.getElementById('root'));
    }
);

registerServiceWorker();
