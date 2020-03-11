// Saga
import { all } from 'redux-saga/effects';
// Sagas
import cardsSaga from './cardsSaga';


function* rootSaga() {
  yield all([
      cardsSaga(),
  ])
}

export default rootSaga;
