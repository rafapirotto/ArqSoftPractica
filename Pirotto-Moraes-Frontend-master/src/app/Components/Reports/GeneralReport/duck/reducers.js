import {
    REQUEST_GENERAL_REPORT,
    SUCCESS_GENERAL_REPORT,
    ERROR_GENERAL_REPORT,
} from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const ReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_GENERAL_REPORT:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_GENERAL_REPORT:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_GENERAL_REPORT:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default ReportReducer;
