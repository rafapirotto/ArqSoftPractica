import axios from "axios";

import {
    requestGetError,
    successGetError,
    errorGetError,
    requestResolveError,
    successResolveError,
    errorResolveError,
    requestEditError,
    successEditError,
    errorEditError,
} from "./actions";
import { headers, BASE_URL, ERRORS_URL } from "../../../utils";

export const getError = (id) => (dispatch) => {
    dispatch(requestGetError());
    axios
        .get(`${BASE_URL}/${ERRORS_URL}/${id}`, headers())
        .then((response) => {
            dispatch(successGetError(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorGetError(error));
        });
};

export const resolveError = (id) => (dispatch) => {
    dispatch(requestResolveError());
    axios
        .put(`${BASE_URL}/${ERRORS_URL}/resolve/${id}`, {}, headers())
        .then((response) => {
            dispatch(successResolveError());
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorResolveError(error));
        });
};

export const editError = (editedError) => (dispatch) => {
    dispatch(requestEditError());
    axios
        .put(
            `${BASE_URL}/${ERRORS_URL}/${editedError.id}`,
            editedError,
            headers()
        )
        .then(() => {
            dispatch(successEditError());
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorEditError(error));
        });
};
