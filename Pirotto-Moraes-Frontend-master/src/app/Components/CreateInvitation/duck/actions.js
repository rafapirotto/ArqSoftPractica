import {
    REQUEST_SEND_INVITATION,
    SUCCESS_SEND_INVITATION,
    ERROR_SEND_INVITATION,
} from "./actionTypes";

export const requestSendInvitation = () => ({
    type: REQUEST_SEND_INVITATION,
});

export const successSendInvitation = () => ({
    type: SUCCESS_SEND_INVITATION,
});

export const errorSendInvitation = (error) => ({
    type: ERROR_SEND_INVITATION,
    error,
});
