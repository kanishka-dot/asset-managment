import React from "react";
import MultiForm from "../../components/form/MultiForm";
import { Grid } from "@material-ui/core";

const divStyle = {
  marginTop: "1rem",
  marginLeft: "15rem",
};

function Create() {
  return (
    <div style={divStyle}>
      <Grid container>
        <Grid item xs>
          <MultiForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default Create;

// import React, { useState } from "react";
// import clsx from "clsx";
// import {
//   Grid,
//   TextField,
//   makeStyles,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormControl,
//   Button,
//   Paper,
//   Container,
//   Select,
//   InputLabel,
//   Typography,
// } from "@material-ui/core";
// import Data from "../../data/inventory.create.data";
// import InputMask from "react-input-mask";

// const useStyle = makeStyles((theme) => ({
//   // container: {
//   //   marginTop: "130px",
//   //   marginLeft: "450px",
//   //   width: "70%",
//   //   height: "2500",
//   // },
//   button: {
//     margin: theme.spacing(6, 1, 2),
//   },

//   container: {
//     paddingTop: theme.spacing(15),
//     paddingLeft: theme.spacing(40),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(10),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//   },

//   root: {
//     "& .MuiFormControl-root": {
//       width: "100%",
//       margin: theme.spacing(1),
//       margintop: "65px",
//     },
//   },
// }));

// const initalValues = {
//   itemCode: "",
//   itemGroup: "",
//   itemDesc: "",
//   depRate: "",
//   cost: "",
//   supNo: "",
//   status: "active",
//   mainCat: "",
//   subCat: "",
//   brand: "",
//   model: "",
//   processor: "",
//   ram: "",
//   capacity: "",
//   ref1: "",
//   ref2: "",
//   ref3: "",
// };

// export default function InventoryForm() {
//   console.log("Its woeking");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setValues({ ...values, [name]: value });
//   };

//   function handleOnClickAction() {}

//   const [values, setValues] = useState(initalValues);
//   const classes = useStyle();
//   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
//   /*Drop down list items mapping*/

//   const mainCat = Data.mainCat.map((data) => (
//     <option key={data.title} value={data.title}>
//       {data.title}
//     </option>
//   ));

//   const subCat = Data.subCat.map((data) => (
//     <option key={data.title} value={data.title}>
//       {data.title}
//     </option>
//   ));

//   /**********************************/

//   return (
//     <Container maxWidth="lg" className={classes.container}>
//       <Grid container spacing={3}>
//         <Paper className={fixedHeightPaper}>
//           <Typography variant="h6" gutterBottom>
//             Inventory Item Create
//           </Typography>
//           <form className={classes.root}>
//             <Grid container alignItems="stretch" spacing={2}>
//               <Grid item md>
//                 <TextField
//                   id="standard-basic"
//                   label="Item Code"
//                   name="itemCode"
//                   value={values.itemCode}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Item Group"
//                   name="itemGroup"
//                   value={values.itemGroup}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Item Description"
//                   name="itemDesc"
//                   value={values.itemDesc}
//                   onChange={handleInputChange}
//                 />
//                 <InputMask
//                   mask="999"
//                   disabled={false}
//                   maskChar=" "
//                   value={values.depRate}
//                   onChange={handleInputChange}
//                 >
//                   {() => (
//                     <TextField
//                       id="standard-basic"
//                       label="Depriciation Rate(%)"
//                       name="depRate"
//                     />
//                   )}
//                 </InputMask>

//                 <TextField
//                   id="standard-basic"
//                   label="Supplier No"
//                   name="supNo"
//                   value={values.supNo}
//                   onChange={handleInputChange}
//                 />
//                 <InputMask
//                   mask="9999999"
//                   onChange={handleInputChange}
//                   maskChar=" "
//                   value={values.cost}
//                 >
//                   {() => (
//                     <TextField
//                       id="standard-basic"
//                       label="Cost(Rs)"
//                       name="cost"
//                     />
//                   )}
//                 </InputMask>

//                 <FormControl>
//                   <FormLabel>Status</FormLabel>
//                   <RadioGroup
//                     row
//                     name="status"
//                     value={values.status}
//                     onChange={handleInputChange}
//                   >
//                     <FormControlLabel
//                       value="Active"
//                       control={<Radio />}
//                       label="Active"
//                     />
//                     <FormControlLabel
//                       value="Incactive"
//                       control={<Radio />}
//                       label="Inactive"
//                     />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl className={classes.formControl}>
//                   <InputLabel htmlFor="age-native-simple">
//                     Main Catagory
//                   </InputLabel>
//                   <Select
//                     native
//                     labelId="label"
//                     id="select"
//                     name="mainCat"
//                     value={values.mainCat}
//                     onChange={handleInputChange}
//                     style={{ width: "100%" }}
//                   >
//                     <option value="" />
//                     {mainCat}
//                   </Select>
//                 </FormControl>

//                 <FormControl className={classes.formControl}>
//                   <InputLabel htmlFor="age-native-simple">
//                     Sub Catagory
//                   </InputLabel>
//                   <Select
//                     native
//                     labelId="label"
//                     name="subCat"
//                     id="select"
//                     value={values.subCat}
//                     onChange={handleInputChange}
//                     style={{ width: "100%" }}
//                   >
//                     <option value="" />
//                     {subCat}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs>
//                 <TextField
//                   id="standard-basic"
//                   label="Brand"
//                   name="brand"
//                   value={values.brand}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Model"
//                   name="model"
//                   value={values.model}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Processor"
//                   name="processor"
//                   value={values.processor}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="RAM"
//                   name="ram"
//                   value={values.ram}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Capacity"
//                   name="capacity"
//                   value={values.capacity}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Ref1"
//                   name="ref1"
//                   value={values.ref1}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Ref2"
//                   name="ref2"
//                   value={values.ref2}
//                   onChange={handleInputChange}
//                 />
//                 <TextField
//                   id="standard-basic"
//                   label="Ref3"
//                   name="ref3"
//                   value={values.ref3}
//                   onChange={handleInputChange}
//                 />

//                 <Button
//                   fullWidth
//                   className={classes.button}
//                   variant="contained"
//                   color="primary"
//                   onClick={handleOnClickAction}
//                 >
//                   Save
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Grid>
//     </Container>
//   );
// }
