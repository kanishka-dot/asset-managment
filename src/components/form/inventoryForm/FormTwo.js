import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Data from "../../../data/inventory.create.data";
import { InputLabel, Select } from "@material-ui/core";

export default function PaymentForm({ formData, setValues }) {
  const {
    mainCatgry,
    subCatgry,
    brand,
    model,
    processor,
    ram,
    capacity,
    ref1,
    ref2,
  } = formData;

  const mainCat = Data.mainCat.map((data) => (
    <option key={data.title} value={data.title}>
      {data.title}
    </option>
  ));

  const subCat = Data.subCat.map((data) => (
    <option key={data.title} value={data.title}>
      {data.title}
    </option>
  ));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        More Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="age-native-simple">Main Catagory</InputLabel>
          <Select
            fullWidth
            native
            labelId="label"
            id="select"
            name="mainCatgry"
            value={mainCatgry}
            onChange={setValues}
          >
            <option value="" />
            {mainCat}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="age-native-simple">Sub Catagory</InputLabel>
          <Select
            fullWidth
            native
            labelId="label"
            name="subCatgry"
            id="select"
            value={subCatgry}
            onChange={setValues}
          >
            <option value="" />
            {subCat}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Brand"
            name="brand"
            value={brand}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Model"
            name="model"
            value={model}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Processor"
            name="processor"
            value={processor}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="standard-basic"
            label="RAM"
            name="ram"
            value={ram}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Capacity"
            name="capacity"
            value={capacity}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Ref1"
            name="ref1"
            value={ref1}
            onChange={setValues}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Ref2"
            name="ref2"
            value={ref2}
            onChange={setValues}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
