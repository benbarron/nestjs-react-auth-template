import React, { Fragment, useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { AuthState } from "../utils/userTypes";
import { routes } from "./../routes";
import { Link } from "react-router-dom";
import { API_HOST, PRIMARY_COLOR, ALT_COLOR, TEXT_ICON_COLOR } from "../env";

interface Props {
  history: any;
}

export const SideNavigationPanel = withRouter((props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  let filteredRoutes;
  let profileImageUrl;
  if (!auth.isAuthenticated || auth.isLoading) {
    profileImageUrl = "/default-avatar.png";
    filteredRoutes = routes
      .filter((route) => !route.auth)
      .filter((route) => route.icon);
  } else {
    filteredRoutes = routes.filter((route) => route.icon);
    if (auth.user.profileImage) {
      profileImageUrl = `${API_HOST}${auth.user.profileImage}`;
    } else {
      profileImageUrl = "/default-avatar.png";
    }
  }

  return (
    <Fragment>
      <aside
        className="main-sidebar sidebar-dark-secondary"
        style={{
          backgroundColor: ALT_COLOR,
          height: "100vh",
        }}
      >
        <a
          href=""
          className="brand-link c-elevation"
          style={{
            backgroundColor: PRIMARY_COLOR,
          }}
        >
          <img
            src="/logo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
          />
          <span
            className="brand-text font-weight-light"
            style={{ color: TEXT_ICON_COLOR }}
          >
            AdminLTE 3
          </span>
        </a>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            {auth.isAuthenticated ? (
              <Fragment>
                <div
                  className="image"
                  onClick={(e) => props.history.push("/account")}
                >
                  <img
                    src={profileImageUrl}
                    className="img-circle elevation-2"
                    alt="User Image"
                    style={{ backgroundColor: "#ffffff" }}
                  />
                </div>
                <div
                  className="info"
                  onClick={(e) => props.history.push("/account")}
                >
                  <a
                    href="#"
                    className="d-block"
                    style={{ color: TEXT_ICON_COLOR }}
                  >
                    {auth.user.firstname} {auth.user.lastname}
                  </a>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div></div>
              </Fragment>
            )}
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {filteredRoutes.map((route, i) => (
                <li className="nav-item" key={i}>
                  <Link to={route.path} className="nav-link">
                    <i
                      className={route.icon + " mr-4"}
                      style={{ color: TEXT_ICON_COLOR }}
                    ></i>
                    <p style={{ color: TEXT_ICON_COLOR }}>{route.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
});
