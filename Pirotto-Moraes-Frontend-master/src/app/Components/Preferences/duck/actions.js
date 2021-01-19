import {
    REQUEST_GET_PREFERENCES,
    SUCCESS_GET_PREFERENCES,
    ERROR_GET_PREFERENCES,
    REQUEST_EDIT_PREFERENCES,
    SUCCESS_EDIT_PREFERENCES,
    ERROR_EDIT_PREFERENCES,
} from "./actionTypes";

export const requestGetPreferences = () => ({
    type: REQUEST_GET_PREFERENCES,
});

export const successGetPreferences = (payload) => ({
    type: SUCCESS_GET_PREFERENCES,
    payload,
});

export const errorGetPreferences = (error) => ({
    type: ERROR_GET_PREFERENCES,
    error,
});

export const requestEditPreferences = () => ({
    type: REQUEST_EDIT_PREFERENCES,
});

export const successEditPreferences = (payload) => ({
    type: SUCCESS_EDIT_PREFERENCES,
    payload,
});

export const errorEditPreferences = (error) => ({
    type: ERROR_EDIT_PREFERENCES,
    error,
});
