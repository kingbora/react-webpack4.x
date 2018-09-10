/**
 * Created by wenbo.kuang on 2018/9/5
 */
import { call, put, takeEvery } from "redux-saga/effects";
import {Action} from "redux-actions";
import http from '../../utils/http';
import * as config from '../../config';
import {loginError, loginFailed, loginSucceed} from "./action";
import {LOGIN} from "./constants";

function* login(action: Action<any>) {
    try {
        const url = `${config.APIConfig.path}/token/access`;
        const request = http.getRequest(url, 'POST', action.payload);

        const response = (yield call(http.send, request)) as Response;

        if (response.ok) {
            yield put(loginSucceed())
        } else {
            const json = yield response.json();
            yield put(loginFailed(json));
        }
    } catch (e) {
        yield put(loginError(e));
    }
}

export default function* loginSaga() {
    yield takeEvery(LOGIN, login);
}