//@flow
import React from "react";
import { render } from "react-dom";
import App from "./components/app";

let el = document.getElementById("root");
if (el) render(<App />, el);

