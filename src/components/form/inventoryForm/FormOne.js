import React, { useState } from "react";
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
  Select,
  Snackbar,
  MenuItem,
  Typography,
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
    marginLeft: 40,
  },
  left_margin_sup: {
    marginLeft: 100,
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
  const [item_update, setItemUpdate] = useState(false);
  const [disable_itemcode, setDisable_itemcode] = useState(false);
  const [disable_fields, setDisable_fields] = useState(true);
  const [type, setType] = useState("supplier");
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");

  const supplier_date = [
    ["1", "kamal tenakaon"],
    ["5", "sadun nimalarathna"],
  ];

  const itemcode_date = [
    ["IT305", "Pos Machine"],
    ["CD202", "Power Supply"],
    ["CD201", "Point of sale machine 01"],
    ["CD204", "Executive PC"],
    ["CD255", "printer laserjet"],
  ];

  const pickList_header = ["ID", "Name"];

  const handleRowClick = (dataIndex) => {
    if (type === "supplier") {
      setValue({ ...value, supNo: dataIndex[0] });
    } else {
      setValue({ ...value, itemGroup: dataIndex[0] });
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
    if (type === "supplier") {
      return supplier_date;
    } else {
      return itemcode_date;
    }
  }

  const pickListOpen = (type) => {
    setType(type);
    setModalOpen(true);
  };

  const pickListClose = () => {
    setModalOpen(false);
  };

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };

  const pushData = async () => {
    axios
      .post(`http://${URL}:${PORT}/inventory/createitem`, {
        itemcode: value.itemCode,
        itemdesc: value.itemDesc,
        brand: value.brand,
        model: value.model,
        capacity: value.capacity,
        processor: value.processor,
        ram: value.ram,
        itemgroup: value.itemGroup,
        supplierid: value.supNo,
        status: value.status,
        type: value.type,
        mod_by: "kanishka",
        mod_date: "2021-04-18",
        cre_by: "kanishka",
        cre_date: "2021-04-18",
      })
      .then(
        (response) => {
          console.log(response);
          setMessage("Item Code Successfully created");
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
    axios.get(`http://${URL}:${PORT}/inventory/getitem/${name}`).then(
      (response) => {
        if (response.data !== "") {
          console.log(response);
          setItemUpdate(true);
          setDisable_itemcode(true);
          setDisable_fields(false);
          setMessage("Item Code Already Exsist");
          setSeverity("info");
          setOpen(true);
          setValue({
            ...value,
            itemGroup: response.data.itemgroup,
            itemDesc: response.data.itemdesc,
            type: response.data.type,
            supNo: response.data.supplierid,
            status: response.data.status,
            brand: response.data.brand,
            model: response.data.model,
            processor: response.data.processor,
            ram: response.data.ram,
            capacity: response.data.capacity,
          });
        } else {
          console.log(response.data);
          setDisable_fields(false);
          setItemUpdate(false);
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
      .post(`http://${URL}:${PORT}/inventory/updateItems`, {
        itemcode: value.itemCode,
        itemdesc: value.itemDesc,
        brand: value.brand,
        model: value.model,
        capacity: value.capacity,
        processor: value.processor,
        ram: value.ram,
        itemgroup: value.itemGroup,
        supplierid: value.supNo,
        status: value.status,
        type: value.type,
        mod_by: "kanishka",
        mod_date: "2021-04-18",
        cre_by: "kanishka",
        cre_date: "2021-04-18",
      })
      .then(
        (response) => {
          console.log(response);
          setMessage("Item Code Successfully updated");
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

  function checkItemCode(event) {
    const name = event.target.value;
    if (name.trim() !== "") {
      getData(name);
    }
  }

  const handleSubmit = () => {
    if (value.itemCode.trim() === "") {
      setMessage("Item Code is Required");
      setOpen(true);
    } else if (value.itemGroup.trim() === "") {
      setMessage("Item group is Required");
      setOpen(true);
    } else if (value.supNo.trim() === "") {
      setMessage("Supplier is Required");
      setOpen(true);
    } else if (value.itemDesc.trim() === "") {
      setMessage("Item Descrption is Required");
      setOpen(true);
    } else if (value.brand.trim() === "") {
      setMessage("Item brand is Required");
      setOpen(true);
    } else if (value.model.trim() === "") {
      setMessage("Item model is Required");
      setOpen(true);
    } else if (value.type.trim() === "") {
      setMessage("Item Type is required");
      setOpen(true);
    } else {
      if (item_update) {
        updateData();
      } else {
        pushData();
      }
    }
  };

  function handleClear() {
    setValue(FORM_CLEAR);
    setItemUpdate(false);
    setDisable_itemcode(false);
    setDisable_fields(true);
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
  const modal_message = (
    <div className={classes.paper_modal}>
      <Typography>Item Code Already Exsist</Typography>
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
          <TextField
            fullWidth
            disabled={disable_itemcode}
            id="itemCode"
            label="Item Code"
            name="itemCode"
            value={value.itemCode}
            onChange={handleChange("itemCode")}
            onBlur={checkItemCode}
          />
        </Grid>
        <Grid item xs={3} className={classes.left_margin_itmgrp}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Item Group
            </InputLabel>
            <Input
              id="standard-adornment-password"
              value={value.itemGroup}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disable_fields}
                    aria-label="toggle password visibility"
                    onClick={() => {
                      pickListOpen("item");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={3} className={classes.left_margin_sup}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Supplier
            </InputLabel>
            <Input
              id="standard-adornment-password"
              value={value.supNo}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={disable_fields}
                    aria-label="toggle password visibility"
                    onClick={() => {
                      pickListOpen("supplier");
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
            id="itemDesc"
            label="Item Description"
            name="itemDesc"
            value={value.itemDesc}
            onChange={handleChange("itemDesc")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled={disable_fields}
            id="standard-basic"
            label="Brand"
            name="brand"
            value={value.brand}
            onChange={handleChange("brand")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled={disable_fields}
            id="standard-basic"
            label="Model"
            name="model"
            value={value.model}
            onChange={handleChange("model")}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            disabled={disable_fields}
            id="standard-basic"
            label="Processor"
            name="processor"
            value={value.processor}
            onChange={handleChange("processor")}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            disabled={disable_fields}
            id="standard-basic"
            label="RAM"
            name="ram"
            value={value.ram}
            onChange={handleChange("ram")}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            disabled={disable_fields}
            id="standard-basic"
            label="Capacity"
            name="capacity"
            value={value.capacity}
            onChange={handleChange("capacity")}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl
            className={clsx(classes.margin, classes.textField_select)}
          >
            <InputLabel>Type</InputLabel>
            <Select
              id="type"
              disabled={disable_fields}
              name="type"
              value={value.type}
              onChange={handleChange("type")}
            >
              <MenuItem value={"Primary"}>Primary</MenuItem>
              <MenuItem value={"MRO"}>MRO</MenuItem>
            </Select>
          </FormControl>
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
          {item_update === true ? "Update" : "Create"}
        </Button>
      </div>
    </React.Fragment>
  );
}
