import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/pages/login/login";
import Layout from "../components/layout/Layout";
import { PORT, URL } from "../connection/defaultconfig";
import { axios } from "../connection/axios";
import Auth from "../auth/LogingAuth";

export default function Authentication() {
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const usehistory = useHistory();

  const login = (details) => {
    setLoading(true);
    axios
      .post(`http://${URL}:${PORT}/login`, {
        userid: details.username,
        locationid: details.location,
        password: details.password,
      })
      .then((response) => {
        if (response.data.SUCCESS) {
          Auth.onAuthentication();
          sessionStorage.setItem("user", JSON.stringify(response.data));
          setLoading(false);
          usehistory.push("/");
          console.log("Success Login");
        } else {
          console.log(response.data.FAILED);
          setErrors(response.data.FAILED);
          setLoading(false);
        }
      })
      .catch((error) => {
        setErrors("Error. Please Check Concole");
        setLoading(false);
        console.error(`Error:${error}`);
      });
  };

  return <Login userDetails={login} Errors={errors} Loading={loading} />;
}
