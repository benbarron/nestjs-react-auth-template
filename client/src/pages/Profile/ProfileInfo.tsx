import React, { Fragment, useContext } from "react";
import { API_HOST } from "../../env";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";

interface Props {}

export const ProfileInfo = (props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  return (
    <Fragment>
      <div className="card card-primary card-outline">
        <div className="card-body box-profile">
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src={
                auth.user.profileImage
                  ? `${API_HOST}${auth.user.profileImage}`
                  : "/default-avatar.png"
              }
              alt="User profile picture"
            />
          </div>
          <br />

          <h3 className="profile-username text-center">
            {auth.user.firstname} {auth.user.lastname}
          </h3>

          <p className="text-muted text-center" style={{ fontSize: 14 }}>
            Member Since {new Date(auth.user.dateCreated).toLocaleDateString()}
          </p>
          <hr />
          <p className="text-muted text-center">
            {auth.user.city}, {auth.user.state}
          </p>
          <hr />
          <p className="text-muted text-center">{auth.user.bio}</p>
        </div>
      </div>
    </Fragment>
  );
};
