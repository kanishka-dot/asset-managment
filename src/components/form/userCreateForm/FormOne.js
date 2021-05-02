import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FORM_INITAL_VALUE, FORM_CLEAR } from "./DataState";
import { Alert } from "@material-ui/lab";
import { PORT, URL } from "../../../connection/defaultconfig";
import { axios } from "../../../connection/axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Modal,
  IconButton,
  InputLabel,
  Input,
  Snackbar,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  left_margin_itmgrp: {
    marginLeft: 80,
  },
  left_margin_sup: {
    marginLeft: 60,
  },
  txt_userid: {
    width: "26ch",
  },
  margin: {
    margin: theme.spacing(0),
  },
  textField: {
    width: "28ch",
  },
  textField_select: {
    width: "22ch",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function Form_1() {
  const classes = useStyles();
  const [value, setValue] = useState(FORM_INITAL_VALUE);

  const responsive = "vertical";
  const tableBodyHeight = "100%";
  const tableBodyMaxHeight = "";
  const [open, setOpen] = useState(false);
  const [user_update, setUserUpdate] = useState(false);
  const [disable_userid, setDisable_userid] = useState(true);
  const [disable_location, setDisable_location] = useState(false);
  const [disable_fields, setDisable_fields] = useState(true);
  const [type, setType] = useState("location");
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    NIC: false,
  });
  const [dirty] = useState({
    NIC: "Invalid NIC Number",
  });

  const location = [
    ["100", "Head Office"],
    ["10", "Nawinna"],
    ["25", "Dehiwala SC"],
  ];

  const role = [
    ["1", "ADMIN"],
    ["2", "MANAGER"],
    ["3", "OFFICER"],
    ["4", "USER"],
  ];

  const pickList_header = ["ID", "Name"];

  const handleRowClick = (dataIndex) => {
    if (type === "location") {
      setValue({ ...value, location: dataIndex[0] });
    } else {
      setValue({ ...value, role: dataIndex[0] });
    }

    pickListClose();
  };

  const picklistOptions = {
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

  function picklistData() {
    if (type === "location") {
      return location;
    } else {
      return role;
    }
  }

  //check location value exsist to enable user id field

  useEffect(() => {
    if (value.location) {
      setDisable_userid(false);
    }
  }, [value.location]);

  const pickListOpen = (type) => {
    setType(type);
    setModalOpen(true);
  };

  const pickListClose = () => {
    setModalOpen(false);
  };

  const handleChange = (props) => (event) => {
    if (props === "NIC") {
      if (/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(event.target.value)) {
        setError({ ...error, [props]: false });
        setValue({ ...value, [props]: event.target.value });
      } else {
        setError({ ...error, [props]: true });
        setValue({ ...value, [props]: event.target.value });
      }
    } else {
      setValue({ ...value, [props]: event.target.value });
    }
  };

  const pushData = async () => {
    axios
      .post(`http://${URL}:${PORT}/user/createuser`, {
        userpk: {
          userid: value.userId,
          locationid: value.location,
        },
        name: value.userName,
        nic: value.NIC,
        password: "12345678",
        roleid: value.role,

        status: value.status,
        mod_by: "kanishka",
        mod_date: "2021-04-18",
        cre_by: "kanishka",
        cre_date: "2021-04-18",
      })
      .then(
        (response) => {
          console.log(response);
          setMessage("User Successfully created");
          setSeverity("success");
          setOpen(true);
          handleClear();
        },
        (error) => {
          setMessage("Unxepected Error");
          setSeverity("error");
          setOpen(true);
          handleClear();
          console.log(error);
        }
      );
  };

  const getData = async (name) => {
    axios
      .get(`http://${URL}:${PORT}/user/getuser/${value.location}/${name}`)
      .then(
        (response) => {
          if (response.data !== "") {
            console.log(response);
            setUserUpdate(true);
            setDisable_userid(true);
            setDisable_location(true);
            setDisable_fields(false);
            setMessage("User Already Exsist");
            setSeverity("info");
            setOpen(true);
            setValue({
              ...value,
              userName: response.data.name,
              NIC: response.data.nic,
              role: response.data.roleid,
              location: response.data.locationid,
              status: response.data.status,
            });
          } else {
            console.log(response.data);
            setDisable_fields(false);
            setUserUpdate(false);
          }
        },
        (error) => {
          setMessage("Unxepected Error");
          setSeverity("error");
          setOpen(true);
          handleClear();
          console.log(error);
        }
      );
  };

  // update existing inventory item data
  const updateData = async () => {
    axios
      .post(`http://${URL}:${PORT}/user/updateuser`, {
        userid: value.userId,
        name: value.userName,
        nic: value.NIC,
        roleid: value.role,
        locationid: value.location,
        status: value.status,
        mod_by: "kanishka",
        mod_date: "2021-04-18",
      })
      .then(
        (response) => {
          console.log(response);
          setMessage(response.data);
          setSeverity("success");
          setOpen(true);
          handleClear();
        },
        (error) => {
          setMessage("Unxepected Error");
          setSeverity("error");
          setOpen(true);
          handleClear();
          console.log(error);
        }
      );
  };

  function checkUserId(event) {
    const name = event.target.value;
    if (name.trim() !== "") {
      getData(name);
    }
  }

  const handleSubmit = () => {
    if (value.userId.trim() === "") {
      setMessage("User ID is Required");
      setOpen(true);
    } else if (value.location === "") {
      setMessage("Location code is Required");
      setOpen(true);
    } else if (value.role === "") {
      setMessage("Role is Required");
      setOpen(true);
    } else if (value.userName.trim() === "") {
      setMessage("User Name is Required");
      setOpen(true);
    } else if (value.NIC.trim() === "") {
      setMessage("Nic No is Required");
      setOpen(true);
    } else {
      if (user_update) {
        updateData();
      } else {
        pushData();
      }
    }
  };

  function handleClear() {
    setValue(FORM_CLEAR);

    setUserUpdate(false);
    setDisable_userid(true);
    setDisable_fields(true);
    setDisable_location(false);
  }

  const handleSnackBarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const body = (
    <div className={classes.paper_modal}>
      <MUIDataTable
        title={"Pick List"}
        data={picklistData()}
        columns={pickList_header}
        options={picklistOptions}
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
        autoHideDuration={2000}
      >
        <Alert onClose={handleSnackBarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Location
            </InputLabel>
            <Input
              id="standard-adornment-password"
              value={value.location}
              disabled={disable_location}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    disabled={disable_location}
                    onClick={() => {
                      pickListOpen("location");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={3} className={classes.left_margin_itmgrp}>
          <TextField
            className={classes.txt_userid}
            disabled={disable_userid}
            id="userid"
            label="User ID"
            name="userId"
            value={value.userId}
            onChange={handleChange("userId")}
            onBlur={checkUserId}
          />
        </Grid>

        <Grid item xs={3} className={classes.left_margin_sup}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Role</InputLabel>
            <Input
              id="standard-adornment-password"
              value={value.role}
              disabled={disable_fields}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disable_fields}
                    aria-label="toggle password visibility"
                    onClick={() => {
                      pickListOpen("role");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            disabled={disable_fields}
            id="userName"
            label="User name"
            name="userName"
            value={value.userName}
            onChange={handleChange("userName")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled={disable_fields}
            error={error.NIC}
            id="NIC"
            label="NIC"
            name="NIC"
            value={value.NIC}
            onChange={handleChange("NIC")}
            helperText={error.NIC ? dirty.NIC : ""}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              name="status"
              value={value.status}
              onChange={handleChange("status")}
            >
              <FormControlLabel
                value="active"
                disabled={disable_fields}
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                disabled={disable_fields}
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          disabled={disable_fields}
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          {user_update === true ? "Update" : "Create"}
        </Button>
      </div>
    </React.Fragment>
  );
}
