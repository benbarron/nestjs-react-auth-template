import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthState } from "../utils/userTypes";
import { TEXT_ICON_COLOR } from "../env";

interface Props {}

export const AsideToggleButton = (props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  return (
    <li className="nav-item">
      <a
        className="nav-link"
        data-widget="control-sidebar"
        data-slide="true"
        href="#"
        role="button"
      >
        <i className="fas fa-th-large" style={{ color: TEXT_ICON_COLOR }}></i>
      </a>
    </li>
  );
};
