import React from "react";
import AppContainer from "./appcontainer.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes.js";
import PrivateRoute from "./ProtectedRoute.jsx";
// import config from 'config';

const Layout = (props) => {
  const { component: LayoutComponent, routes, isPublic } = props;
  const paths = routes.map((x) => x.path);
  const layout = (
    <LayoutComponent
      children={routes.map((x) => (
        <Route key={x.path} {...x} />
      ))}
    />
  );

  return isPublic == true ? (
    <Route exact path={paths} children={layout} />
  ) : (
    <PrivateRoute exact path={paths} children={layout} />
  );
};

const AppRouter = (props) => {
  return (
    <Router basename="/">
      {/* <Route render={(props) => <AppContainer {...props} />} /> */}
      {routes?.map((route, index) => (
        <Layout key={index} {...route} />
      ))}
    </Router>
  );
};

export default AppRouter;
