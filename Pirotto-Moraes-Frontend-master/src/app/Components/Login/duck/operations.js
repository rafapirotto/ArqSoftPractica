import axios from "axios";

import { requestLogin, successLogin, errorLogin } from "./actions";
import { saveUserDataInLocalStorage, BASE_URL, AUTH_URL } from "../../../utils";

export const login = (credentials) => (dispatch) => {
    dispatch(requestLogin());
    axios
        .post(`${BASE_URL}/${AUTH_URL}/login`, credentials)
        .then((response) => {
            saveUserDataInLocalStorage(response.data);
            dispatch(successLogin());
        })
        .catch((response) => {
            const errors = response.response.data;
            dispatch(errorLogin(errors));
        });
};
