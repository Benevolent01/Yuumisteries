import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers";

let store = configureStore({ reducer: mainReducer });

let main = async () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<App />} path="/"></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

main();
