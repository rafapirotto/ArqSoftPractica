import axios from "axios";

import {
    requestValidateInvitation,
    successValidateInvitation,
    errorValidateInvitation,
} from "./actions";
import {
    requestSignUp,
    successSignUp,
    errorSignUp,
} from "../../SignUp/duck/actions";
import { saveUserDataInLocalStorage, BASE_URL, AUTH_URL } from "../../../utils";

export const validateInvitation = (invitationId) => (dispatch) => {
    dispatch(requestValidateInvitation());
    axios
        .get(`${BASE_URL}/${AUTH_URL}/validateInvitation/${invitationId}`)
        .then((response) => {
            dispatch(successValidateInvitation(response));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorValidateInvitation(error));
        });
};

export const signUpFromInvitation = (fields) => (dispatch) => {
    dispatch(requestSignUp());
    axios
        .post(`${BASE_URL}/${AUTH_URL}/registerWithInvitation`, fields)
        .then((response) => {
            saveUserDataInLocalStorage(response.data);
            dispatch(successSignUp());
        })
        .catch((response) => {
            const errors = response.response.data;
            dispatch(errorSignUp(errors));
        });
};
