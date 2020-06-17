import React, { Fragment, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { NotificationContext } from "../../context/NotificationContext";
import { NotificationState } from "../../utils/notificationTypes";

interface Props {}

export const Home = withRouter((props: Props) => {
  return (
    <Fragment>
      <h1>Home</h1>
    </Fragment>
  );
});
