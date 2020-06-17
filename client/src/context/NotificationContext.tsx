import React, { createContext, useReducer } from "react";
import {
  NotificationState,
  NotificationPayload,
} from "../utils/notificationTypes";
import { NotificationReducer } from "./NotificationReducer";

const initialState: NotificationState = {
  isShowing: false,
  color: null,
  title: null,
  description: null,
  onClick: null,
};

export const NotificationContext = createContext(initialState);

export const NotificationProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const displayNotification = (
    payload: NotificationPayload,
    time: number = 5000
  ) => {
    dispatch({
      type: "DISPLAY_NOTIFICATION",
      payload,
    });
    setTimeout(clearNotification, time);
  };

  const clearNotification = () => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        isShowing: state.isShowing,
        color: state.color,
        title: state.title,
        description: state.description,
        onClick: state.onClick,
        displayNotification,
        clearNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
