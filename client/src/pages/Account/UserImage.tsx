import React, { Fragment, useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";
import { Card, CardBody } from "reactstrap";
import { ChangeUserImageModal } from "./ChangeUserImageModal";
import { API_HOST } from "../../env";
import {
  NotificationState,
  NotificationPayload,
} from "../../utils/notificationTypes";
import { NotificationContext } from "../../context/NotificationContext";

interface Props {}

export const UserImage = withRouter((props: Props) => {
  const auth: AuthState = useContext(AuthContext);
  const notification: NotificationState = useContext(NotificationContext);
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = (): void => setOpen(!open);

  const displayNotification = (payload: NotificationPayload): void => {
    notification.displayNotification(payload);
    setTimeout(() => notification.clearNotification(), 10000);
  };

  if (!auth.user) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Card className="card-secondary card-outline">
        <CardBody>
          <div className="row user-image-wrapper">
            <img
              src={
                auth.user.profileImage
                  ? `${API_HOST}${auth.user.profileImage}`
                  : "/default-avatar.png"
              }
              className="account-user-image profile-user-img"
              alt={auth.user.firstname + " " + auth.user.lastname}
              onClick={toggleOpen}
            />
            <small className="edit-display">Click Image to edit</small>
          </div>
        </CardBody>
      </Card>
      {open ? (
        <ChangeUserImageModal
          open={open}
          toggleOpen={toggleOpen}
          displayNotification={displayNotification}
        />
      ) : null}
    </Fragment>
  );
});
