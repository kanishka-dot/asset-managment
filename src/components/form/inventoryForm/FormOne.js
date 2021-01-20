import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

export default function AddressForm({ formData, setValues }) {
  const {
    itemCode,
    itemGroup,
    itemDesc,
    depRate,
    supNo,
    cost,
    status,
  } = formData;

  console.log(formData);

  /*Drop down list items mapping*/

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            fullWidth
            id="standard-basic"
            label="Item Code"
            name="itemCode"
            value={itemCode}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Item Group"
            name="itemGroup"
            value={itemGroup}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Item Description"
            name="itemDesc"
            value={itemDesc}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12}>
          <InputMask
            mask="99"
            disabled={false}
            maskChar=" "
            value={depRate}
            onChange={setValues}
          >
            {() => (
              <TextField
                id="standard-basic"
                label="Depriciation Rate(%)"
                name="depRate"
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="standard-basic"
            label="Supplier ID"
            name="supNo"
            value={supNo}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputMask
            mask="9999999"
            onChange={setValues}
            maskChar=" "
            value={cost}
          >
            {() => (
              <TextField id="standard-basic" label="Cost(Rs)" name="cost" />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup row name="status" value={status} onChange={setValues}>
              <FormControlLabel
                value="Active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="Incactive"
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
