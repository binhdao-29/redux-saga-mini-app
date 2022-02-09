import { all } from '@redux-saga/core/effects';
import authSaga from 'features/auth/authSaga';

export default function* rootSaga() {
  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
  yield all([authSaga()]);
}
