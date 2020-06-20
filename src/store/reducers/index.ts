import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { MapDispatchToProps } from 'react-redux';
import { browserHistory } from 'src/store/history';

const reducer = combineReducers<unknown>({
  router: connectRouter(browserHistory),
});

export default (state: any, action: MapDispatchToProps<any, any>): any =>
  reducer(state, action);
