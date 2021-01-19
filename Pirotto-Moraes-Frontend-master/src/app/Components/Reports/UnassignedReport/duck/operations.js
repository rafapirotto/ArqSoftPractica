import axios from "axios";

import { requestReport, successReport, errorReport } from "./actions";
import { headers, BASE_URL, REPORTS_URL } from "../../../../utils";

export const getUnassignedReport = () => (dispatch) => {
    dispatch(requestReport());
    axios
        .get(`${BASE_URL}/${REPORTS_URL}/unassigned`, headers())
        .then((response) => {
            dispatch(successReport(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorReport(error));
        });
};
