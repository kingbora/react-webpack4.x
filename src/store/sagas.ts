/**
 * Created by wenbo.kuang on 2018/9/5
 */
import { all, fork } from "redux-saga/effects";
import loginSaga from "../container/Login/saga";

export default function* rootSagas() {
    yield all([
        fork(loginSaga)
    ])
}