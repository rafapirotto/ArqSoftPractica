import { combineReducers } from "redux";

import LoginReducer from "./Components/Login/duck/reducers";
import SignUpReducer from "./Components/SignUp/duck/reducers";
import InvitationReducer from "./Components/CreateInvitation/duck/reducers";
import ValidateInvitationReducer from "./Components/SignUpByInvitation/duck/reducers";
import GetErrorListReducer from "./Components/ErrorList/duck/reducers";
import {
    GetErrorReducer,
    ResolveErrorReducer,
    EditErrorReducer,
} from "./Components/DetailedError/duck/reducers";
import ApiKeyReducer from "./Components/ApiKey/duck/reducers";
import ReportReducer from "./Components/Reports/GeneralReport/duck/reducers";
import ReportTop10Reducer from "./Components/Reports/Top10Report/duck/reducers";
import UnassignedReportReducer from "./Components/Reports/UnassignedReport/duck/reducers";
import {
    CurrentBillReducer,
    PreviousBillsReducer,
    BillByDateReducer,
} from "./Components/Billing/duck/reducers";
import {
    GetPreferencesReducer,
    EditPreferencesReducer,
} from "./Components/Preferences/duck/reducers";
import { DESTROY_SESSION } from "./Components/Logout/duck/actionTypes";
import {
    REQUEST_CURRENT_BILL,
    REQUEST_PREVIOUS_BILLS,
    SUCCESS_CURRENT_BILL,
    SUCCESS_PREVIOUS_BILLS,
    ERROR_CURRENT_BILL,
    ERROR_PREVIOUS_BILLS,
    REQUEST_BILL_BY_DATE,
    SUCCESS_BILL_BY_DATE,
    ERROR_BILL_BY_DATE,
} from "./Components/Billing/duck/actionTypes";
import { removeUserDataFromLocalStorage } from "./utils";

const appReducer = combineReducers({
    loginStatus: LoginReducer,
    registerStatus: SignUpReducer,
    invitationStatus: InvitationReducer,
    validateInvitationStatus: ValidateInvitationReducer,
    getErrorListStatus: GetErrorListReducer,
    getErrorStatus: GetErrorReducer,
    resolveErrorStatus: ResolveErrorReducer,
    editErrorStatus: EditErrorReducer,
    apiKeyStatus: ApiKeyReducer,
    reportStatus: ReportReducer,
    reportTop10Status: ReportTop10Reducer,
    unassignedReportStatus: UnassignedReportReducer,
    getPreferencesStatus: GetPreferencesReducer,
    editPreferencesStatus: EditPreferencesReducer,
    currentBillStatus: CurrentBillReducer,
    previousBillsStatus: PreviousBillsReducer,
    billByDateStatus: BillByDateReducer,
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === DESTROY_SESSION) {
        removeUserDataFromLocalStorage();
    }
    if (
        action.type !== REQUEST_CURRENT_BILL &&
        action.type !== REQUEST_PREVIOUS_BILLS &&
        action.type !== SUCCESS_PREVIOUS_BILLS &&
        action.type !== SUCCESS_CURRENT_BILL &&
        action.type !== ERROR_PREVIOUS_BILLS &&
        action.type !== ERROR_CURRENT_BILL &&
        action.type !== REQUEST_BILL_BY_DATE &&
        action.type !== SUCCESS_BILL_BY_DATE &&
        action.type !== ERROR_BILL_BY_DATE
    ) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
