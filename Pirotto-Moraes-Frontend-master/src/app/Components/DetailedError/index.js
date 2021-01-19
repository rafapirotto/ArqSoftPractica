import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import EditIcon from "@material-ui/icons/Edit";
import { useSnackbar } from "notistack";
import CheckIcon from "@material-ui/icons/Check";

import useStyles from "./styles";
import { getError, resolveError, editError } from "./duck/operations";
import {
    ERROR,
    SUCCESS,
    LOADING,
    AUTO_HIDE_DURATION,
    SCREEN_LOCATION,
    EMPTY_FIELD_ERROR,
} from "../../common/constants";
import Spinner from "../../common/Components/Spinner";
import { DASHBOARD_ROUTE } from "../../routes";
import { isEmpty } from "../../utils";

const DetailedError = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const requestStatus = props.getErrorStatus.status;
    const resolveStatus = props.resolveErrorStatus.status;
    const editStatus = props.editErrorStatus.status;
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");
    const [id, setId] = useState("");
    const [editDisabled, setEditDisabled] = useState(true);
    const [assignedDeveloper, setAssignedDeveloper] = useState("");
    const [assignedDeveloperError, setAssignedDeveloperError] = useState("");
    const validSeverityValues = [
        { value: null, label: "-" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
    ];

    useEffect(() => {
        const pathname = props.location.pathname;
        const urlId = pathname.split("/detailed_error/")[1];
        dispatch(getError(urlId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { state, payload: errorDetails } = requestStatus;
        if (state === SUCCESS) {
            setErrorDetails(errorDetails);
        }
        setAssignedDeveloperError("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestStatus]);

    useEffect(() => {
        const { state: resolveState } = resolveStatus;
        if (resolveState === SUCCESS) {
            props.history.push(DASHBOARD_ROUTE);
            enqueueSnackbar("El error se resolvió con éxito", {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        if (resolveState === ERROR) {
            dispatch(getError(id));
            enqueueSnackbar("No se pudo resolver el error", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolveStatus]);

    useEffect(() => {
        const { state: editState, payload: errors } = editStatus;
        if (editState === SUCCESS) {
            enqueueSnackbar("El error se ha editado con éxito", {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            dispatch(getError(id));
        }
        if (editState === ERROR) {
            enqueueSnackbar("El error no se ha podido editar", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            setErrors(errors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editStatus]);

    const setErrors = (errors) => {
        errors.forEach(({ message, field }) => {
            setError(field, message);
        });
    };

    const setError = (field, message) => {
        switch (field) {
            case "assignedDeveloper":
                setAssignedDeveloperError(message);
                break;
            default:
                break;
        }
    };

    const setErrorDetails = (errorDetails) => {
        setTitle(errorDetails.title);
        setDescription(errorDetails.description);
        setSeverity(errorDetails.severity);
        setStatus(errorDetails.status);
        const developer =
            errorDetails.assignedDeveloper === null
                ? "-"
                : errorDetails.assignedDeveloper;
        setAssignedDeveloper(developer);
        setId(errorDetails._id);
    };

    const handleTitleOnChange = (aTitle) => {
        if (!editDisabled) {
            setTitle(aTitle);
            const titleIsValid = !isEmpty(aTitle);
            if (titleIsValid) setTitleError("");
            else setTitleError(EMPTY_FIELD_ERROR);
        }
    };

    const handleDescriptionOnChange = (aDescription) => {
        if (!editDisabled) {
            setDescription(aDescription);
        }
    };

    const handleSeverityOnchange = (aSeverity) => {
        if (!editDisabled) {
            setSeverity(aSeverity);
        }
    };

    const handleAssignedDeveloperOnChange = (anAssignedDeveloper) => {
        if (!editDisabled) {
            setAssignedDeveloper(anAssignedDeveloper);
        }
    };

    const validTitle = (aTitle) => !isEmpty(aTitle);

    const titleHasError = titleError !== "";

    const assignedDeveloperHasError = assignedDeveloperError !== "";

    const onClickEditButton = () => {
        const fields = {
            title,
            description,
            status,
            id,
        };
        if (assignedDeveloper !== "" && assignedDeveloper !== "-")
            fields.assignedDeveloper = assignedDeveloper;

        if (severity) fields.severity = severity;

        const allFieldsAreValid = validTitle(title);

        if (allFieldsAreValid) {
            dispatch(editError(fields));
            setEditDisabled(true);
        } else {
            setTitleError(EMPTY_FIELD_ERROR);
        }
    };

    const renderComponent = () => {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <InfoIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Detalle
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            value={title}
                            error={titleHasError}
                            onChange={(e) =>
                                handleTitleOnChange(e.target.value)
                            }
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="title"
                            label="Titulo"
                            id="title"
                            helperText={titleError}
                        />
                        <TextField
                            value={description}
                            onChange={(e) =>
                                handleDescriptionOnChange(e.target.value)
                            }
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Descripción"
                            id="description"
                        />
                        <InputLabel id="label">Severidad</InputLabel>
                        <Select
                            labelId="label"
                            id="severity-select"
                            value={severity}
                            onChange={(e) =>
                                handleSeverityOnchange(e.target.value)
                            }
                        >
                            {validSeverityValues.map(
                                ({ value, label }, index) => (
                                    <MenuItem key={index} value={value}>
                                        {label}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                        <TextField
                            value={status}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="status"
                            label="Estado"
                            id="status"
                        />
                        <TextField
                            error={assignedDeveloperHasError}
                            value={assignedDeveloper}
                            onChange={(e) =>
                                handleAssignedDeveloperOnChange(e.target.value)
                            }
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="assigned_developer"
                            label="Desarrollador asignado"
                            id="assigned_developer"
                            helperText={assignedDeveloperError}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color={editDisabled ? "primary" : "secondary"}
                            className={classes.submit}
                            onClick={() => setEditDisabled(!editDisabled)}
                        >
                            {editDisabled
                                ? "Habilitar edición"
                                : "Deshabilitar edición"}
                            <div style={{ marginLeft: 10 }}>
                                <EditIcon />
                            </div>
                        </Button>
                        {!editDisabled && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => onClickEditButton()}
                            >
                                Editar
                            </Button>
                        )}
                        {(requestStatus?.payload?.status === "NO_RESUELTO" ||
                            editStatus?.state === ERROR) && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                    dispatch(resolveError(id));
                                }}
                            >
                                Resolver
                                <div style={{ marginLeft: 10 }}>
                                    <CheckIcon />
                                </div>
                            </Button>
                        )}
                    </form>
                </div>
            </Container>
        );
    };

    const notifyError = () => {
        enqueueSnackbar("El id de ese error no existe", {
            variant: ERROR,
            autoHideDuration: AUTO_HIDE_DURATION,
            anchorOrigin: SCREEN_LOCATION,
        });
        props.history.push(DASHBOARD_ROUTE);
    };

    return (
        <div>
            {requestStatus.state === ERROR && notifyError()}
            {(requestStatus.state === SUCCESS ||
                editStatus.state === SUCCESS ||
                editStatus.state === ERROR) &&
                renderComponent()}
            {(requestStatus.state === LOADING ||
                editStatus.state === LOADING ||
                resolveStatus.state === LOADING) && <Spinner />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    getErrorStatus: state.getErrorStatus,
    resolveErrorStatus: state.resolveErrorStatus,
    editErrorStatus: state.editErrorStatus,
});

export default withRouter(connect(mapStateToProps)(DetailedError));
