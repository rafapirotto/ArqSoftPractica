import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = ({ selectedDate, handleOnChange, label }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label={label}
                    value={selectedDate}
                    onChange={(date) => handleOnChange(date)}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;
