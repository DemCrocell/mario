import { all, spawn } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import callApi from './callApi';

export default function* rootSaga(): SagaIterator {
  yield all([spawn(callApi)]);
}
