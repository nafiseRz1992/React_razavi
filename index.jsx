import React from "react";
import ReactDOM from "react-dom";
import "./server";
import App from "./components/App";
import { makeServer } from "./server"
import './assets/styles/styles.css';

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
