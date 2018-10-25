import React from 'react';
import { Provider } from 'react-redux';
import GlobalRouter from './Router';
import store from './store';

export default () => (
  <Provider store={store}>
    <GlobalRouter />
  </Provider>
);
