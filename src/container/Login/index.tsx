import * as React from 'react';
import {connect} from "react-redux";
import {login} from "./action";
import style from './style.scss';

interface LoginOwnProps {

}

interface LoginStateProps {
    loginMsg?: any;
}

interface LoginDispatchProps {
    login?: Function;
}

interface LoginState {

}

@(connect(
    (state: any) => (
        {
            loginMsg: state.loginReducer.loginMsg
        }
    ),
    (dispatch: any) => (
        {
            login: (param: any) => {
                dispatch(login(param));
            }
        }
    )
) as any)
export default class Login extends React.Component<LoginOwnProps & LoginStateProps & LoginDispatchProps, LoginState> {
    constructor(props: LoginOwnProps & LoginStateProps & LoginDispatchProps) {
        super(props);
    }

    render() {
        return (
            <div className={style.color}>123</div>
        )
    }
}