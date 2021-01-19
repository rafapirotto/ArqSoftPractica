import {
    REQUEST_VALIDATE_INVITATION,
    SUCCESS_VALIDATE_INVITATION,
    ERROR_VALIDATE_INVITATION,
} from "./actionTypes";

export const requestValidateInvitation = () => ({
    type: REQUEST_VALIDATE_INVITATION,
});

export const successValidateInvitation = (payload) => ({
    type: SUCCESS_VALIDATE_INVITATION,
    payload,
});

export const errorValidateInvitation = (error) => ({
    type: ERROR_VALIDATE_INVITATION,
    error,
});
