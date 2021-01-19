import axios from "axios";

import { requestReport, successReport, errorReport } from "./actions";
import { headers, BASE_URL, REPORTS_URL } from "../../../../utils";

export const getTop10Report = () => (dispatch) => {
    dispatch(requestReport());
    axios
        .get(`${BASE_URL}/${REPORTS_URL}/top-10`, headers())
        .then((response) => {
            dispatch(successReport(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorReport(error));
        });
};
