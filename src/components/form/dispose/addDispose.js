import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    buttonProgress: {
        position: "absolute",
        top: "70%",
        left: "45%",
        marginTop: -12,
        marginLeft: -12,
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
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    buttonSave: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
        width: "8rem",
    },

    box: {
        width: "57rem",
        height: "5rem",
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

export default function Transfer() {
    const classes = useStyles();
    const responsive = "vertical";
    const tableBodyHeight = "100%";
    const tableBodyMaxHeight = "";
    const [open, setOpen] = useState(false);
    const [dtl_fld, setDtl_fld] = useState(false);
    const [rec_fld, setRec_fld] = useState(true);
    const [ModalOpen, setModalOpen] = useState(false);
    const [severity, setSeverity] = useState("warning");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("location");
    const [inventory, setInventory] = useState();
    const [locations, setLocations] = useState();
    const [tableData, setTableData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saveBtnDisb, setSaveBtnDisb] = useState(false);
    const [data, setData] = useState({
        docno: "",
        doccode: "",
        seqno: "",
        serialno: "",
        itemcode: "",
        remark: "",
        techrec: "",
        status: "",
        app_by: "",
        app_date: "",
        mod_by: "",
        mod_date: "",
        cre_by: "",
        cre_date: "",
    });
    const [value, setValue] = useState({
        serialno: "",
        itemcode: "",
        remark: "",
        techrec: "",
    });
    const initialState = {
        remark: "",
        serialno: "",
        itemcode: "",
        techrec: "",
        cre_date: CurrentDate(),
    };

    const options = {
        elevation: 1,
        filter: false,
        print: false,
        download: false,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onRowsDelete: false,
        selectableRows: "single",
        rowsPerPageOptions: [3],
        rowsPerPage: 3,
    };
    const header = ["Serial No", "Item Code", "Remark"];

    const pickList_header = ["Serial No", "Item Code"];

    /* pick list data select function*/
    const handleRowClick = (dataIndex) => {
        if (type === "serialno") {
            setValue({ ...value, serialno: dataIndex[0], itemcode: dataIndex[1] });
        }
        pickListClose();
    };

    function setDefault() {
        setValue(initialState);
        setDtl_fld(false);
        setDataList([]);
        setTableData([]);
    }
    /**
     * Get data for picklist
     */
    const getLocInventory = () => {
        axios
            .get(`http://${URL}:${PORT}/inventory/location/25/LOC`)
            .then((response) => {
                const data = response.data.map((data) => [
                    data.serialno,
                    data.itemcode,
                ]);
                setInventory(data);
            })
            .catch((error) => console.error(`Error:${error}`));
    };

    const pushData = async () => {
        if (tableData[0] == null) {
            setOpen(true);
            setMessage("No data to save");
        } else {
            console.log(dataList);
            setLoading(true);
            setSaveBtnDisb(true);
            axios.post(`http://${URL}:${PORT}/inventory/dispose/data`, dataList).then(
                (response) => {
                    console.log(dataList);
                    console.log(response);
                    if (response.data[0] === "1") {
                        setSeverity("success");
                        setOpen(true);
                        setMessage(response.data[1]);
                        setDefault();
                        setLoading(false);
                        setSaveBtnDisb(false);
                        getLocInventory(); // fetch once again to update location inventory after success save
                    } else {
                        setSeverity("error");
                        setOpen(true);
                        setMessage(response.data[1]);
                        setDefault();
                        setLoading(false);
                        setSaveBtnDisb(false);
                    }
                },
                (error) => {
                    setSeverity("error");
                    setOpen(true);
                    setMessage("Unexpected Error. Check the console for more details");
                    setDefault();
                    setLoading(false);
                    setSaveBtnDisb(false);
                    console.log(error);
                }
            );
        }
    };

    const picklist_options = {
        elevation: 1,
        viewColumns: false,
        filter: false,
        print: false,
        download: false,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onRowsDelete: false,
        selectableRows: "none",
        onRowClick: handleRowClick,
    };

    /*change picklist based on field type select*/
    function picklistData() {
        if (type === "location") {
            return locations;
        } else {
            return inventory;
        }
    }

    // while data update in fileds this methods collect data to post( use to eliminate side effect in use state)
    useEffect(() => {
        setData({
            ...data,
            docno: "",
            doccode: "",
            seqno: "",
            serialno: value.serialno,
            itemcode: value.itemcode,
            remark: value.remark.trim(),
            techrec: value.techrec.trim(),
            status: "",
            app_by: "",
            app_date: "",
            mod_by: "kanishka",
            mod_date: CurrentDate(),
            cre_by: "kanishka",
            cre_date: CurrentDate(),
        });
    }, [value]);

    // Picklist call
    useEffect(() => {
        getLocInventory();
    }, []);

    // tolocation and MON no. must
    useEffect(() => {
        if (value.serialno !== "") {
            setRec_fld(false);
        } else {
            setRec_fld(true);
        }
    }, [value.serialno]);

    function requiredFeilds() {
        if (value.serialno === "") {
            setSeverity("warning");
            setOpen(true);
            setMessage("Serial No is Required");
        } else if (value.techrec.trim() === "") {
            setSeverity("warning");
            setOpen(true);
            setMessage("Tecnical Recomendation is Required");
        } else {
            return true;
        }
    }

    const pickListOpen = (type) => {
        setType(type);
        setModalOpen(true);
    };

    const pickListClose = () => {
        setModalOpen(false);
    };

    const handleSnackBarClose = (reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleChange = (props) => (event) => {
        setValue({ ...value, [props]: event.target.value });

        // setValue({ ...value, [props]: event.target.value });
    };

    function handleDateChange(event) {
        setValue({ ...value, cre_date: event.target.value });
        console.log(event.persist);
    }

    // used to check serial duplicate in the table
    function checkDuplicateSerial() {
        if (tableData[0] != undefined) {
            let element = new Array();
            for (let index = 0; index < tableData.length; index++) {
                element = tableData[index];

                if (element.includes(value.serialno, 0)) {
                    return true;
                }
            }
            return false;
        }

        return false;
    }

    // const handleClear = () => {
    //   setValue({ ...initialState });
    // };

    const addData = () => {
        if (requiredFeilds()) {
            if (checkDuplicateSerial()) {
                //check duplicate serial
                setSeverity("warning");
                setOpen(true);
                setMessage("Item Already Added");
            } else {
                tableData.push([value.serialno, value.itemcode, value.techrec]);
                dataList.push(data);
                setValue({
                    ...value,
                    itemcode: "",
                    serialno: "",
                    techrec:""
                });

                console.log(data);
            }
        }
    };

    const body = (
        <div className={classes.paper_modal}>
            <MUIDataTable
                title={"Pick List"}
                data={picklistData()}
                columns={pickList_header}
                options={picklist_options}
            />
        </div>
    );

    return (
        <React.Fragment>
            <Modal className={classes.modal} open={ModalOpen} onClose={pickListClose}>
                {body}
            </Modal>

            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleSnackBarClose}
                autoHideDuration={4000}
            >
                <Alert onClose={handleSnackBarClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

            {/* </Snackbar> */}
            <main className={classes.layout}>
                <Paper className={classes.paper} elevation={2}>
                    <Typography variant="h6" gutterBottom className={classes.heading}>
                        Add Inventory Dispose
          </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField
                                type="date"
                                label="Date"
                                disabled={true}
                                defaultValue={CurrentDate()}
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="remark"
                                label="Ref Remark"
                                name="remark"
                                value={value.remark}
                                onChange={handleChange("remark")}
                            />
                        </Grid>
                    </Grid>


                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">
                                    Serial No
                </InputLabel>
                                <Input
                                    id="serialno"
                                    value={value.serialno}
                                    disabled={dtl_fld}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                disabled={dtl_fld}
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    pickListOpen("serialno");
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="itemcode"
                                name="itemcode"
                                label="Item Code"
                                disabled={true}
                                value={value.itemcode}
                                onChange={handleChange("itemcode")}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="techrec"
                                disabled={rec_fld}
                                label="Technical Recomendation"
                                name="techrec"
                                value={value.techrec}
                                onChange={handleChange("techrec")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={addData}
                            >
                                Add
              </Button>
                        </Grid>
                    </Grid>
                    <Grid>
                        <MUIDataTable
                            title={"Details"}
                            data={tableData}
                            columns={header}
                            options={options}
                        />
                    </Grid>
                    <Box className={classes.btn}>
                        <div className={classes.wrapper}>
                            <Button
                                className={classes.buttonSave}
                                variant="contained"
                                color="primary"
                                onClick={pushData}
                                disabled={saveBtnDisb}
                            >
                                Save
              </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
                                />
                            )}
                        </div>
                        <div className={classes.wrapper}>
                            <Button
                                className={classes.buttonSave}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setDefault();
                                }}
                            >
                                Clear
              </Button>
                        </div>
                    </Box>
                </Paper>
            </main>
        </React.Fragment>
    );
}
