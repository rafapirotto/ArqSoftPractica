import axios from "axios";

import { requestSignUp, successSignUp, errorSignUp } from "./actions";
import { saveUserDataInLocalStorage, BASE_URL, AUTH_URL } from "../../../utils";

export const signUp = (fields) => (dispatch) => {
    dispatch(requestSignUp());
    axios
        .post(`${BASE_URL}/${AUTH_URL}/register`, fields)
        .then((response) => {
            saveUserDataInLocalStorage(response.data);
            dispatch(successSignUp());
        })
        .catch((response) => {
            const errors = response.response.data;
            dispatch(errorSignUp(errors));
        });
};
