import React from "react";
import Header from "../header/Header";
import ADMINPANEL from "../../dashboard/SideNavBar/SideNav";
import MANAGERPANEL from "../../dashboard/SideNavBar_HO_Manager/SideNav";
import ITOFFICERPANEL from "../../dashboard/SideNavBar_HO_ITOfficer/SideNav";
import USERPANEL from "../../dashboard/SideNavBar_ITOfficer/SideNav";
import { ROLE } from "../../service/userDetails";

export default function Layout() {
  console.log(ROLE);

  function getSideNav() {
    switch (ROLE) {
      case "ADMIN":
        return <ADMINPANEL />;
      case "MANAGER":
        return <MANAGERPANEL />;
      case "OFFICER":
        return <ITOFFICERPANEL />;
      case "USER":
        return <USERPANEL />;
      default:
      // code block
    }
  }

  return (
    <div>
      {/* ****To provide diffrent layouts based on user role**** */}
      <Header />
      {getSideNav()}
    </div>
  );
}
