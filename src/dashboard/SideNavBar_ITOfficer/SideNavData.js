import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReportIcon from "@material-ui/icons/Report";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

const color = "#FFFFFF";

const Items = [
  {
    title: "Dashboard",
    icon: <DashboardIcon style={{ color: color }} />,
    path: "/",
  },

  {
    title: "Transcations",
    icon: <SyncAltIcon style={{ color: color }} />,
    items: [
      {
        title: "GTN IN",
        path: "/app/inventory/receive",
        icon: <CallReceivedIcon style={{ color: color }} />,
      },
      {
        title: "GTN OUT",
        path: "/app/inventory/transfer",
        icon: <CallMadeIcon style={{ color: color }} />,
      },
    ],
  },
  {
    title: "Reports",
    icon: <FileCopyIcon style={{ color: color }} />,
    items: [
      {
        title: "Exception Reports",
        path: "/app/reports/create",
        icon: <ReportIcon style={{ color: color }} />,
      },
    ],
  },
];

export default Items;
