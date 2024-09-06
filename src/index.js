import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "./css/styles/reset.css";
import "./css/styles/main.css";
import "./css/styles/utils.scss";
import "./css/components/Header/header.scss";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
   </Provider>
);
