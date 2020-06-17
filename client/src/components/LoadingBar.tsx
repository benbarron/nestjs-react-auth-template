import React, { useContext, Fragment } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { BarLoader } from "react-spinners";

export const LoadingBar = () => {
  const loading = useContext(LoadingContext);

  if (loading.loading) {
    return <BarLoader width="100%" color="#2980b9" />;
  } else {
    return <Fragment />;
  }
};
