import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'src/store/history';
import reducer from 'src/store/reducers';

export const isDev = process.env.NODE_ENV === 'development';
export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(): Store<unknown> {
  const middleware = [
    routerMiddleware(browserHistory),
    sagaMiddleware,
  ];

  const composeEnhancers = isDev ? composeWithDevTools({}) : compose;
  return composeEnhancers(applyMiddleware(...middleware))(createStore)(reducer);
}
