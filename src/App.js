import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
// import Loging from "./components/pages/login/login";
// import Password from "./components/pages/login/Password";
// import Card from "./dashboard/gadgets/Card"
//  import Barchart from "./dashboard/gadgets/Barchart"
import Routes from "./components/routes/Routes";
// import InventoryIN from "./components/form/inventoryIN/InventoryIN";
// import Grn from "./components/pages/Inventory/Grn";
// import Supplier from "./components/pages/supplier/Supplier";
// import Table from "./components/form/inventoryIN/Table";
import Test from "./Test";
// import Barchart from "./dashboard/charts/Barchart";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Routes} />
          <PrivateRoute path="/app" component={Routes} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
