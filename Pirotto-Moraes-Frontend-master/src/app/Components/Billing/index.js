import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useSnackbar } from "notistack";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

import Title from "./Title";
import {
    LOADING,
    ERROR,
    SUCCESS,
    AUTO_HIDE_DURATION,
    SCREEN_LOCATION,
} from "../../common/constants";
import { DASHBOARD_ROUTE } from "../../routes";
import useStyles from "./styles";
import {
    getCurrentBill,
    getPreviousBills,
    getBillByDate,
} from "./duck/operations";
import Spinner from "../../common/Components/Spinner";

// Generate Order Data
function createData(id, product, cost, amount, subtotal) {
    return { id, product, cost, amount, subtotal };
}

const Billing = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [rows, setRows] = useState([]);
    const currentBillStatus = props.currentBillStatus;
    const previousBillsStatus = props.previousBillsStatus;
    const billByDateStatus = props.billByDateStatus;
    const [date, setDate] = useState("Actual");
    const [extraData, setExtraData] = useState(null);

    useEffect(() => {
        dispatch(getCurrentBill());
        dispatch(getPreviousBills());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setRowsData = (bill) => {
        const {
            cost_per_error,
            errors_quantity,
            errors_total_cost,
            cost_per_user,
            users_quantity,
            users_total_cost,
            organization,
            date,
            total_cost,
        } = bill;
        setExtraData({ organization, date, total_cost });
        const auxRows = [];
        const errorRow = createData(
            0,
            "Error reportado",
            `${cost_per_error} USD`,
            errors_quantity,
            `${errors_total_cost} USD`
        );
        const userRow = createData(
            1,
            "Alta usuario",
            `${cost_per_user} USD`,
            users_quantity,
            `${users_total_cost} USD`
        );
        auxRows.push(errorRow);
        auxRows.push(userRow);
        setRows(auxRows);
    };

    useEffect(() => {
        const { state, currentBill } = currentBillStatus;
        if (state === ERROR) {
            enqueueSnackbar("No se pudo obtener el detalle de factura", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            props.history.push(DASHBOARD_ROUTE);
        }
        if (state === SUCCESS) {
            setRowsData(currentBill);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBillStatus]);

    useEffect(() => {
        const { state } = previousBillsStatus;
        if (state === ERROR) {
            enqueueSnackbar("No se pudo obtener el histórico de facturas", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            props.history.push(DASHBOARD_ROUTE);
        }
        if (state === SUCCESS) {
            setDate("Actual");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [previousBillsStatus]);

    useEffect(() => {
        const { state, billByDate } = billByDateStatus;
        if (state === ERROR) {
            enqueueSnackbar(
                "No se pudo obtener el detalle de factura para ese mes",
                {
                    variant: ERROR,
                    autoHideDuration: AUTO_HIDE_DURATION,
                    anchorOrigin: SCREEN_LOCATION,
                }
            );
        }
        if (state === SUCCESS) {
            setRowsData(billByDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [billByDateStatus]);

    const renderRowsData = () => {
        return (
            extraData && (
                <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Paper className={classes.paper}>
                        <React.Fragment>
                            <Title>
                                Detalle de factura de {extraData.organization}{" "}
                                {extraData.date[1]}/{extraData.date[0]}
                            </Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Costo por unidad</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell align="right">
                                            Monto
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.product}</TableCell>
                                            <TableCell>{row.cost}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell align="right">
                                                {row.subtotal}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className={classes.total}>
                                Total {extraData.total_cost} USD
                            </div>
                        </React.Fragment>
                    </Paper>
                </Grid>
            )
        );
    };

    const handleSelectChange = (value) => {
        setDate(value);
    };

    const renderBoth = () => {
        return (
            <Grid
                container
                spacing={3}
                style={{ display: "flex", justifyContent: "center" }}
            >
                {renderRowsData()}
                {renderSelect()}
            </Grid>
        );
    };

    const handleOnClick = () => {
        if (date === "Actual") dispatch(getCurrentBill());
        else {
            const dateArray = date.split("/");
            const month = dateArray[0];
            const year = dateArray[1];
            dispatch(getBillByDate(month, year));
        }
    };

    const renderSelect = () => {
        const previousBills = previousBillsStatus.previousBills;

        return (
            <React.Fragment>
                <div className={classes.formWrapper}>
                    <form className={classes.form} noValidate>
                        <InputLabel
                            id="label"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Fecha
                        </InputLabel>
                        <Select
                            labelId="label"
                            id="date-select"
                            value={date}
                            onChange={(e) => handleSelectChange(e.target.value)}
                            style={{ width: "100%" }}
                        >
                            <MenuItem key={0} value={"Actual"}>
                                Actual
                            </MenuItem>
                            {previousBills.map(({ date }, index) => {
                                const year = date[0];
                                const month = date[1];
                                return (
                                    <MenuItem
                                        key={index + 1}
                                        value={`${month}/${year}`}
                                    >
                                        {month}/{year}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                    handleOnClick();
                                }}
                            >
                                Obtener factura
                            </Button>
                        }
                    </form>
                </div>
            </React.Fragment>
        );
    };

    return (
        <div>
            {currentBillStatus.state === SUCCESS &&
                previousBillsStatus.state === SUCCESS &&
                billByDateStatus.state !== LOADING &&
                renderBoth()}
            {(currentBillStatus.state === LOADING ||
                previousBillsStatus.state === LOADING ||
                billByDateStatus.state === LOADING) && <Spinner />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    currentBillStatus: state.currentBillStatus,
    previousBillsStatus: state.previousBillsStatus,
    billByDateStatus: state.billByDateStatus,
});

export default withRouter(connect(mapStateToProps)(Billing));
