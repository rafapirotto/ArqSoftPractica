import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { format } from "date-fns";
import { useSnackbar } from "notistack";

import useStyles from "./styles";
import DatePicker from "../../../common/Components/DatePicker";
import { getGeneralReport } from "./duck/operations";
import {
    LOADING,
    ERROR,
    SUCCESS,
    AUTO_HIDE_DURATION,
    SCREEN_LOCATION,
} from "../../../common/constants";
import Spinner from "../../../common/Components/Spinner";

const Report = (props) => {
    const classes = useStyles();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(addDays(fromDate, 1));
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const onClick = () => {
        if (toDate > fromDate)
            dispatch(
                getGeneralReport(formateDate(fromDate), formateDate(toDate))
            );
        else
            enqueueSnackbar("Intervalo incorrecto", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
    };

    const formateDate = (someDate) => format(someDate, "yyyy-MM-dd");

    useEffect(() => {
        const { state } = props.reportStatus.status;
        if (state === ERROR) {
            enqueueSnackbar("No se pudo obtener el reporte", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        if (state === SUCCESS) {
            enqueueSnackbar("Reporte obtenido con éxito", {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reportStatus.status]);

    const renderReport = () => {
        const {
            errores,
            errores_resueltos,
            severidad_1,
            severidad_2,
            severidad_3,
            severidad_4,
        } = props.reportStatus.status.payload;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EqualizerIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reporte de estadísticas entre
                        <br />
                        {`${formateDate(fromDate)}
                        y ${formateDate(toDate)}`}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            value={errores}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="total_errors"
                            label="Errores totales"
                            name="total_errors"
                        />
                        <TextField
                            value={errores_resueltos}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="resolved_errors"
                            label="Errores resueltos"
                            name="resolved_errors"
                        />
                        <TextField
                            value={severidad_1}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="severity_1"
                            label="Errores con severidad 1"
                            name="severity_1"
                        />
                        <TextField
                            value={severidad_2}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="severity_2"
                            label="Errores con severidad 2"
                            name="severity_2"
                        />
                        <TextField
                            value={severidad_3}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="severity_3"
                            label="Errores con severidad 3"
                            name="severity_3"
                        />
                        <TextField
                            value={severidad_4}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="severity_4"
                            label="Errores con severidad 4"
                            name="severity_4"
                        />
                    </form>
                </div>
            </Container>
        );
    };
    const renderReportForm = () => {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EqualizerIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reporte de estadísticas de errores
                    </Typography>
                    <form className={classes.form} noValidate>
                        <DatePicker
                            selectedDate={fromDate}
                            handleOnChange={setFromDate}
                            label="Desde"
                        />
                        <DatePicker
                            selectedDate={toDate}
                            handleOnChange={setToDate}
                            label="Hasta"
                            style={{ width: "100%" }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => onClick()}
                        >
                            Obtener reporte
                        </Button>
                    </form>
                </div>
            </Container>
        );
    };

    return (
        <div>
            {props.reportStatus.status.state !== SUCCESS && renderReportForm()}
            {props.reportStatus.status.state === LOADING && <Spinner />}
            {props.reportStatus.status.state === SUCCESS && renderReport()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    reportStatus: state.reportStatus,
});

export default withRouter(connect(mapStateToProps)(Report));
