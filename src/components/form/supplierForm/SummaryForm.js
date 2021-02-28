import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  const {
    suppname,
    NIC,
    suppadd,
    telephone,
    remark,
    refno,
    status,
  } = props.userValues;

  const summary = [
    { name: "", label: "Supplier Name", value: suppname },
    { name: "", label: "Supplier Address", value: suppadd },
    { name: "", label: "NIC", value: NIC },
    { name: "", label: "Telephone", value: telephone },
    { name: "", label: "Remark", value: remark },
    { name: "", label: "Referance No", value: refno },
    { name: "", label: "Status", value: status },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Supplier Details Summary
      </Typography>
      <List disablePadding>
        {summary.map((data) => (
          <ListItem className={classes.listItem} key={data.label}>
            <ListItemText primary={data.label} />
            <Typography variant="body2">{data.value}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
