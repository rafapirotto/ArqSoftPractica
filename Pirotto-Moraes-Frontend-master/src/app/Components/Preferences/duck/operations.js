import axios from "axios";

import {
    requestGetPreferences,
    successGetPreferences,
    errorGetPreferences,
    requestEditPreferences,
    successEditPreferences,
    errorEditPreferences,
} from "./actions";
import { headers, BASE_URL, AUTH_URL } from "../../../utils";

export const getPreferences = () => (dispatch) => {
    dispatch(requestGetPreferences());
    axios
        .get(`${BASE_URL}/${AUTH_URL}/preferences`, headers())
        .then((response) => {
            dispatch(successGetPreferences(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorGetPreferences(error));
        });
};

export const editPreferences = (preferences) => (dispatch) => {
    dispatch(requestEditPreferences());
    axios
        .put(`${BASE_URL}/${AUTH_URL}/preferences`, preferences, headers())
        .then((response) => {
            dispatch(successEditPreferences(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorEditPreferences(error));
        });
};
