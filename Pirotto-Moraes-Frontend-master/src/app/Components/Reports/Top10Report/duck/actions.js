import { REQUEST_REPORT, SUCCESS_REPORT, ERROR_REPORT } from "./actionTypes";

export const requestReport = () => ({
    type: REQUEST_REPORT,
});

export const successReport = (payload) => ({
    type: SUCCESS_REPORT,
    payload,
});

export const errorReport = (error) => ({
    type: ERROR_REPORT,
    error,
});
