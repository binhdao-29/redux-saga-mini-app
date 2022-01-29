import { takeEvery, delay, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from 'features/counter/counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log("waiting 2s");

  yield delay(2000);

  console.log("done, dispatch action");

  yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
  console.log('counter saga');

  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}