import { useLocation, useRoutes } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout.t";
import Login from "../components/pages/Authentication";

const routes = [
  {
    layout: AuthLayout,
    routes: [
      {
        name: "login",
        title: "login page",
        component: Login,
        path: "/login",
        isPublic: true,
      },
    ],
  },
];
