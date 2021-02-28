import React, { useState } from "react";
import { axios } from "../../../connection/axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

export default function FormOne(props) {
  const {
    suppname,
    NIC,
    suppadd,
    telephone,
    remark,
    refno,
    status,
  } = props.userValues;

  const errors = props.userErrors;

  const dirty = props.userDirty;

  const handleOnChange = props.handleChanges;

  // const getUser = async () => {
  //   const response = await axios
  //     .get("/user/getuser/10/kumara")
  //     .catch((err) => console.log("Error ", err));
  //   if (response) {
  //     console.log(response.data);
  //   }
  // };

  /*Drop down list items mapping*/

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Supplier Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            error={Boolean(errors.suppname && dirty.suppname)}
            id="standard-basic"
            label="Supplier Name"
            name="suppname"
            value={suppname}
            onChange={handleOnChange}
            helperText={
              Boolean(errors.suppname && dirty.suppname) ? errors.suppname : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={Boolean(errors.suppadd && dirty.suppadd)}
            id="standard-basic"
            label="Supplier Address"
            name="suppadd"
            value={suppadd}
            onChange={handleOnChange}
            helperText={
              Boolean(errors.suppadd && dirty.suppadd) ? errors.suppadd : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={Boolean(errors.NIC && dirty.NIC)}
            id="standard-basic"
            label="NIC"
            name="NIC"
            value={NIC}
            onChange={handleOnChange}
            helperText={Boolean(errors.NIC && dirty.NIC) ? errors.NIC : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={Boolean(errors.telephone && dirty.telephone)}
            id="standard-basic"
            label="Telephone"
            name="telephone"
            value={telephone}
            onChange={handleOnChange}
            helperText={
              Boolean(errors.telephone && dirty.telephone)
                ? errors.telephone
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={Boolean(errors.refno && dirty.refno)}
            id="standard-basic"
            label="Referance No"
            name="refno"
            value={refno}
            onChange={handleOnChange}
            helperText={
              Boolean(errors.refno && dirty.refno) ? errors.refno : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={Boolean(errors.remark && dirty.remark)}
            id="standard-basic"
            label="Remark"
            name="remark"
            value={remark}
            onChange={handleOnChange}
            helperText={
              Boolean(errors.remark && dirty.remark) ? errors.remark : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup name="status" value={status} onClick={handleOnChange}>
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
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
