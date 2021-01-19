import { REQUEST_SIGN_UP, SUCCESS_SIGN_UP, ERROR_SIGN_UP } from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const SignUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_SIGN_UP:
            return {
                ...state,
                status: { state: SUCCESS },
            };
        case ERROR_SIGN_UP:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_SIGN_UP:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default SignUpReducer;
