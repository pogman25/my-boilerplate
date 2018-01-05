import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from 'redux-saga';

const thunk = require("redux-thunk").default;
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
    collapsed: true
});

export const configureStore = () => {
    const store = process.env.NODE_ENV === "development" ?
            createStore(
                rootReducer,
                compose(
                    applyMiddleware(thunk, sagaMiddleware, logger),
                    (window as any)["devToolsExtension"] ? (window as any)["devToolsExtension"]() : (f: Function) => f
                )
            )
            :
            createStore(
                rootReducer,
                compose(
                    applyMiddleware(sagaMiddleware)
                )
            )

    return {
        ...store,
        runSaga: sagaMiddleware.run,
        injectedSagas: {},
        close: () => store.dispatch(END)
    };
};
