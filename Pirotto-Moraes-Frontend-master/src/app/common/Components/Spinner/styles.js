import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default useStyles;
