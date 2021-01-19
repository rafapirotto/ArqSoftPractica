import { REQUEST_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN } from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN:
            return {
                ...state,
                status: { state: SUCCESS },
            };
        case ERROR_LOGIN:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_LOGIN:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default LoginReducer;
