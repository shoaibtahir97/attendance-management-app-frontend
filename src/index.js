import React from "react";
import ReactDOM from "react-dom/client";
// import { App } from "./app";

// Redux
import { Provider } from "react-redux";
import store from "./store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/plugins/bootstrap/css/bootstrap.min.css";
//CSS & Bootstrap
import "./assets/css/style.css";

import "./assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/plugins/select2/css/select2.min.css";

//Font Awesome
import "./assets/plugins/fontawesome/css/fontawesome.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";

import Approuter from "./approuter.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Approuter />
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <Approuter/>,
// document.getElementById('root')
// );
