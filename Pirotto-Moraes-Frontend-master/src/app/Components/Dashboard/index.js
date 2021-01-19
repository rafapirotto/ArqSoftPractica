import React from "react";
import { Switch, Redirect } from "react-router-dom";

import PrivateRoute from "../../common/Components/PrivateRoute";
import DrawerMenu from "../../common/Components/DrawerMenu";
import CreateInvitation from "../CreateInvitation";
import DetailedError from "../DetailedError";
import ErrorList from "../ErrorList";
import ApiKey from "../ApiKey";
import GeneralReport from "../Reports/GeneralReport";
import Top10Report from "../Reports/Top10Report";
import UnassignedReport from "../Reports/UnassignedReport";
import Preferences from "../Preferences";
import Billing from "../Billing";
import {
    DASHBOARD_ROUTE,
    CREATE_INVITATION_ROUTE,
    DETAILED_ERROR_ROUTE,
    API_KEY_ROUTE,
    STATISTICS_REPORT_ROUTE,
    TOP10_REPORT_ROUTE,
    UNASSIGNED_REPORT_ROUTE,
    PREFERENCES_ROUTE,
    BILLING_ROUTE,
} from "../../routes";

const Dashboard = () => {
    return (
        <div>
            <DrawerMenu />
            <Switch>
                <PrivateRoute
                    Component={CreateInvitation}
                    exact
                    path={CREATE_INVITATION_ROUTE}
                    adminOnly={true}
                />
                <PrivateRoute
                    Component={ErrorList}
                    exact
                    path={DASHBOARD_ROUTE}
                />
                <PrivateRoute
                    Component={ApiKey}
                    exact
                    path={API_KEY_ROUTE}
                    adminOnly={true}
                />
                <PrivateRoute
                    Component={GeneralReport}
                    exact
                    path={STATISTICS_REPORT_ROUTE}
                    adminOnly={true}
                />
                <PrivateRoute
                    Component={Top10Report}
                    exact
                    path={TOP10_REPORT_ROUTE}
                    adminOnly={true}
                />
                <PrivateRoute
                    Component={UnassignedReport}
                    exact
                    path={UNASSIGNED_REPORT_ROUTE}
                    adminOnly={true}
                />
                <PrivateRoute
                    Component={Billing}
                    exact
                    path={BILLING_ROUTE}
                    adminOnly={true}
                />
                <PrivateRoute
                    Component={DetailedError}
                    path={DETAILED_ERROR_ROUTE}
                />
                <PrivateRoute
                    Component={Preferences}
                    exact
                    path={PREFERENCES_ROUTE}
                />
                <Redirect
                    exact
                    from={`${DASHBOARD_ROUTE}/*`}
                    to={DASHBOARD_ROUTE}
                />
            </Switch>
        </div>
    );
};

export default Dashboard;
