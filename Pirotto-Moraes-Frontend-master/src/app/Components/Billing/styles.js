import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    total: {
        marginTop: theme.spacing(3),
        display: "flex",
        justifyContent: "flex-end",
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        width: 1400,
    },
    paper2: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        width: 1400,
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    formWrapper: {
        display: "flex",
        flexDirection: "column",
        width: 265,
    },
}));

export default useStyles;
