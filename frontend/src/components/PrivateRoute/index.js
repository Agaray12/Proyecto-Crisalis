import React from "react";
import { Navigate } from "react-router";
import { useLocalState } from "../../util/useLocalStorage";
import SignIn from "../pages/SignIn";
import axios  from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';
import { CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    axios.get("/api/auth/validate", {params:{token: `${jwt}`}}).then((res) => {
      setIsValid(res.data);
      setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading === true ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
      LOADING...
    </Box>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;