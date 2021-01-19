import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { object, string } from "prop-types";
import { Link as RouterLink, withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useSnackbar } from "notistack";

import {
    CREATE_ACCOUNT,
    ACCOUNT_ALREADY_EXISTS,
    NAME,
    ORGANIZATION,
    ERROR_SIGN_UP_MESSAGE,
    SUCCESS_SIGN_UP_MESSAGE,
} from "./strings";
import useStyles from "./styles";

import { signUp } from "./duck/operations";
import Spinner from "../../common/Components/Spinner";
import { validEmail, validPassword, isEmpty } from "../../utils";
import {
    EMAIL,
    PASSWORD,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    EMPTY_FIELD_ERROR,
    LOADING,
    ERROR,
    SUCCESS,
    VALID_ROLES,
    VALID_NATIONALITIES,
} from "../../common/constants";
import { DASHBOARD_ROUTE } from "../../routes";
import { AUTO_HIDE_DURATION, SCREEN_LOCATION } from "../../common/constants";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [organizationName, setOrganization] = useState("");
    const [nationality, setNationality] = useState(
        VALID_NATIONALITIES[0].value
    );
    const [organizationNameError, setOrganizationNameError] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const dispatch = useDispatch();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    // eslint-disable-next-line
    const [role, setRole] = useState(VALID_ROLES[0].value);

    useEffect(() => {
        const { state, payload: errors } = props.registerStatus.status;
        if (state === ERROR) {
            setErrors(errors);
            enqueueSnackbar(ERROR_SIGN_UP_MESSAGE, {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        if (state === SUCCESS) {
            enqueueSnackbar(SUCCESS_SIGN_UP_MESSAGE, {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            props.history.push(DASHBOARD_ROUTE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.registerStatus.status]);

    const setErrors = (errors) => {
        errors.forEach(({ message, field }) => {
            setError(field, message);
        });
    };

    const setError = (field, message) => {
        switch (field) {
            case "email":
                setEmailError(message);
                break;
            case "organizationName":
                setOrganizationNameError(message);
                break;
            case "name":
                setNameError(message);
                break;
            case "password":
                setPasswordError(message);
                break;
            default:
                break;
        }
    };

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

    const validName = (aName) => !isEmpty(aName);

    const validOrganization = (anOrganization) => !isEmpty(anOrganization);

    const handleNameOnChange = (aName) => {
        setName(aName);
        const nameIsValid = validName(aName);
        if (nameIsValid) setNameError("");
        else setNameError(EMPTY_FIELD_ERROR);
    };

    const handleNationalityOnChange = (event) => {
        const newNationality = event.target.value;
        setNationality(newNationality);
    };

    const nameHasError = nameError !== "";

    const handleOrganizationOnChange = (anOrganization) => {
        setOrganization(anOrganization);
        const organizationIsValid = validOrganization(anOrganization);
        if (organizationIsValid) setOrganizationNameError("");
        else setOrganizationNameError(EMPTY_FIELD_ERROR);
    };

    const organizationHasError = organizationNameError !== "";

    const onClick = () => {
        const fields = {
            email,
            password,
            name,
            organizationName,
            role,
            nationality,
        };
        const allFieldsAreValid =
            validEmail(email) &&
            validPassword(password) &&
            validName(name) &&
            validOrganization(organizationName);

        if (allFieldsAreValid) {
            dispatch(signUp(fields));
        } else {
            if (!validEmail(email)) setEmailError(INVALID_EMAIL);
            if (!validPassword(password)) setPasswordError(INVALID_PASSWORD);
            if (!validName(name)) setNameError(EMPTY_FIELD_ERROR);
            if (!validOrganization(organizationName))
                setOrganizationNameError(EMPTY_FIELD_ERROR);
        }
    };

    const renderNationalities = () => (
        <FormControl className={classes.formControl} style={{ minWidth: 150 }}>
            <InputLabel id="nationality-label">Nacionalidad</InputLabel>
            <Select
                labelId="nationality-label"
                id="nationality-label-id"
                value={nationality}
                onChange={handleNationalityOnChange}
            >
                {VALID_NATIONALITIES.map(({ value, label }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {CREATE_ACCOUNT}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={name}
                                error={nameHasError}
                                onChange={(e) =>
                                    handleNameOnChange(e.target.value)
                                }
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label={NAME}
                                autoFocus
                                helperText={nameError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={organizationName}
                                error={organizationHasError}
                                onChange={(e) =>
                                    handleOrganizationOnChange(e.target.value)
                                }
                                variant="outlined"
                                required
                                fullWidth
                                id="organizationName"
                                label={ORGANIZATION}
                                name="organizationName"
                                autoComplete="oname"
                                helperText={organizationNameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                error={emailHasError}
                                onChange={(e) =>
                                    handleEmailOnChange(e.target.value)
                                }
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={EMAIL}
                                name="email"
                                autoComplete="email"
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                error={passwordHasError}
                                onChange={(e) =>
                                    handlePasswordOnChange(e.target.value)
                                }
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={PASSWORD}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={passwordError}
                            />
                        </Grid>
                    </Grid>
                    {renderNationalities()}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onClick()}
                    >
                        {CREATE_ACCOUNT}
                    </Button>
                    {props.registerStatus.status.state === LOADING && (
                        <Spinner />
                    )}
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item>
                            <Link to="/" component={RouterLink} variant="body2">
                                {ACCOUNT_ALREADY_EXISTS}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    registerStatus: state.registerStatus,
});

SignUp.propTypes = {
    registerStatus: object,
    organizationName: string,
};

export default withRouter(connect(mapStateToProps)(SignUp));
