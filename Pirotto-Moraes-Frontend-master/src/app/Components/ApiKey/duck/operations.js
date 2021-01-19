import axios from "axios";

import { requestApiKey, successApiKey, errorApiKey } from "./actions";
import { headers, BASE_URL, AUTH_URL } from "../../../utils";

export const getApiKey = (name) => (dispatch) => {
    dispatch(requestApiKey());
    axios
        .post(`${BASE_URL}/${AUTH_URL}/api-keys`, { name }, headers())
        .then((response) => {
            dispatch(successApiKey(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorApiKey(error));
        });
};
