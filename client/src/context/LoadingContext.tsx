import React, { createContext, useReducer } from "react";
import { LoadingReducer } from "./LoadingReducer";
import { LoadingState } from "../utils/loadingTypes";

export const initialState = {
  loading: false,
};

export const LoadingContext = createContext<LoadingState>(initialState);

export const LoadingProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(LoadingReducer, initialState);

  const setLoading = (value: boolean) => {
    dispatch({
      type: "SET_LOADING",
      payload: { value },
    });
  };

  return (
    <LoadingContext.Provider value={{ loading: state.loading, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
