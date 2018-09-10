/**
 * Created by wenbo.kuang on 2018/9/5
 */
import { handleActions, Action } from "redux-actions";
import {LOGIN, LOGIN_ERROR, LOGIN_FAILED, LOGIN_SUCCEED} from "./constants";

export const loginReducer = handleActions({
    [LOGIN]: (state: any, action: Action<any>) => {
        return Object.assign({}, state, {
            loginMsg: {
                status: 'login'
            }
        });
    },
    [LOGIN_SUCCEED]: (state: any, action: Action<any>) => {
        return Object.assign({}, state, {
            loginMsg: {
                status: 'succeed'
            }
        });
    },
    [LOGIN_FAILED]: (state: any, action: Action<any>) => {
        return Object.assign({}, state, {
            loginMsg: {
                status: 'failed',
                msg: action.payload
            }
        });
    },
    [LOGIN_ERROR]: (state: any, action: Action<any>) => {
        return Object.assign({}, state, {
            loginMsg: {
                status: 'error',
                msg: action.payload
            }
        });
    }
}, {
    loginMsg: {
        status: 'wait',
        msg: null
    }
});