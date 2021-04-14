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
  const {
    itemCode,
    itemGroup,
    itemDesc,
    depRate,
    cost,
    supNo,
    status,
    mainCatgry,
    subCatgry,
    brand,
    model,
    processor,
    ram,
    capacity,
    ref1,
    ref2,
    ref3,
  } = formData;

  const summary = [
    { name: "itemCode", label: "Item Code", value: itemCode },
    { name: "itemGroup", label: "Item Group", value: itemGroup },
    { name: "itemDesc", label: "Item Description", value: itemDesc },
    { name: "supNo", label: "Supplier No", value: supNo },
    { name: "status", label: "Status", value: status },
    { name: "brand", label: "Brand", value: brand },
    { name: "model", label: "Model", value: model },
    { name: "processor", label: "Processor", value: processor },
    { name: "ram", label: "RAM", value: ram },
    { name: "capacity", label: "Capacity", value: capacity },
    { name: "ref1", label: "Ref1", value: ref1 },
    { name: "ref2", label: "Ref2", value: ref2 },
    { name: "ref3", label: "Ref3", value: ref3 },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Item summary
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
