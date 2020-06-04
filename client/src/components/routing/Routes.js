import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateLead from "../lead-form/CreateLead";
import CheckIn from "../checkin-feedback/CheckIn";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Leads from "../leads/Leads";
import Lead from "../lead/Lead";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-lead" component={CreateLead} />
        <PrivateRoute exact path="/leads-log" component={Leads} />
        <PrivateRoute exact path="/leads-log/:id" component={Lead} />
        <PrivateRoute exact path="/checkin-feedback" component={CheckIn} />
      </Switch>
    </section>
  );
};

export default Routes;
