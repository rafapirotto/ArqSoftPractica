import { REQUEST_API_KEY, SUCCESS_API_KEY, ERROR_API_KEY } from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const ApiKeyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_API_KEY:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_API_KEY:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_API_KEY:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default ApiKeyReducer;
