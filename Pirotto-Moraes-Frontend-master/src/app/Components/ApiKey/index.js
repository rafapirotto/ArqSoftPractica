import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useSnackbar } from "notistack";

import useStyles from "./styles";
import {
    EMPTY_FIELD_ERROR,
    ERROR,
    SUCCESS,
    LOADING,
    AUTO_HIDE_DURATION,
    SCREEN_LOCATION,
} from "../../common/constants";
import { getApiKey } from "./duck/operations";
import { isEmpty } from "../../utils";
import Spinner from "../../common/Components/Spinner";
import MyDialog from "../../common/Components/MyDialog";
import { DASHBOARD_ROUTE } from "../../routes";

const ApiKey = (props) => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const { state, payload: error } = props.apiKeyStatus.status;
        if (state === ERROR) {
            if (error) setNameError(error);
            enqueueSnackbar("No se ha podido obtener una clave", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        if (state === SUCCESS) {
            setName("");
            setNameError("");
            setOpenDialog(true);
            enqueueSnackbar("Se ha obtenido la clave con éxito", {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.apiKeyStatus.status]);

    const nameHasError = nameError !== "";

    const validName = (aName) => !isEmpty(aName);

    const handleNameOnChange = (aName) => {
        setName(aName);
        const nameIsValid = validName(aName);
        if (nameIsValid) setNameError("");
        else setNameError(EMPTY_FIELD_ERROR);
    };

    const onClick = () => {
        if (validName(name)) dispatch(getApiKey(name));
        else {
            if (!validName(name)) setNameError(EMPTY_FIELD_ERROR);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Clave de aplicación
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        value={name}
                        error={nameHasError}
                        onChange={(e) => handleNameOnChange(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoFocus
                        helperText={nameError}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onClick()}
                    >
                        Obtener
                    </Button>
                    {props.apiKeyStatus.status.state === LOADING && <Spinner />}
                </form>
                <MyDialog
                    title="¿Desea obtener otra clave?"
                    description={props.apiKeyStatus.status.payload}
                    handleAgree={() => setOpenDialog(false)}
                    handleDisagree={() => {
                        setOpenDialog(false);
                        props.history.push(DASHBOARD_ROUTE);
                    }}
                    open={openDialog}
                    handleClose={() => setOpenDialog(false)}
                />
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    apiKeyStatus: state.apiKeyStatus,
});

export default withRouter(connect(mapStateToProps)(ApiKey));
