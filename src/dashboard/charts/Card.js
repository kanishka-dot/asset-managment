import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  com: {
    color: "white",
  },
  bullet: {
    display: "inline-block",
    margin: "02px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    color: "white",
  },

  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const usehistory = useHistory();

  function Push(prop) {
    usehistory.push(prop);
  }

  return (
    <Card className={classes.root} style={{ backgroundColor: props.bkcolor }}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h4" component="h4" className={classes.com}>
          {props.count}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => Push(props.url)}
          className={classes.com}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
