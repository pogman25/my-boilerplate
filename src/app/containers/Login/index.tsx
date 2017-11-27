import * as React from 'react';
import { connect } from 'react-redux';
import { ILoginDispatch } from './interfaces';
import {authLogin} from './duck';

const styles = require('./styles');

const mapStoreToProps = (store: any) => ({

})

const mapDispatchToProps = (dispatch: Function): ILoginDispatch => ({
    authLogin: () => dispatch(authLogin())
})

class Login extends React.Component<any, any> {
    render() {
        const {authLogin} = this.props;
        return(
            <div className={styles.loginPage}>
                <div>
                    <p>Мой Яндекс Диск</p>
                </div>
                <div>
                    здесь будут картинки
                </div>
                <div>
                    <div
                        className={styles.authButton}
                        onClick={authLogin}
                    >Авторизоваться</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login);