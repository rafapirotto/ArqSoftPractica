import React from "react";
import { Redirect } from "react-router-dom";
import { func } from "prop-types";

import { DASHBOARD_ROUTE } from "../../../routes";
import { getUserDataFromLocalStorage } from "../../../utils";

const PublicRoute = ({ Component }) => {
    const isAuthenticated = getUserDataFromLocalStorage().token;

    return isAuthenticated ? (
        <Redirect to={{ pathname: DASHBOARD_ROUTE }} />
    ) : (
        <Component />
    );
};

PublicRoute.propTypes = {
    Component: func.isRequired,
};

export default PublicRoute;
