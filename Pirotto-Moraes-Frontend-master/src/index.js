import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { SnackbarProvider } from "notistack";

import App from "./app/App";
import rootReducer from "./app/rootReducer";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </Provider>,
    rootElement
);
