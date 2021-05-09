import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "./LogingAuth";

function privateRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        // Authentication.getAuthenticationStatus()
        true ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/app/login" }}></Redirect>
        )
      }
    ></Route>
  );
}

export default privateRoute;
