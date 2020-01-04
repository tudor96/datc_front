/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import AuthLayout from "layouts/AuthLayout";
import UserProfile from "UserProfile.js"
import history from './history';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      {UserProfile.getAuth() !== null ?  <Route path="/admin" render={props => <Admin {...props} />} /> : null}
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      {UserProfile.getAuth() !== null ? null : <Redirect from="/admin/index" to="/auth/login" />}
      {UserProfile.getAuth() !== null ? <Redirect from="/" to="/admin/index" /> : <Redirect from="/" to="/auth/login" />}

      {/* <Route path="/admin" component={Admin} />
      <Route path="/login" component={LoginPage} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/login" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
