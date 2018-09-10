/**
 * Created by wenbo.kuang on 2018/9/5
 */
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import {loginReducer} from "../container/Login/reducer";

export default function createReducer(asyncReducers?: any) {
    return combineReducers({
        routerReducer,
        loginReducer,
        ...asyncReducers
    });
}