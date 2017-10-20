import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css';
import './styles.css';
import App from './App'

// Register Service worker
// https://justmarkup.com/log/2017/02/implementing-push-notifications/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: '/' });
} else {
    console.warn('Not supported by browser');
}

ReactDOM.render(<App/>, document.getElementById('root'));