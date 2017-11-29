import * as React from 'react';
import { connect } from "react-redux";
import { Route, Redirect, Switch } from 'react-router-dom';
import { getIsLogged } from './selectors';

import Login from '../Login';
import Page from '../Page';

const styles = require('./styles.scss');

const mapStoreToProps = (store: any) => ({
    isLogged: getIsLogged(store)
})

const PublicRoute = ({ component: Component, permited, ...rest }) => (
    <Route {...rest} render={props => (
        permited ? (
            <Component {...props}/>
        ) : (
            <Redirect to='/'/>
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
                    path="/"
                    exact
                    component={Page}
                />
                <PublicRoute
                    permited={!isLogged}
                    path="/login"
                    component={Login}
                />
                <Redirect
                    path="*"
                    to="/"
                    />
            </Switch>
        </div>
        )
    }
}

export default connect(mapStoreToProps)(App);