import React, { Fragment, useContext } from "react";
import { withRouter } from "react-router";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { AsideToggleButton } from "./AsideToggleButton";
import { SignoutButton } from "./SignoutButton";
import { AuthState } from "../utils/userTypes";
import { AuthContext } from "../context/AuthContext";
import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";
import { Link } from "react-router-dom";
import { PRIMARY_COLOR, TEXT_ICON_COLOR } from "../env";

interface Props {}

export const TopNavigationBar = withRouter((props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  return (
    <Fragment>
      <nav
        className={`main-header navbar navbar-expand navbar-light`}
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" style={{ color: TEXT_ICON_COLOR }}></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/"
              className="nav-link"
              style={{ color: TEXT_ICON_COLOR }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/about"
              className="nav-link"
              style={{ color: TEXT_ICON_COLOR }}
            >
              About
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to="/contact"
              className="nav-link"
              style={{ color: TEXT_ICON_COLOR }}
            >
              Contact
            </Link>
          </li>
        </ul>

        <form
          className="form-inline ml-3"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            className="input-group input-group-sm"
            style={{
              width: "90%",
              margin: "auto",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 0,
              borderBottom: `${TEXT_ICON_COLOR} 1px solid`,
              color: TEXT_ICON_COLOR,
            }}
          >
            <input
              className="form-control form-control-navbar placeholder-light"
              type="search"
              placeholder="Search"
              // aria-label="Search"
              style={{ background: "none", color: TEXT_ICON_COLOR }}
            />
            {/* <div className="input-group-append">
              <button
                className="btn btn-navbar"
                type="submit"
                style={{ background: "none" }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div> */}
          </div>
        </form>

        <ul className="navbar-nav ml-auto">
          {auth.isAuthenticated ? (
            <Fragment>
              <NotificationsDropdown />
              <AsideToggleButton />
              <SignoutButton />
            </Fragment>
          ) : (
            <Fragment>
              <RegisterModal />
              <LoginModal />
            </Fragment>
          )}
        </ul>
      </nav>
    </Fragment>
  );
});
