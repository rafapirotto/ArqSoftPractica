import axios from "axios";

import {
    requestGeneralReport,
    successGeneralReport,
    errorGeneralReport,
} from "./actions";
import { headers, BASE_URL, REPORTS_URL } from "../../../../utils";

export const getGeneralReport = (from, to) => (dispatch) => {
    const param = `?from=${from}&to=${to}`;
    dispatch(requestGeneralReport());
    axios
        .get(`${BASE_URL}/${REPORTS_URL}/general${param}`, headers())
        .then((response) => {
            dispatch(successGeneralReport(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorGeneralReport(error));
        });
};
