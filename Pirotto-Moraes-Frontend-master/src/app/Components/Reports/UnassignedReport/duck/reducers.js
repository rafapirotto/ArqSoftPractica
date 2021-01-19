import { REQUEST_REPORT, SUCCESS_REPORT, ERROR_REPORT } from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const UnassignedReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_REPORT:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_REPORT:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_REPORT:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default UnassignedReportReducer;
