import React from "react";
import { withRouter } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { DETAILED_ERROR_ROUTE } from "../../routes";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontSize: 18,
    },
    body: {
        fontSize: 14,
        cursor: "pointer",
        textDecoration: "underline",
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const createData = ({ title, _id }) => {
    return { title, _id };
};

const createRows = (rows) => {
    const rowsArray = [];
    rows.forEach((row) => {
        rowsArray.push(createData(row));
    });
    return rowsArray;
};

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const MyTable = (props) => {
    const classes = useStyles();
    const rows = createRows(props.data);

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Título</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell
                                        onClick={() =>
                                            props.history.push(
                                                `${DETAILED_ERROR_ROUTE}/${row._id}`
                                            )
                                        }
                                        component="th"
                                        scope="row"
                                    >
                                        {row.title}
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default withRouter(MyTable);
