/**
 * Created by wenbo.kuang on 2018/9/5
 */
import { createAction } from 'redux-actions';
import {LOGIN, LOGIN_ERROR, LOGIN_FAILED, LOGIN_SUCCEED} from "./constants";

export const login = createAction<any>(LOGIN);
export const loginSucceed = createAction(LOGIN_SUCCEED);
export const loginFailed = createAction<any>(LOGIN_FAILED);
export const loginError = createAction<any>(LOGIN_ERROR);