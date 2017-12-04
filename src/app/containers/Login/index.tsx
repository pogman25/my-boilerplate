import * as React from 'react';
import { connect } from 'react-redux';
import { ILoginDispatch, ILoginMapState } from './interfaces';
import { logIn } from '../App/duck';
import { IStore } from '../../../reducers/interfaces';
import {RouteProps} from 'react-router';
import { Redirect } from 'react-router-dom';

const styles = require('./styles');

const mapStoreToProps = (store: IStore): ILoginMapState => ({

});

const mapDispatchToProps = (dispatch: Function): ILoginDispatch => ({
    authLogin: (token: string) => dispatch(logIn(token))
});

type ILogin = ILoginMapState & ILoginDispatch & RouteProps;

class Login extends React.Component<ILogin, any> {

    render() {
        const {location: {hash}, authLogin} = this.props;
        if(/access_token=([^&]+)/.test(hash)) {
            const token = /access_token=([^&]+)/.exec(hash)[1];
            authLogin(token);
            return (
                <Redirect
                    to='/'
                />
            )
        } else {
            return(
                <div className={styles.loginPage}>
                    <div className={styles.mainPic}>
                        <div>
                            <p>Мой Яндекс Диск</p>
                        </div>
                        <div>
                            <a
                                className={styles.authButton}
                                href='https://oauth.yandex.ru/authorize?response_type=token&client_id=443eadf72ce14612a901a68f83588c90'
                            >Авторизоваться</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login);