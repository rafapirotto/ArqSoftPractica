import {
    REQUEST_GET_ERROR_LIST,
    SUCCESS_GET_ERROR_LIST,
    ERROR_GET_ERROR_LIST,
} from "./actionTypes";

export const requestGetErrorList = () => ({
    type: REQUEST_GET_ERROR_LIST,
});

export const successGetErrorList = (payload) => ({
    type: SUCCESS_GET_ERROR_LIST,
    payload,
});

export const errorGetErrorList = (error) => ({
    type: ERROR_GET_ERROR_LIST,
    error,
});
