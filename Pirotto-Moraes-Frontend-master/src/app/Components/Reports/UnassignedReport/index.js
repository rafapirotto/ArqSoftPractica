import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";
import { LOADING, ERROR, SUCCESS } from "../../../common/constants";
import Spinner from "../../../common/Components/Spinner";
import { getUnassignedReport } from "./duck/operations";

function createData(title, description, severity, status) {
    return { title, description, severity, status };
}

const UnassignedReport = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = props.unassignedReportStatus.status;

    useEffect(() => {
        dispatch(getUnassignedReport());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderNoUnassignedErrors = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" component="h2">
                Todavia no existen errores sin asignar.
            </Typography>
        </div>
    );

    const renderReport = () => {
        const rows = [];
        if (status.payload.length === 0) return renderNoUnassignedErrors();
        else {
            status.payload.forEach((element) => {
                let severity;
                if (element.severity) {
                    severity = element.severity;
                } else {
                    severity = "-";
                }
                rows.push(
                    createData(
                        element.title,
                        element.description,
                        severity,
                        element.status
                    )
                );
            });
            return (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Titulo</b>
                                </TableCell>
                                <TableCell>
                                    <b>Descripcion</b>
                                </TableCell>
                                <TableCell>
                                    <b>Severidad</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>Estado</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.title}>
                                    <TableCell align="left">
                                        {row.title}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.severity}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    };

    const renderErrorMessage = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" component="h2">
                Hubo un error al obtener el reporte
            </Typography>
        </div>
    );

    return (
        <div>
            {status.state === ERROR && renderErrorMessage()}
            {status.state === LOADING && <Spinner />}
            {status.state === SUCCESS && renderReport()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    unassignedReportStatus: state.unassignedReportStatus,
});

export default withRouter(connect(mapStateToProps)(UnassignedReport));
