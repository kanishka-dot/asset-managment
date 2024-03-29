import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hooks-helper";
import { FORM_INITAL_VALUE } from "./DataState";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Form_1 from "./FormOne";
import Form_2 from "./FormTwo";
import Review from "./SummaryForm";

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


// const steps = ["Basic Details", "More Details", "Summary"];


export default function Checkout() {
  const [formData, setValues] = useForm(FORM_INITAL_VALUE);
  console.log("Item Form");
  const props = { formData, setValues };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Form_1 {...props} />;
      case 1:
        return <Form_2 {...props} />;
      case 2:
        return <Review {...props} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const classes = useStyles();

  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  return (
    <React.Fragment>
      <CssBaseline />
    
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h5" variant="h5" align="left">
            Item Create
          </Typography>
          {getStepContent(0)}
          
          {/* <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom></Typography>
                <Typography variant="subtitle1">
                  Item Sucessfully Created
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Create" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment> */}
        </Paper>
      </main>
    </React.Fragment>
  );
}
