import React from "react";
import { Redirect } from "react-router-dom";
import { any, bool } from "prop-types";

import { LOGIN_ROUTE, DASHBOARD_ROUTE } from "../../../routes";
import { getUserDataFromLocalStorage } from "../../../utils";
import { ADMIN } from "./strings";

const PrivateRoute = ({ Component, adminOnly }) => {
    const { token, role } = getUserDataFromLocalStorage();
    const isAuthenticated = token; //   idea para hacerlo bien: hacer un endpoint para validar el token
    const hasPermission = role === ADMIN;

    if (!isAuthenticated) return <Redirect to={{ pathname: LOGIN_ROUTE }} />;
    if (!adminOnly) return <Component />;

    return hasPermission ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: DASHBOARD_ROUTE }} />
    );
};

PrivateRoute.propTypes = {
    Component: any.isRequired,
    adminOnly: bool,
};

PrivateRoute.defaultProps = {
    adminOnly: false,
};

export default PrivateRoute;
