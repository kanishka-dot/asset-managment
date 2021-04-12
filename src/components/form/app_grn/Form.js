import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
    Paper,
    Box,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Modal,
    Snackbar,
} from "@material-ui/core";
import CurrentDate from "../../utils/Date";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: "60rem",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "60rem",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    paper_modal: {
        position: "absolute",
        width: 500,
        backgroundColor: "white",
        padding: theme.spacing(2, 4, 3),
    },

    button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },

    buttonSave: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
        width: "8rem",
    },

    btn: {
        display: "flex",
        alignItems: "baseline",
        flexDirection: "row-reverse",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    heading: {
        marginBottom: theme.spacing(3),
    },
    margin: {
        margin: theme.spacing(0),
    },
    textField: {
        width: "25ch",
    },
}));

export default function InventoryIN() {
    const classes = useStyles();
    const responsive = "vertical";
    const tableBodyHeight = "100%";
    const tableBodyMaxHeight = "";
    const [open, setOpen] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false);
    const [severity, setSeverity] = useState("warning");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("supplier");
    const [tableData] = useState([]);
    const initialState = {
        docno: "",
        date: CurrentDate(),
        itemcode: "",
        itemid: "",
        diliveryperson: "",
        supplierno: "",
        cost: "",
        warranty: "",
        serialno: "",
        barcode: "",
        reffno: "",
    };

    const [value, setValue] = useState({
        docno: "",
        date: CurrentDate(),
        itemcode: "",
        supplierno: "",
        serialno: "",
        barcode: "",
        cost: "",
        warranty: "",
        diliveryperson: "",
        reffno: "",
    });

    const options = {
        elevation: 1,
        filter: false,
        print: false,
        download: false,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onRowsDelete: true,
        selectableRows: "multiple",
        rowsPerPage: 2,
        rowsPerPageOptions: [2],
        viewColumns: false
    };
    const header = [
        "Document No",
        "Date",
        "User"
    ];



    /* pick list data select function*/
    const handleRowClick = (dataIndex) => {
        if (type === "supplier") {
            setValue({ ...value, supplierno: dataIndex[0] });
        } else {
            setValue({ ...value, itemcode: dataIndex[0] });
        }


    };



    const handleSnackBarClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };


    function handleDateChange(event) {
        setValue({ ...value, date: event.target.value });
        console.log(event.persist);
    }




    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleSnackBarClose}
                autoHideDuration={2000}
            >
                <Alert onClose={handleSnackBarClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

            {/* </Snackbar> */}
            <main className={classes.layout}>
                <Paper className={classes.paper} elevation={2}>
                    <Typography variant="h6" gutterBottom className={classes.heading}>
                        Inventory GRN Approvel
          </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                type="date"
                                label="From Date"
                                defaultValue={CurrentDate()}
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                type="date"
                                label="To Date"
                                defaultValue={CurrentDate()}
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                  
                            <Box className={classes.btn}>
                                <Button
                                    className={classes.buttonSave}
                                    variant="contained"
                                    color="primary"
                                >
                                    Search
                             </Button>
                            </Box>
                

                        <Grid item xs={12}>
                            <MUIDataTable
                                title={"Filter GRN"}

                                columns={header}
                                options={options}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">
                                    Supplier No
                </InputLabel>
                                <Input
                                    name="supplier"
                                    value={value.supplierno}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">
                                    Item Code
                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    value={value.itemcode}

                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                id="cost"
                                label="Cost(Rs.)"
                                name="cost"
                                value={value.cost}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="serialno"
                                label="Serial No"
                                name="serialno"
                                value={value.serialno}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="barcode"
                                label="Barcode"
                                name="barcode"
                                value={value.barcode}

                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="warranty"
                                label="Warranty (Months)"
                                name="warranty"
                                value={value.warranty}

                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="refno"
                                label="Refferance No"
                                name="reffno"
                                value={value.reffno}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="diliveryperson"
                                label="Delivery person"
                                name="diliveryperson"
                                value={value.diliveryperson}

                            />
                        </Grid>
                    </Grid>

                    <Box className={classes.btn}>
                        <Button
                            className={classes.buttonSave}
                            variant="contained"
                            color="primary"
                        >
                            Approve
            </Button>
                    </Box>
                </Paper>
            </main>
        </React.Fragment>
    );
}
