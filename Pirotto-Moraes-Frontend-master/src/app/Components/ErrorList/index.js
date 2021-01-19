import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { getErrorList } from "./duck/operations";
import { LOADING, ERROR, SUCCESS } from "../../common/constants";
import Spinner from "../../common/Components/Spinner";
import MyTable from "./table";

const ErrorList = (props) => {
    const dispatch = useDispatch();
    const status = props.getErrorListStatus.status;
    const [notResolvedButton, setNotResolvedButton] = useState(true);
    const [resolvedButton, setResolvedButton] = useState(false);

    useEffect(() => {
        dispatch(getErrorList("NO_RESUELTO"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderButtons = () => {
        return (
            <span style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    style={{ marginBottom: 10 }}
                    color={notResolvedButton ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setNotResolvedButton(true);
                        setResolvedButton(false);
                        dispatch(getErrorList("NO_RESUELTO"));
                    }}
                >
                    No resueltos
                </Button>
                <Button
                    style={{ marginBottom: 10 }}
                    color={resolvedButton ? "primary" : "default"}
                    variant="contained"
                    onClick={() => {
                        setResolvedButton(true);
                        setNotResolvedButton(false);
                        dispatch(getErrorList("RESUELTO"));
                    }}
                >
                    Resueltos
                </Button>
            </span>
        );
    };

    const renderComponent = () => {
        if (status.payload.length !== 0)
            return <MyTable data={status.payload} />;
        else return renderEmptyTableMessage();
    };

    const renderEmptyTableMessage = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" component="h2">
                {notResolvedButton
                    ? "No existen errores sin resolver todavía"
                    : "Todavia no se han resuelto errores"}
            </Typography>
        </div>
    );

    const renderErrorMessage = () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" component="h2">
                Hubo un error al obtener la lista de errores
            </Typography>
        </div>
    );

    return (
        <div>
            {renderButtons()}
            {status.state === SUCCESS && renderComponent()}
            {status.state === ERROR && renderErrorMessage()}
            {status.state === LOADING && <Spinner />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    getErrorListStatus: state.getErrorListStatus,
});

export default connect(mapStateToProps)(ErrorList);
