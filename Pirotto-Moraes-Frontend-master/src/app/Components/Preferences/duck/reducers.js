import {
    REQUEST_GET_PREFERENCES,
    SUCCESS_GET_PREFERENCES,
    ERROR_GET_PREFERENCES,
    REQUEST_EDIT_PREFERENCES,
    SUCCESS_EDIT_PREFERENCES,
    ERROR_EDIT_PREFERENCES,
} from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

export const GetPreferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_GET_PREFERENCES:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_GET_PREFERENCES:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_GET_PREFERENCES:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export const EditPreferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_EDIT_PREFERENCES:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_EDIT_PREFERENCES:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_EDIT_PREFERENCES:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};
