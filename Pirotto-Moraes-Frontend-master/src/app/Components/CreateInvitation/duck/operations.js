import axios from "axios";

import {
    requestSendInvitation,
    successSendInvitation,
    errorSendInvitation,
} from "./actions";
import { headers, BASE_URL, AUTH_URL } from "../../../utils";

export const sendInvitation = (email, role) => (dispatch) => {
    dispatch(requestSendInvitation());
    axios
        .post(`${BASE_URL}/${AUTH_URL}/invitations`, { email, role }, headers())
        .then(() => {
            dispatch(successSendInvitation());
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorSendInvitation(error));
        });
};
