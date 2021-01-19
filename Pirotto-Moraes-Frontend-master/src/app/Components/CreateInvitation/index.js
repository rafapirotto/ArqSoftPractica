import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { object } from "prop-types";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useSnackbar } from "notistack";

import useStyles from "./styles";
import { SEND_INVITATION_SUCCESS, SEND_INVITATION_ERROR } from "./strings";
import Spinner from "../../common/Components/Spinner";
import {
    LOADING,
    ERROR,
    SUCCESS,
    EMAIL,
    INVALID_EMAIL,
    VALID_ROLES,
} from "../../common/constants";
import { validEmail } from "../../utils";
import {
    CREATE_INVITATION,
    SEND_INVITATION,
    DIALOG_TITLE,
    DIALOG_DESCRIPTION,
} from "./strings";
import { sendInvitation } from "./duck/operations";
import { DASHBOARD_ROUTE } from "../../routes";
import MyDialog from "../../common/Components/MyDialog";
import { AUTO_HIDE_DURATION, SCREEN_LOCATION } from "../../common/constants";

const CreateInvitation = (props) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [role, setRole] = useState(VALID_ROLES[0].value);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const { state, payload: error } = props.invitationStatus.status;
        if (state === ERROR) {
            if (error) setEmailError(error);
            enqueueSnackbar(SEND_INVITATION_ERROR, {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        if (state === SUCCESS) {
            setEmail("");
            setEmailError("");
            setOpenDialog(true);
            enqueueSnackbar(SEND_INVITATION_SUCCESS, {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.invitationStatus.status]);

    const emailHasError = emailError !== "";

    const handleEmailOnChange = (anEmail) => {
        setEmail(anEmail);
        const emailIsValid = validEmail(anEmail);
        if (emailIsValid) setEmailError("");
        else setEmailError(INVALID_EMAIL);
    };

    const onClick = () => {
        if (validEmail(email)) dispatch(sendInvitation(email, role));
        else {
            if (!validEmail(email)) setEmailError(INVALID_EMAIL);
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const renderRoles = () => {
        return VALID_ROLES.map(({ value, label }) => (
            <FormControlLabel
                value={value}
                control={<Radio color="primary" />}
                label={label}
                labelPlacement="start"
            />
        ));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CardGiftcardIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {CREATE_INVITATION}
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        value={role}
                        onChange={handleRoleChange}
                    >
                        {renderRoles()}
                    </RadioGroup>
                </FormControl>
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
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onClick()}
                    >
                        {SEND_INVITATION}
                    </Button>
                    {props.invitationStatus.status.state === LOADING && (
                        <Spinner />
                    )}
                </form>
                <MyDialog
                    title={DIALOG_TITLE}
                    description={DIALOG_DESCRIPTION}
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
    invitationStatus: state.invitationStatus,
});

CreateInvitation.propTypes = {
    invitationStatus: object,
};

export default withRouter(connect(mapStateToProps)(CreateInvitation));
