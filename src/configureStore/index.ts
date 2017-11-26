import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";

const thunk = require("redux-thunk").default;
const logger = createLogger({
    collapsed: true
});

export const configureStore = () => {
    return process.env.NODE_ENV === "development" ?
            createStore(
                rootReducer,
                compose(
                    applyMiddleware(thunk, logger),
                    (window as any)["devToolsExtension"] ? (window as any)["devToolsExtension"]() : (f: Function) => f
                )
            )
            :
            createStore(
                rootReducer,
                compose(
                    applyMiddleware(thunk)
                )
            )
};
