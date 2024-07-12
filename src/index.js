import React from "react";
import ReactDOM from "react-dom/client";
// import { App } from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/plugins/bootstrap/css/bootstrap.min.css";
//CSS & Bootstrap
import "./assets/css/style.css";

import "./assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/plugins/select2/css/select2.min.css";

//Font Awesome
import "./assets/plugins/fontawesome/css/fontawesome.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";

import App from "./App.js";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </AuthProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <Approuter/>,
// document.getElementById('root')
// );
