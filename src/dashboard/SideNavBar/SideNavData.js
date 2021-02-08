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
import StarsIcon from '@material-ui/icons/Stars';
import BuildIcon from '@material-ui/icons/Build';
import DoneIcon from '@material-ui/icons/Done';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';

const Items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon color="primary" />,
    path: "/app/home",
  },
  {
    title: "Items",
    icon: <StarsIcon color="primary" />,
    items: [
      {
        title: "Create Item Code",
        path: "/app/inventory/create",
        icon: <AddIcon color="primary" />,
      },
      {
        title: "Create Item Group",
        path: "/app/inventory/group/create",
        icon: <AddIcon color="primary" />,
      },
    ]
  },

  {
    title: "Transcations",
    icon: <SyncAltIcon color="primary" />,
    items: [
      {
        title: "Inventory GRN",       
        path: "/app/inventory/receive_out",
        icon: <DirectionsBoatIcon color="primary" />,
      },

      {
        title: "Inventory GTN IN",       
        path: "/app/inventory/receive",
        icon: <CallReceivedIcon color="primary" />,
      },
      {
        title: "Inventory GTN OUT",
        path: "/app/inventory/transfer",   
        icon: <CallMadeIcon color="primary" />,
      },
    ],
  },
  {
    title: "Repair Items",
    icon: <BuildIcon color="primary" />,
    items: [
      {
        title: "Repair IN",       
        path: "/app/inventory/repair/add",
        icon: <AddIcon color="primary" />,
      },

      {
        title: "Repair OUT",       
        path: "/app/inventory/repair/complete",
        icon: <DoneIcon color="primary" />,
      },
      {
        title: "Search",       
        path: "/app/inventory/repair/search",
        icon: <SearchIcon color="primary" />,
      },
    ],
  },
  {
    title: "Suppliers",
    icon: <SupervisedUserCircleIcon color="primary" />,
    items: [
      {
        title: "Create Suppliers",
        path: "/app/suppliers/create",
        icon: <AddIcon color="primary" />,
      },
      {
        title: "Search Suppliers",
        path: "/app/suppliers/search",
        icon: <SearchIcon color="primary" />,
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
      {
        title: "Search Users",
        path: "/app/users/search",
        icon: <SearchIcon color="primary" />,
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
      {
        title: "Search locations",
        path: "/app/location/search",
        icon: <SearchIcon color="primary" />,
      },
    ],
  },
  {
    title: "Reports",
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
