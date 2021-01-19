import {
    REQUEST_VALIDATE_INVITATION,
    SUCCESS_VALIDATE_INVITATION,
    ERROR_VALIDATE_INVITATION,
} from "./actionTypes";
import { ERROR, SUCCESS, LOADING } from "../../../common/constants";

const initialState = { status: { state: null, payload: null } };

const ValidateInvitationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_VALIDATE_INVITATION:
            return {
                ...state,
                status: { state: SUCCESS, payload: action.payload },
            };
        case ERROR_VALIDATE_INVITATION:
            return {
                ...state,
                status: { state: ERROR, payload: action.error },
            };
        case REQUEST_VALIDATE_INVITATION:
            return {
                ...state,
                status: { state: LOADING },
            };
        default:
            return state;
    }
};

export default ValidateInvitationReducer;
