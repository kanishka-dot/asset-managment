import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UserForm from "./FormOne";
import Review from "./SummaryForm";
import Error from "./Error";
import useForm from "../useForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "50rem",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: "50rem",
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Supplier Details", "Summary"];

export default function Checkout() {
  const stateSchema = {
    suppname: { value: "", error: "" },
    NIC: { value: "", error: "" },
    suppadd: { value: "", error: "" },
    telephone: { value: "", error: "" },
    refno: { value: "", error: "" },
    remark: { value: "", error: "" },
    status: { value: "active", error: "" },
  };

  const stateValidatorSchema = {
    suppname: {
      required: true,
      validator: {
        func: (value) =>
          /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)+([A-Za-z][A-Za-z'-]+)*/.test(
            value
          ),
        error: "Supplier name must be more than 3 character",
      },
    },
    suppadd: {
      required: true,
      validator: {
        func: (value) => /./.test(value),
        error: "Supplier address Invalid",
      },
    },
    NIC: {
      required: false,
      validator: {
        func: (value) => /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(value),
        error: "Invalid NIC Number",
      },
    },
    telephone: {
      required: true,
      validator: {
        func: (value) => /^[1-9]\d{8}$/.test(value),
        error: "Invalid Telephone No",
      },
    },
    refno: {
      required: true,
      validator: {
        func: (value) => /./.test(value),
        error: "Invalid Refernace",
      },
    },
    remark: {
      required: true,
      validator: {
        func: (value) => /./.test(value),
        error: "Invalid Remark",
      },
    },
    status: {
      required: true,
      validator: {
        func: (value) => /^(\w+\S+)$/.test(value),
        error: "Invalid Status",
      },
    },
  };

  const { values, errors, dirty, handleOnChange } = useForm(
    stateSchema,
    stateValidatorSchema
  );
  const { suppname, NIC, suppadd, telephone } = errors;

  // if (
  //   userName === "" &&
  //   NIC === "" &&
  //   location === "" &&
  //   userId === "" &&
  //   role === "" &&
  //   status === ""
  // ) {
  //   return false;
  // } else {
  //   return false;
  // }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <UserForm
            userValues={values}
            userErrors={errors}
            userDirty={dirty}
            handleChanges={handleOnChange}
          />
        );

      case 1:
        return <Review userValues={values} />;

      default:
        throw new Error("Unknown step");
    }
  }

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const ClearFields = () => {
    values.userName = "";
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h5" variant="h5" align="left">
            Supplier
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              setActiveStep(0)
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep !== 1 && (
                    <Button onClick={ClearFields} className={classes.button}>
                      Clear
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={
                      suppname === "" &&
                      NIC === "" &&
                      suppadd === "" &&
                      telephone === ""
                        ? false
                        : true
                    }
                  >
                    {activeStep === steps.length - 1 ? "Create" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
