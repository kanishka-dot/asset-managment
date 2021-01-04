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

export default function Review({ formData }) {
  const classes = useStyles();
  const { userId, userName, NIC, location, role, status } = formData;

  const summary = [
    { name: "", label: "User ID", value: userId },
    { name: "", label: "User Name", value: userName },
    { name: "", label: "NIC", value: NIC },
    { name: "", label: "Location", value: location },
    { name: "", label: "Role", value: role },
    { name: "", label: "Status", value: status },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Details Summary
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
