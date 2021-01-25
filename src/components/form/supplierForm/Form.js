import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "auto",
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

  buttonSave: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: "8rem",
  },

  btn: {
    display: "flex",
    flexDirection: "row-reverse",

  },

  heading: {
    marginBottom: theme.spacing(3),
  },
}));

export default function InventoryIN() {
  const classes = useStyles();

  const [fldEnable, setFldEnable] = React.useState(true);

  const [value, setValue] = React.useState({
    supplierno: "",
    suppliername: "",
    address: "",
    nic: "",
    status: "Active",
    remark: "",
  });

  const initialState = {
    supplierno: "",
    suppliername: "",
    address: "",
    nic: "",
    status: "Active",
    remark: "",
  };

  const handleChange = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  };

  const onClearHandle = () =>{
      setValue({...initialState});
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h6" gutterBottom className={classes.heading}>
            Supplier
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="supplierno"
                label="Supplier No"
                name="supplierno"
                value={value.supplierno}
                onChange={handleChange("supplierno")}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl>     
                <FormLabel>Status</FormLabel>
                <RadioGroup  
                  row
                  name="status"
                  value={value.status}
                  onChange={handleChange("status")}
                >
                  <FormControlLabel
                    value="Active"
                    control={<Radio />}
                    label="Active"
                    disabled={fldEnable}
                  />
                  <FormControlLabel
                    value="Incactive"
                    control={<Radio />}
                    label="Inactive"
                    disabled={fldEnable}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
              fullWidth
                id="suppliername"
                label="Supplier name"
                name="suppliername"
                value={value.suppliername}
                onChange={handleChange("suppliername")}
                disabled={fldEnable}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="remark"
                label="Remark"
                name="remark"
                value={value.remark}
                onChange={handleChange("remark")}
                disabled={fldEnable}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={value.address}
                onChange={handleChange("address")}
                disabled={fldEnable}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="nic"
                label="NIC No"
                name="nic"
                value={value.nic}
                onChange={handleChange("nic")}
                disabled={fldEnable}
              />
            </Grid>
          </Grid>
          <Box className={classes.btn}>
            <Button
              className={classes.buttonSave}
              variant="contained"
              color="secondary"
              onClick={onClearHandle}
            >
              Clear
            </Button>

            <Button
              className={classes.buttonSave}
              variant="contained"
              color="primary"
              disabled={fldEnable}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </main>
    </React.Fragment>
  );
}
