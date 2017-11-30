import * as React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../App/duck';

const mapStoreToProps = (store: any) => ({
    
    });
    
    const mapDispatchToProps = (dispatch: Function) => ({
        logOut: () => dispatch(logOut())
    });

class Page extends React.Component<any, any>{
    render() {
        const {logOut} = this.props;
        return (
            <div>
                <button onClick={logOut}>Log Out</button>
                <h1>Вы внутри яндекс диска</h1>
                <a href="https://passport.yandex.ru/profile">Сменить профиль</a>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Page)