import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";
// We'll create this soon
import App from "./app";

const Root = ({ store }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
);

export default Root;