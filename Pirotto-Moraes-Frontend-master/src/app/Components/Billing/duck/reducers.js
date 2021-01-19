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
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const currentBillInitialState = {
    state: null,
    currentBill: null,
};
const previousBillsInitialState = {
    state: null,
    previousBills: [],
};

const billByDateInitialState = {
    state: null,
    billByDate: null,
};

export const CurrentBillReducer = (state = currentBillInitialState, action) => {
    switch (action.type) {
        case SUCCESS_CURRENT_BILL:
            return {
                ...state,
                state: SUCCESS,
                currentBill: action.payload,
            };
        case ERROR_CURRENT_BILL:
            return {
                ...state,
                state: ERROR,
                currentBill: action.error,
            };
        case REQUEST_CURRENT_BILL:
            return {
                ...state,
                state: LOADING,
            };
        default:
            return state;
    }
};
export const PreviousBillsReducer = (
    state = previousBillsInitialState,
    action
) => {
    switch (action.type) {
        case SUCCESS_PREVIOUS_BILLS:
            return {
                ...state,
                state: SUCCESS,
                previousBills: action.payload,
            };
        case ERROR_PREVIOUS_BILLS:
            return {
                ...state,
                state: ERROR,
                previousBills: action.error,
            };
        case REQUEST_PREVIOUS_BILLS:
            return {
                ...state,
                state: LOADING,
            };
        default:
            return state;
    }
};

export const BillByDateReducer = (state = billByDateInitialState, action) => {
    switch (action.type) {
        case SUCCESS_BILL_BY_DATE:
            return {
                ...state,
                state: SUCCESS,
                billByDate: action.payload,
            };
        case ERROR_BILL_BY_DATE:
            return {
                ...state,
                state: ERROR,
                billByDate: action.error,
            };
        case REQUEST_BILL_BY_DATE:
            return {
                ...state,
                state: LOADING,
            };
        default:
            return state;
    }
};
