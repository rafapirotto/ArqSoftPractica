import {
    REQUEST_GET_ERROR,
    SUCCESS_GET_ERROR,
    ERROR_GET_ERROR,
    REQUEST_RESOLVE_ERROR,
    SUCCESS_RESOLVE_ERROR,
    ERROR_RESOLVE_ERROR,
    REQUEST_EDIT_ERROR,
    SUCCESS_EDIT_ERROR,
    ERROR_EDIT_ERROR,
} from "./actionTypes";

export const requestGetError = () => ({
    type: REQUEST_GET_ERROR,
});

export const successGetError = (payload) => ({
    type: SUCCESS_GET_ERROR,
    payload,
});

export const errorGetError = (error) => ({
    type: ERROR_GET_ERROR,
    error,
});

export const requestResolveError = () => ({
    type: REQUEST_RESOLVE_ERROR,
});

export const successResolveError = () => ({
    type: SUCCESS_RESOLVE_ERROR,
});

export const errorResolveError = (error) => ({
    type: ERROR_RESOLVE_ERROR,
    error,
});

export const requestEditError = () => ({
    type: REQUEST_EDIT_ERROR,
});

export const successEditError = () => ({
    type: SUCCESS_EDIT_ERROR,
});

export const errorEditError = (error) => ({
    type: ERROR_EDIT_ERROR,
    error,
});
