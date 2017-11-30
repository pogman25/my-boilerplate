import * as React from 'react';
import { connect } from 'react-redux';
import { ILoginDispatch } from './interfaces';
import {authLogin} from './duck';

const styles = require('./styles');

const mapStoreToProps = (store: any) => ({

});

const mapDispatchToProps = (dispatch: Function): ILoginDispatch => ({
    authLogin: () => dispatch(authLogin())
});

class Login extends React.Component<any, any> {
    render() {
        return(
            <div className={styles.loginPage}>
                <div>
                    <p>Мой Яндекс Диск</p>
                </div>
                <div>
                    здесь будут картинки
                </div>
                <div>
                    <a
                        className={styles.authButton}
                        href='https://oauth.yandex.ru/authorize?response_type=token&client_id=443eadf72ce14612a901a68f83588c90'
                    >Авторизоваться</a>
                </div>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login);