import {
    REQUEST_SEND_INVITATION,
    SUCCESS_SEND_INVITATION,
    ERROR_SEND_INVITATION,
} from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const InvitationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_SEND_INVITATION:
            return {
                ...state,
                status: { state: SUCCESS },
            };
        case ERROR_SEND_INVITATION:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_SEND_INVITATION:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default InvitationReducer;
