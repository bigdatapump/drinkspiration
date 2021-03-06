import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewsFeed from './NewsFeed';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<NewsFeed />, document.getElementById('newsfeed-root'));
registerServiceWorker();
