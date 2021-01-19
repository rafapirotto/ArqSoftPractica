import { REQUEST_API_KEY, SUCCESS_API_KEY, ERROR_API_KEY } from "./actionTypes";

export const requestApiKey = () => ({
    type: REQUEST_API_KEY,
});

export const successApiKey = (payload) => ({
    type: SUCCESS_API_KEY,
    payload,
});

export const errorApiKey = (error) => ({
    type: ERROR_API_KEY,
    error,
});
