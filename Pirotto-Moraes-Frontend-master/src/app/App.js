import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import {
    LOGIN_ROUTE,
    SIGN_UP_ROUTE,
    DASHBOARD_ROUTE,
    SIGN_UP_BY_INVITATION_ROUTE,
} from "./routes";
import Dashboard from "./Components/Dashboard";
import SignUpByInvitation from "./Components/SignUpByInvitation";
import PrivateRoute from "../app/common/Components/PrivateRoute";
import PublicRoute from "../app/common/Components/PublicRoute";

const App = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute Component={Login} exact path={LOGIN_ROUTE} />
            <PublicRoute Component={SignUp} exact path={SIGN_UP_ROUTE} />
            <PublicRoute
                Component={SignUpByInvitation}
                exact
                path={SIGN_UP_BY_INVITATION_ROUTE}
            />
            <PrivateRoute Component={Dashboard} path={DASHBOARD_ROUTE} />
            <Redirect from="*" to={LOGIN_ROUTE} />
        </Switch>
    </BrowserRouter>
);

export default App;
