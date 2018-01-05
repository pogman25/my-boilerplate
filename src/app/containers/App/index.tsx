import * as React from 'react';
import { connect } from "react-redux";
import { Route, Redirect, Switch } from 'react-router-dom';
import { getIsLogged } from './selectors';

import Login from '../Login';
import Page from '../Page';
import Temp from '../../../modules/temp/containers/Temp'

const styles = require('./styles.scss');

const mapStoreToProps = (store: any) => ({
    isLogged: getIsLogged(store)
})

const PublicRoute = ({ component: Component, permited, ...rest }) => (
    <Route {...rest} render={props => (
        permited ? (
            <Component {...props}/>
        ) : (
            <Redirect to='/disk'/>
        )
    )}/>
);

const PrivateRoute = ({ component: Component, permited, ...rest }) => (
    <Route {...rest} render={props => (
            permited ? (
                <Component {...props}/>
            ) : (
                <Redirect to='/login'/>
            )
        )
    }/>
);

class App extends React.Component<any, any> {
    render() {
        const { isLogged } = this.props;
        return (
        <div className={styles.main}>
            <Switch>
                <PrivateRoute
                    permited={isLogged}
                    path="/disk"
                    component={Page}
                />
                <PrivateRoute
                    permited={true}
                    path="/templ"
                    component={Temp}
                />
                <PublicRoute
                    permited={!isLogged}
                    path="/login"
                    component={Login}
                />
                <Redirect
                    path="*"
                    to="/disk"
                    />
            </Switch>
        </div>
        )
    }
}

export default connect(mapStoreToProps)(App);