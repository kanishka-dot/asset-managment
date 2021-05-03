import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import Authentication from "./service/authentication";
import Routes from "./components/routes/Routes";
import Test from "./Test";
// import Login from "../src/components/pages/login/login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/app/login" exact component={Authentication} />
          <PrivateRoute path="/" component={Routes} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
