import React from 'react'
import Header from '../header/Header'
import SidenavAdmin from '../../dashboard/SideNavBar/SideNav'
import Sidenav_HO_Manager from '../../dashboard/SideNavBar_HO_Manager/SideNav'
import Sidenav_Manager from '../../dashboard/SideNavBar_Manager/SideNav'
import Sidenav_HO_ITOfficer from '../../dashboard/SideNavBar_HO_ITOfficer/SideNav'
import Sidenav_ITOfficer from '../../dashboard/SideNavBar_ITOfficer/SideNav'



export default function App() {
  return (
    <div>
      {/* ****To provide diffrent layouts based on user role**** */}
      <Header />
      <SidenavAdmin />
      
    </div>
  );
}