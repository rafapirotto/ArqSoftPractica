import axios from "axios";

import {
    requestGetErrorList,
    successGetErrorList,
    errorGetErrorList,
} from "./actions";
import { headers, BASE_URL, ERRORS_URL } from "../../../utils";

export const getErrorList = (errorType) => (dispatch) => {
    const param = `?status=${errorType}`;
    dispatch(requestGetErrorList());
    axios
        .get(`${BASE_URL}/${ERRORS_URL}/${param}`, headers())
        .then((response) => {
            dispatch(successGetErrorList(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorGetErrorList(error));
        });
};
