import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { object } from "prop-types";
import { Link as RouterLink, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";

import {
    LOGIN,
    CREATE_ACCOUNT,
    ERROR_LOGIN_MESSAGE,
    SUCCESS_LOGIN_MESSAGE,
} from "./strings";
import useStyles from "./styles";
import { login } from "./duck/operations";
import Spinner from "../../common/Components/Spinner";
import {
    LOADING,
    ERROR,
    SUCCESS,
    EMAIL,
    PASSWORD,
    INVALID_EMAIL,
    INVALID_PASSWORD,
} from "../../common/constants";
import { validEmail, validPassword } from "../../utils";
import { DASHBOARD_ROUTE, SIGN_UP_ROUTE } from "../../routes";
import { AUTO_HIDE_DURATION, SCREEN_LOCATION } from "../../common/constants";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const { state, payload: error } = props.loginStatus.status;
        if (state === ERROR) {
            if (error) {
                setPasswordError(error);
                setEmailError(error);
                enqueueSnackbar(ERROR_LOGIN_MESSAGE, {
                    variant: ERROR,
                    autoHideDuration: AUTO_HIDE_DURATION,
                    anchorOrigin: SCREEN_LOCATION,
                });
            }
        }
        if (state === SUCCESS) {
            enqueueSnackbar(SUCCESS_LOGIN_MESSAGE, {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            props.history.push(DASHBOARD_ROUTE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.loginStatus.status]);

    const handleEmailOnChange = (anEmail) => {
        setEmail(anEmail);
        const emailIsValid = validEmail(anEmail);
        if (emailIsValid) setEmailError("");
        else setEmailError(INVALID_EMAIL);
    };

    const emailHasError = emailError !== "";

    const handlePasswordOnChange = (aPassword) => {
        setPassword(aPassword);
        const passwordIsValid = validPassword(aPassword);
        if (passwordIsValid) setPasswordError("");
        else setPasswordError(INVALID_PASSWORD);
    };

    const passwordHasError = passwordError !== "";

    const onClick = () => {
        const credentials = { email, password };
        if (validEmail(email) && validPassword(password))
            dispatch(login(credentials));
        else {
            if (!validEmail(email)) setEmailError(INVALID_EMAIL);
            if (!validPassword(password)) setPasswordError(INVALID_PASSWORD);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {LOGIN}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        value={email}
                        error={emailHasError}
                        onChange={(e) => handleEmailOnChange(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={EMAIL}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={emailError}
                    />
                    <TextField
                        value={password}
                        error={passwordHasError}
                        onChange={(e) => handlePasswordOnChange(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={PASSWORD}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={passwordError}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onClick()}
                    >
                        {LOGIN}
                    </Button>
                    {props.loginStatus.status.state === LOADING && <Spinner />}
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item>
                            <Link
                                to={SIGN_UP_ROUTE}
                                component={RouterLink}
                                variant="body2"
                            >
                                {CREATE_ACCOUNT}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    loginStatus: state.loginStatus,
});

Login.propTypes = {
    loginStatus: object,
};

export default withRouter(connect(mapStateToProps)(Login));
