import { REQUEST_SIGN_UP, SUCCESS_SIGN_UP, ERROR_SIGN_UP } from "./actionTypes";

export const requestSignUp = () => ({
    type: REQUEST_SIGN_UP,
});

export const successSignUp = () => ({
    type: SUCCESS_SIGN_UP,
});

export const errorSignUp = (error) => ({
    type: ERROR_SIGN_UP,
    error,
});
