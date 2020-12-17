import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Data from "../../data/inventory.create.data";
import InputMask from "react-input-mask";
import {FORM_INITAL_VALUE} from "./DataState"



export default function AddressForm() {
  
    const handleInputChange = (e) => {

          const { name, value } = e.target;
          setValues({ ...values, [name]: value });
        
    };

  const [values, setValues] = useState(FORM_INITAL_VALUE);

  /*Drop down list items mapping*/

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
        Basic Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Item Code"
            name="itemCode"
            value={values.itemCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Item Group"
            name="itemGroup"
            value={values.itemGroup}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Item Description"
            name="itemDesc"
            value={values.itemDesc}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputMask
            mask="99"
            disabled={false}
            maskChar=" "
            value={values.depRate}
            onChange={handleInputChange}
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
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-basic"
            label="Supplier ID"
            name="supNo"
            value={values.supNo}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputMask
            mask="9999999"
            onChange={handleInputChange}
            maskChar=" "
            value={values.cost}
          >
            {() => (
              <TextField id="standard-basic" label="Cost(Rs)" name="cost" />
            )}
          </InputMask>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
