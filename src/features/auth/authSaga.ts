import { fork, take, delay, call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { LoginContants } from 'constants/login-contants';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem(LoginContants.ACCESS_TOKEN, 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Binh',
      })
    );

    yield put(push('/admin'));
  } catch (error) {
    yield put(authActions.loginFailed('Login failed.'));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem(LoginContants.ACCESS_TOKEN);
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem(LoginContants.ACCESS_TOKEN));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
