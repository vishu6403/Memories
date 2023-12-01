import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

//create store
//takes in reducers, compose function to apply middleware thunk
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  //provider keeps track of store which is that global state which allows us
  //to access that store from anywhere in app, need not be in child component or parent component
  
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
