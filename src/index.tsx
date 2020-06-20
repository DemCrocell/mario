import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { browserHistory } from 'src/store/history';
import configureStore, { sagaMiddleware } from 'src/store/configureStore';
import sagas from 'src/store/sagas';
import App from 'src/routes';
import * as serviceWorker from 'src/serviceWorker';

import './index.css';

export const store = configureStore();
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
