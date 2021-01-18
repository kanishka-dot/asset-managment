import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReportIcon from "@material-ui/icons/Report";
import SearchIcon from "@material-ui/icons/Search";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import PeopleIcon from "@material-ui/icons/People";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const Items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon color="primary" />,
    path: "/app/home",
  },

  {
    title: "Inventory",
    icon: <ViewWeekIcon color="primary" />,
    items: [
      {
        title: "Create",
        path: "/app/inventory/create",
        icon: <AddIcon color="primary" />,
      },
      {
        title: "Search",
        path: "/app/inventory/search",
        icon: <SearchIcon color="primary" />,
      },
      {
        title: "Transfer",
        path: "/app/inventory/transfer",
        icon: <CallMadeIcon color="primary" />,
      },
      {
        title: "Receive",
        path: "/app/inventory/receive",
        icon: <CallReceivedIcon color="primary" />,
      },
    ],
  },
  {
    title: "Users",
    icon: <PeopleIcon color="primary" />,
    items: [
      {
        title: "Create User",
        path: "/app/users/createuser",
        icon: <AddIcon color="primary" />,
      },
    ],
  },
  {
    title: "Locations",
    icon: <LocationCityIcon color="primary" />,
    items: [
      {
        title: "Create Locations",
        path: "/app/location/create",
        icon: <AddIcon color="primary" />,
      },
    ],
  },
  {
    title: "Report",
    icon: <FileCopyIcon color="primary" />,
    items: [
      {
        title: "Exception Reports",
        path: "/app/reports/create",
        icon: <ReportIcon color="primary" />,
      },
    ],
  },
];

export default Items;
