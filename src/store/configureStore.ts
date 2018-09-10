/**
 * Created by wenbo.kuang on 2018/9/5
 */
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import sagas from './sagas';

const isDebug = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const devTools = (window as any).devToolsExtension || (() => (noop: any) => noop);

export default function configureStore() {
    const middleWares = [
        sagaMiddleware,
        routerMiddleware(createHistory())
    ];

    const enhancers = isDebug ? [
        applyMiddleware(...middleWares),
        devTools()
    ] : [applyMiddleware(...middleWares)];

    const store = createStore(
        createReducer(),
        compose(...enhancers)
    );

    sagaMiddleware.run(sagas);

    if (isDebug && (module as any).hot) {
        (module as any).hot.accept("./reducers", () => {
            const createReducers = require("./reducers").default;
            const nextReducers = createReducers();
            store.replaceReducer(nextReducers);
        });
    }

    return store;
}