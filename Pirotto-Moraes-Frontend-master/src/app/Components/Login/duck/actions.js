import { REQUEST_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN } from "./actionTypes";

export const requestLogin = () => ({
    type: REQUEST_LOGIN,
});

export const successLogin = () => ({
    type: SUCCESS_LOGIN,
});

export const errorLogin = (error) => ({
    type: ERROR_LOGIN,
    error,
});
