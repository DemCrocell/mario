import { call, put, takeEvery } from '@redux-saga/core/effects';
import { SagaIterator } from '@redux-saga/types';
import {
  CALL_API,
  BAD_REQURST,
  UNAUTHORIZED,
} from 'src/constants/api';
import callApi, { IAPIConfig } from 'src/api/callApi';

interface IActionData<T> {
  type: string;
  payload: T;
  request: string;
  success: string;
  failure: string;
}

interface IData extends IAPIConfig {
  successMessage?: string;
}

function* callApiSaga(action: IActionData<IData>): SagaIterator {
  const { successMessage, ...options } = action.payload;
  try {
    yield put({ type: action.request });
    const response = yield call(callApi, options);
    yield put({ type: action.success, payload: response.data });
    if (successMessage) {
      // eslint-disable-next-line no-console
      console.assert(successMessage);
    }
  } catch (error) {
    const errorResponse = error.response;
    yield put({ type: action.failure, payload: errorResponse });
    if (errorResponse?.status) {
      switch (errorResponse.status) {
        case UNAUTHORIZED:
          throw new Error(`Error: ${UNAUTHORIZED}`);
        case BAD_REQURST:
          throw new Error(`Error: ${BAD_REQURST}`);
        default:
          break;
      }
    }
  }
}

export default function* sagaUser(): SagaIterator {
  yield takeEvery(CALL_API, callApiSaga);
}
