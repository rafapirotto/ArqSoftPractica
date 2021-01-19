import {
    REQUEST_CURRENT_BILL,
    SUCCESS_CURRENT_BILL,
    ERROR_CURRENT_BILL,
    REQUEST_PREVIOUS_BILLS,
    SUCCESS_PREVIOUS_BILLS,
    ERROR_PREVIOUS_BILLS,
    REQUEST_BILL_BY_DATE,
    SUCCESS_BILL_BY_DATE,
    ERROR_BILL_BY_DATE,
} from "./actionTypes";

export const requestCurrentBill = () => ({
    type: REQUEST_CURRENT_BILL,
});

export const successCurrentBill = (payload) => ({
    type: SUCCESS_CURRENT_BILL,
    payload,
});

export const errorCurrentBill = (error) => ({
    type: ERROR_CURRENT_BILL,
    error,
});

export const requestPreviousBills = () => ({
    type: REQUEST_PREVIOUS_BILLS,
});

export const successPreviousBills = (payload) => ({
    type: SUCCESS_PREVIOUS_BILLS,
    payload,
});

export const errorPreviousBills = (error) => ({
    type: ERROR_PREVIOUS_BILLS,
    error,
});
export const requestBillByDate = () => ({
    type: REQUEST_BILL_BY_DATE,
});

export const successBillByDate = (payload) => ({
    type: SUCCESS_BILL_BY_DATE,
    payload,
});

export const errorBillByDate = (error) => ({
    type: ERROR_BILL_BY_DATE,
    error,
});
