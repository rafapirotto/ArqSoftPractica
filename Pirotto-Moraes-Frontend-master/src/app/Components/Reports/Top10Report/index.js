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
import { getTop10Report } from "./duck/operations";

function createData(developer, quantity) {
    return { developer, quantity };
}

const Top10Report = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const status = props.reportTop10Status.status;

    useEffect(() => {
        dispatch(getTop10Report());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderReport = () => {
        const rows = [];
        if (status.payload.length === 0) {
            return renderLessThan10DevelopersMessage(
                "Todavia no hay 10 desarrolladores asignados."
            );
        } else {
            status.payload.forEach((element) => {
                rows.push(createData(element.assignedDeveloper, element.count));
            });
            return (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>Posicion</b>
                                </TableCell>
                                <TableCell>
                                    <b>Desarrollador</b>
                                </TableCell>
                                <TableCell align="left">
                                    <b>
                                        Cantidad de errores resueltos en el
                                        ultimo mes
                                    </b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.developer}>
                                    <TableCell align="left">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.developer}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.quantity}
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

    const renderLessThan10DevelopersMessage = (message) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" component="h2">
                {message}
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
    reportTop10Status: state.reportTop10Status,
});

export default withRouter(connect(mapStateToProps)(Top10Report));
