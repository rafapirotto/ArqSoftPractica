import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { useSnackbar } from "notistack";

import useStyles from "./styles";
import { getPreferences, editPreferences } from "./duck/operations";
import {
    ERROR,
    SUCCESS,
    LOADING,
    AUTO_HIDE_DURATION,
    SCREEN_LOCATION,
    VALID_SEVERITIES,
} from "../../common/constants";
import Spinner from "../../common/Components/Spinner";
import { DASHBOARD_ROUTE } from "../../routes";

const Preferences = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const getPreferencesStatus = props.getPreferencesStatus.status;
    const editPreferencesStatus = props.editPreferencesStatus.status;
    const {
        state: getPreferencesState,
        payload: preferences,
    } = getPreferencesStatus;
    const { state: editPreferencesState } = editPreferencesStatus;

    const [
        newErrorAssignedPreference,
        setNewErrorAssignedPreference,
    ] = useState(null);
    const [
        unassignedErrorsPreference,
        setUnassignedErrorsPreference,
    ] = useState(null);

    useEffect(() => {
        dispatch(getPreferences());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (editPreferencesState === SUCCESS) {
            enqueueSnackbar("Se han editado las preferencias con éxito.", {
                variant: SUCCESS,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            dispatch(getPreferences());
        } else if (editPreferencesState === ERROR) {
            enqueueSnackbar("No se han podido editar las preferencias.", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
            dispatch(getPreferences());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editPreferencesState]);

    useEffect(() => {
        if (getPreferencesState === SUCCESS) {
            const { newErrorAssigned, unassignedErrors } = preferences;
            setNewErrorAssignedPreference(newErrorAssigned);
            setUnassignedErrorsPreference(unassignedErrors);
        } else if (getPreferencesState === ERROR) {
            props.history.push(DASHBOARD_ROUTE);
            enqueueSnackbar("No se han podido obtener las preferencias.", {
                variant: ERROR,
                autoHideDuration: AUTO_HIDE_DURATION,
                anchorOrigin: SCREEN_LOCATION,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getPreferencesStatus]);

    const handleNewErrorAssignedPreferenceFrequency = (event) => {
        const frequency = event.target.value;
        setNewErrorAssignedPreference({
            ...newErrorAssignedPreference,
            frequency,
        });
    };

    const renderFrequencyNewErrorAssignedPreference = () => {
        const frequency = [];
        for (let index = 0; index < 24; index++) {
            frequency[index] = index;
        }
        return (
            <FormControl
                className={classes.formControl}
                style={{ minWidth: 150 }}
            >
                <InputLabel id="frequency-label">Horario</InputLabel>
                <Select
                    labelId="frequency-label"
                    id="frequency-label-id"
                    value={newErrorAssignedPreference.frequency || 0}
                    onChange={handleNewErrorAssignedPreferenceFrequency}
                >
                    <MenuItem value={-1}>Inmediatamente</MenuItem>
                    {frequency.map((freq) => (
                        <MenuItem value={freq}>{`${freq} : 00`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    const handleNewErrorAssignedPreferenceChange = (event) => {
        const value = event.target.value;
        const preference = value === "true";
        const frequency = newErrorAssignedPreference.frequency || 0;
        setNewErrorAssignedPreference({
            ...newErrorAssignedPreference,
            frequency,
            on: preference,
        });
    };

    const handleUnassignedErrorsPreferenceChange = (event) => {
        const value = event.target.value;
        const preference = value === "true";
        setUnassignedErrorsPreference({
            on: preference,
        });
    };

    const isInArray = (value, array) =>
        array.findIndex((val) => val === value) > -1;

    const handleSeverityChange = (value) => {
        let updatedSeverities = newErrorAssignedPreference.severities;
        if (isInArray(value, updatedSeverities)) {
            updatedSeverities = updatedSeverities.filter(
                (val) => val !== value
            );
        } else {
            updatedSeverities.push(value);
        }
        setNewErrorAssignedPreference({
            ...newErrorAssignedPreference,
            severities: updatedSeverities,
        });
    };

    const checked = (value) => {
        return (
            newErrorAssignedPreference.severities &&
            newErrorAssignedPreference.severities.findIndex(
                (val) => val === value
            ) > -1
        );
    };

    const renderSeverities = () => {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography component="h1" variant="h6">
                        Severidades
                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormGroup>
                        {VALID_SEVERITIES.map(({ value, label }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={value}
                                        checked={checked(value)}
                                        onChange={() => {
                                            handleSeverityChange(value);
                                        }}
                                        color="primary"
                                    />
                                }
                                label={label}
                            />
                        ))}
                    </FormGroup>
                </div>
            </div>
        );
    };

    const renderNewErrorAssignedPreferences = () => {
        return (
            <div>
                <FormControl className={classes.form} component="fieldset">
                    <Typography component="h1" variant="h6">
                        Error asignado
                    </Typography>
                    <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        value={newErrorAssignedPreference.on}
                        onChange={handleNewErrorAssignedPreferenceChange}
                    >
                        <FormControlLabel
                            value={false}
                            control={<Radio color="primary" />}
                            label="Apagadas"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value={true}
                            control={<Radio color="primary" />}
                            label="Encendidas"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                    {newErrorAssignedPreference.on &&
                        renderFrequencyNewErrorAssignedPreference()}
                </FormControl>
                {newErrorAssignedPreference.on && renderSeverities()}
            </div>
        );
    };

    const renderUnassignedErrorsPreferences = () => (
        <FormControl className={classes.form} component="fieldset">
            <Typography component="h1" variant="h6">
                2 días sin resolver
            </Typography>
            <RadioGroup
                row
                aria-label="position"
                name="position"
                value={unassignedErrorsPreference.on}
                onChange={handleUnassignedErrorsPreferenceChange}
            >
                <FormControlLabel
                    value={false}
                    control={<Radio color="primary" />}
                    label="Apagadas"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value={true}
                    control={<Radio color="primary" />}
                    label="Encendidas"
                    labelPlacement="start"
                />
            </RadioGroup>
        </FormControl>
    );

    const convertToServerTime = (number) => {
        const serverTime = 0; // respect to UTC time
        return number - serverTime;
    };

    const savePreferences = () => {
        const userTimeZoneOffset = new Date().getTimezoneOffset() / -60; // respect to UTC time
        const offset = -convertToServerTime(userTimeZoneOffset); //timeDiff
        dispatch(
            editPreferences({
                preferences: {
                    newErrorAssigned: {
                        ...newErrorAssignedPreference,
                        offset,
                    },
                    unassignedErrors: unassignedErrorsPreference,
                },
            })
        );
    };

    const handleOnClick = () => {
        if (newErrorAssignedPreference.on) {
            if (newErrorAssignedPreference.severities.length > 0) {
                savePreferences();
            } else {
                enqueueSnackbar("Seleccione al menos una severidad.", {
                    variant: ERROR,
                    autoHideDuration: AUTO_HIDE_DURATION,
                    anchorOrigin: SCREEN_LOCATION,
                });
            }
        } else {
            savePreferences();
        }
    };

    const renderPreferencesSettings = () => {
        if (newErrorAssignedPreference && unassignedErrorsPreference)
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <SettingsIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Notificaciones
                        </Typography>
                        {renderNewErrorAssignedPreferences()}
                        {renderUnassignedErrorsPreferences()}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => handleOnClick()}
                        >
                            Guardar
                        </Button>
                    </div>
                </Container>
            );
    };

    return (
        <div>
            {getPreferencesState === SUCCESS && renderPreferencesSettings()}
            {(getPreferencesState === LOADING ||
                editPreferencesState === LOADING) && <Spinner />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    getPreferencesStatus: state.getPreferencesStatus,
    editPreferencesStatus: state.editPreferencesStatus,
});

export default withRouter(connect(mapStateToProps)(Preferences));
