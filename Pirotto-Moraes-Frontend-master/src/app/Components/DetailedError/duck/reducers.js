import {
    REQUEST_GET_ERROR,
    SUCCESS_GET_ERROR,
    ERROR_GET_ERROR,
    REQUEST_RESOLVE_ERROR,
    SUCCESS_RESOLVE_ERROR,
    ERROR_RESOLVE_ERROR,
    REQUEST_EDIT_ERROR,
    SUCCESS_EDIT_ERROR,
    ERROR_EDIT_ERROR,
} from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

export const GetErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_GET_ERROR:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_GET_ERROR:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_GET_ERROR:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export const ResolveErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_RESOLVE_ERROR:
            return {
                ...state,
                status: { state: SUCCESS },
            };
        case ERROR_RESOLVE_ERROR:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_RESOLVE_ERROR:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export const EditErrorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_EDIT_ERROR:
            return {
                ...state,
                status: { state: SUCCESS },
            };
        case ERROR_EDIT_ERROR:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_EDIT_ERROR:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};
