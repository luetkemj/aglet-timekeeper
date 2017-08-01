import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createLogger } from 'redux-logger';
import App from './app.container';
import reducer from './reducers';

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  diff: true,
});
const store = createStore(reducer, applyMiddleware(logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
