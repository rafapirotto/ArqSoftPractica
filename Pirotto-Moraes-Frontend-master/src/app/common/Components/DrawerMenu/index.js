import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ViewListIcon from "@material-ui/icons/ViewList";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import useStyles from "./styles";
import {
    CREATE_INVITATION_ROUTE,
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    STATISTICS_REPORT_ROUTE,
    API_KEY_ROUTE,
    TOP10_REPORT_ROUTE,
    UNASSIGNED_REPORT_ROUTE,
    PREFERENCES_ROUTE,
    BILLING_ROUTE,
} from "../../../routes";
import { destroySession } from "../../../Components/Logout/duck/actions";
import {
    SUCCESS_LOGOUT_MESSAGE,
    SUCCESS,
    AUTO_HIDE_DURATION,
    SCREEN_LOCATION,
    CENTINELA,
} from "../../constants";
import { isAdmin } from "../../../utils";

const DrawerMenu = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const DEVELOPER_OPTIONS = [
        {
            label: "Listado de errores",
            icon: <ViewListIcon />,
            route: DASHBOARD_ROUTE,
        },
        {
            label: "Ajuste de preferencias",
            icon: <SettingsIcon />,
            route: PREFERENCES_ROUTE,
        },
    ];

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getAdminOptions = () => {
        const ADMIN_ONLY_OPTIONS = [];

        ADMIN_ONLY_OPTIONS.push({
            label: "Reporte de estadísticas de errores",
            icon: <EqualizerIcon />,
            route: STATISTICS_REPORT_ROUTE,
        });
        ADMIN_ONLY_OPTIONS.push({
            label: "Reporte top 10",
            icon: <FormatListNumberedIcon />,
            route: TOP10_REPORT_ROUTE,
        });
        ADMIN_ONLY_OPTIONS.push({
            label: "Reporte de errores no asignados",
            icon: <PersonAddDisabledIcon />,
            route: UNASSIGNED_REPORT_ROUTE,
        });
        ADMIN_ONLY_OPTIONS.push({
            label: "Gestión de clave de aplicación",
            icon: <VpnKeyIcon />,
            route: API_KEY_ROUTE,
        });
        ADMIN_ONLY_OPTIONS.push({
            label: "Enviar invitación",
            icon: <MailIcon />,
            route: CREATE_INVITATION_ROUTE,
        });
        ADMIN_ONLY_OPTIONS.push({
            label: "Visualizar consumo",
            icon: <AccountBalanceIcon />,
            route: BILLING_ROUTE,
        });
        DEVELOPER_OPTIONS.forEach((option) => {
            ADMIN_ONLY_OPTIONS.push(option);
        });
        return ADMIN_ONLY_OPTIONS;
    };

    const getDeveloperOptions = () => DEVELOPER_OPTIONS;

    const logout = () => {
        dispatch(destroySession());
        enqueueSnackbar(SUCCESS_LOGOUT_MESSAGE, {
            variant: SUCCESS,
            autoHideDuration: AUTO_HIDE_DURATION,
            anchorOrigin: SCREEN_LOCATION,
        });
        props.history.push(LOGIN_ROUTE);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box display="flex" flexGrow={1}>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                            onClick={() => {
                                props.history.push(DASHBOARD_ROUTE);
                                handleDrawerClose();
                            }}
                        >
                            {CENTINELA}
                        </Typography>
                    </Box>
                    <Button color="inherit" onClick={() => logout()}>
                        <ExitToAppIcon />
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <List>
                    {(isAdmin()
                        ? getAdminOptions()
                        : getDeveloperOptions()
                    ).map(({ label, icon, route }, index) => {
                        return (
                            <ListItem
                                key={index}
                                button
                                onClick={() => {
                                    props.history.push(route);
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
};

export default withRouter(DrawerMenu);
