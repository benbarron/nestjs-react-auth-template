import React, { Fragment, useState, useContext } from "react";
import { withRouter } from "react-router";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AuthState } from "../utils/userTypes";
import { AuthContext } from "../context/AuthContext";
import { TEXT_ICON_COLOR } from "../env";

export const SignoutButton = withRouter((props: any) => {
  const [open, setOpen] = useState(false);
  const auth: AuthState = useContext(AuthContext);

  const toggle = () => setOpen(!open);

  const logout = () => {
    auth.logout();
    props.history.push("/");
  };

  return (
    <Fragment>
      <button className="btn">
        <i
          className="fas fa-sign-out-alt"
          style={{ color: TEXT_ICON_COLOR }}
          onClick={toggle}
        ></i>
      </button>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Are you sure you want to logout?
        </ModalHeader>
        <ModalBody>
          <div className="row d-flex justify-content-between px-3">
            <div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={toggle}
              >
                No, go back!
              </button>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={logout}
              >
                Yes, logout!
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
});
