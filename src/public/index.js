import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<SignIn />, document.getElementById('signIn'));
ReactDOM.render(<SignUp />, document.getElementById('signUp'));
