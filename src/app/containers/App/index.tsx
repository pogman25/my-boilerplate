import * as React from 'react';
//import { connect } from "react-redux";
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from '../Login'

const styles = require('./styles.scss');

const PublicRoute = ({ component: Component, permited, ...rest }) => (
    <Route {...rest} render={props => (
        permited ? (
            <Component {...props}/>
        ) : (
            <Redirect to='/disk'/>
        )
    )}/>
);

// const PrivateRoute = ({ component: Component, permited, ...rest }) => (
//     <Route {...rest} render={props => (
//             permited ? (
//                 <Component {...props}/>
//             ) : (
//                 <Redirect to='/users'/>
//             )
//         )
//     }/>
// );

export class App extends React.Component<any, any> {
    render() {
        return (
        <div className={styles.main}>
            <Switch>
                <PublicRoute
                    permited={true}
                    path="/login"
                    component={Login}
                />
                <Redirect
                        path="*"
                        to="/login"
                    />
            </Switch>
        </div>
        )
    }
}
