import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./sass/style.css"
import {App} from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
)