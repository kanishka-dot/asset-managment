import React from "react";
import { Route, Redirect } from "react-router-dom";
// import Authentication from "./LogingAuth";


function privateRoute(props) {
  
  return (
    
    <Route
      path={props.path}
      render={(data) =>
        true ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
      
    ></Route>
   
  );
}

export default privateRoute;
