import {
    REQUEST_GENERAL_REPORT,
    SUCCESS_GENERAL_REPORT,
    ERROR_GENERAL_REPORT,
} from "./actionTypes";

export const requestGeneralReport = () => ({
    type: REQUEST_GENERAL_REPORT,
});

export const successGeneralReport = (payload) => ({
    type: SUCCESS_GENERAL_REPORT,
    payload,
});

export const errorGeneralReport = (error) => ({
    type: ERROR_GENERAL_REPORT,
    error,
});
