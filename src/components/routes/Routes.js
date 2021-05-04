import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import InventoryForm from "../pages/Inventory/Create";
import Search from "../pages/Inventory/Search";
import Transfer from "../../components/pages/Inventory/Transfer";
import Home from "../../components/pages/Home/Home";
import CreateUserForm from "../../components/pages/users/CreateUser";
import ResetPassword from "../pages/users/ResetPassword";
import Supplier from "../../components/pages/supplier/Supplier";
import Locations from "../../components/pages/locations/Locations";
import ItemGroup from "../../components/pages/Inventory/item_group/ItemGroup";
import SearchItemGroup from "../../components/pages/Inventory/item_group/search_itemgrps";
import SearchItemItem from "../../components/pages/Inventory/Search";
import SearchLocations from "../../components/pages/locations/searchlocation";
import SearchSupplier from "../../components/pages/supplier/SearchSupplier";
import InventoryGrn from "../../components/pages/Inventory/Grn";
import AppGRN from "../../components/pages/Inventory/AppGRN";
import Receive from "../../components/pages/Inventory/Receive";
import RepairIN from "../../components/pages/repair/Repair";
import RepairOUT from "../../components/pages/repair/RepairOUT";
import AddDispose from "../../components/pages/dispose/AddDispose";
import SaveDispose from "../../components/pages/dispose/SaveDispose";

function Routes() {
  console.log("routes");

  return (
    <>
      <Layout />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/app/inventory/create" component={InventoryForm} />
        <Route path="/app/inventory/search" component={Search} />
        <Route path="/app/inventory/transfer" component={Transfer} />
        <Route path="/app/users/createuser" component={CreateUserForm} />
        <Route path="/app/users/reset_password" component={ResetPassword} />
        <Route path="/app/suppliers/create" component={Supplier} />
        <Route path="/app/location/create" component={Locations} />
        <Route path="/app/inventory/item_group" component={ItemGroup} />
        <Route
          path="/app/inventory/itemcode/search"
          component={SearchItemItem}
        />
        <Route path="/app/suppliers/search" component={SearchSupplier} />
        <Route path="/app/inventory/grn" component={InventoryGrn} />
        <Route path="/app/inventory/approve_grn" component={AppGRN} />
        <Route path="/app/inventory/receive" component={Receive} />
        <Route path="/app/inventory/repair/add" component={RepairIN} />
        <Route path="/app/inventory/repair/complete" component={RepairOUT} />
        <Route path="/app/inventory/dispose/add" component={AddDispose} />
        <Route path="/app/inventory/dispose/save" component={SaveDispose} />
        <Route
          path="/app/inventory/itemgroup/search"
          component={SearchItemGroup}
        />
        <Route path="/app/location/search" component={SearchLocations} />
      </Switch>
    </>
  );
}

export default Routes;
