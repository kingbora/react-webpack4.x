import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Login from './container/Login';
import configureStore from './store/configureStore';

const store = configureStore();

const MOUNT_NODE = document.getElementById("root");
const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        MOUNT_NODE
    );
};

render(Login);

if ((module as any).hot) {
    (module as any).hot.accept('./container/Login', () => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
            const NextRootContainer = require('./container/Login').default;
            render(NextRootContainer);
        });
    });
}