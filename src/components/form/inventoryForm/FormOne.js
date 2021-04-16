import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FORM_INITAL_VALUE } from "./DataState";
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
    marginLeft: 40
  },
  left_margin_sup: {
    marginLeft: 100
  },


  margin: {
    margin: theme.spacing(0),
  },
  textField: {
    width: "28ch",
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
  const [type, setType] = useState("supplier");
  const [ModalOpen, setModalOpen] = useState(false);
  const [severity, setSeverity] = useState("warning");


  const supplier_date = [
    ["25425", "kamal tenakaon"],
    ["47200", "sadun nimalarathna"],
    ["69685", "Gunasearka perera"],
    ["95671", "malkanthi nona"],
    ["24872", "atek lanka"],
  ];


  const itemcode_date = [
    ["IT205", "Pos Machine"],
    ["PS2546", "Power Supply"],
    ["POS205", "Point of sale machine 01"],
    ["PC5458", "Executive PC"],
    ["PRN5254", "printer laserjet"],
  ];


  const pickList_header = ["ID", "Name"];

  const handleRowClick = (dataIndex) => {
    if (type === "supplier") {
      console.log(value.supNo);
      
      setValue({...value, supNo: dataIndex[0]});
    } else {
      setValue({...value, itemGroup: dataIndex[0] });
    }

    pickListClose();
    console.log(dataIndex[0]);
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
    console.log(props);
    
      setValue({ ...value, [props]: event.target.value });
    }



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
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="itemCode"
            label="Item Code"
            name="itemCode"
            value={value.itemCode}
            onChange={handleChange("itemCode")}
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

        <Grid item xs={12}>
          <TextField
            fullWidth
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
            id="standard-basic"
            label="Capacity"
            name="capacity"
            value={value.capacity}
            onChange={handleChange("capacity")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Ref1"
            name="ref1"
            value={value.ref1}
            onChange={handleChange("ref1")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Ref2"
            name="ref2"
            value={value.ref2}
            onChange={handleChange("ref2")}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup name="status" value={value.status} onChange={handleChange}>
              <FormControlLabel
                value="Active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="Insactive"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
  
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Create
        </Button>
        </div>
    </React.Fragment>
  );
}
