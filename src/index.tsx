import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import {configureStore} from "./configureStore";
import './commonStyles/styles.scss';
import App from "./app/containers/App";
import saga from './app/containers/saga';

const store = configureStore();
store.runSaga(saga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
