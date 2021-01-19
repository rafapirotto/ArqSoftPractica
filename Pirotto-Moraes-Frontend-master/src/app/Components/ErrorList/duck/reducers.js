import {
    REQUEST_GET_ERROR_LIST,
    SUCCESS_GET_ERROR_LIST,
    ERROR_GET_ERROR_LIST,
} from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const GetErrorListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_GET_ERROR_LIST:
            return {
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_GET_ERROR_LIST:
            return {
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_GET_ERROR_LIST:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default GetErrorListReducer;
