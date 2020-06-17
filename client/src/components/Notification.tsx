import React, { Fragment, useContext } from "react";
import { NotificationState } from "../utils/notificationTypes";
import { NotificationContext } from "../context/NotificationContext";
import { withRouter } from "react-router";

interface Props {}

export const Notification = (props: Props) => {
  const notification: NotificationState = useContext(NotificationContext);

  return (
    <Fragment>
      <div
        className={`custom-notification alert alert-${notification.color} showing-${notification.isShowing}`}
        onClick={() => {
          if (notification.onClick) {
            withRouter(notification.onClick());
          }
          notification.clearNotification();
        }}
      >
        <p>
          <span className="custom-notification-title">
            {notification.title}
          </span>
          {notification.description}
        </p>
      </div>
    </Fragment>
  );
};
