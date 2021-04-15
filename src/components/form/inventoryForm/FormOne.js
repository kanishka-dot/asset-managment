import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
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
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  left_margin: {
    marginLeft: 50
  },

  margin: {
    margin: theme.spacing(0),
  },
  textField: {
    width: "25ch",
  },
}));


export default function Form_1({ formData, setValues }) {
  console.log(setValues);
  
  const classes = useStyles();
  const { itemCode, itemGroup, itemDesc, supNo, status } = formData;
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
      setValues({ supplierno: dataIndex[0] });
    } else {
      setValues({ itemcode: dataIndex[0] });
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

  /*Drop down list items mapping*/

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

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },]



  return (
   
    
    <React.Fragment>
     
      <Modal className={classes.modal} open={ModalOpen} onClose={pickListClose}>
        {body}
      </Modal>
      <Typography variant="h6" gutterBottom>
        Basic Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="itemCode"
            label="Item Code"
            name="itemCode"
            value={itemCode}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Item Group
                </InputLabel>
            <Input
              id="standard-adornment-password"
              value={itemGroup}
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
        <Grid item xs={3} className={classes.left_margin}>
          <Autocomplete
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            
            renderInput={(params) => <TextField {...params}     id="itemCode"
            label="Item Code"
            name="itemCode"
            value={itemCode}
            onChange={setValues} label="Combo box" variant="outlined" />}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="itemDesc"
            label="Item Description"
            name="itemDesc"
            value={itemDesc}
            onChange={setValues}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup name="status" value={status} onChange={setValues}>
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
    </React.Fragment>
  );
}
