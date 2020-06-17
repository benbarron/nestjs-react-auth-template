import React, { Fragment, useContext } from "react";
import { withRouter } from "react-router";
import { AuthState } from "../utils/userTypes";
import { AuthContext } from "../context/AuthContext";
import { TEXT_ICON_COLOR, PRIMARY_COLOR, ALT_COLOR } from "../env";

interface Props {}

export const NotificationsDropdown = (props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  return (
    <Fragment>
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell" style={{ color: TEXT_ICON_COLOR }}></i>
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">
            15 Notifications
          </span>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2"></i> 4 new messages
            <span className="float-right text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2"></i> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2"></i> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item dropdown-footer">
            See All Notifications
          </a>
        </div>
      </li>
    </Fragment>
  );
};
