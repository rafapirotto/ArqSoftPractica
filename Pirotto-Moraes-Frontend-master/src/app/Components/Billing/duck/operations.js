import axios from "axios";

import {
    requestCurrentBill,
    successCurrentBill,
    errorCurrentBill,
    requestPreviousBills,
    successPreviousBills,
    errorPreviousBills,
    requestBillByDate,
    successBillByDate,
    errorBillByDate,
} from "./actions";
import { headers, BASE_URL, BILLING_URL } from "../../../utils";

export const getCurrentBill = () => (dispatch) => {
    dispatch(requestCurrentBill());
    axios
        .get(`${BASE_URL}/${BILLING_URL}/`, headers())
        .then((response) => {
            dispatch(successCurrentBill(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorCurrentBill(error));
        });
};

export const getPreviousBills = () => (dispatch) => {
    dispatch(requestPreviousBills());
    axios
        .get(`${BASE_URL}/${BILLING_URL}/previous`, headers())
        .then((response) => {
            dispatch(successPreviousBills(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorPreviousBills(error));
        });
};

export const getBillByDate = (month, year) => (dispatch) => {
    dispatch(requestBillByDate());
    axios
        .get(
            `${BASE_URL}/${BILLING_URL}/?month=${month}&year=${year}`,
            headers()
        )
        .then((response) => {
            dispatch(successBillByDate(response.data));
        })
        .catch((response) => {
            const error = response.response.data;
            dispatch(errorBillByDate(error));
        });
};
