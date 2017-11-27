import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import {configureStore} from "./configureStore";
import './commonStyles/styles';
import {App} from "./app/containers/App";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
