import React, { Fragment, useState, FormEvent, useContext } from "react";
import { withRouter } from "react-router";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  Button,
} from "reactstrap";
import { AuthState } from "../utils/userTypes";
import { AuthContext } from "../context/AuthContext";

interface Props {
  history: any;
}

export const LoginModal = withRouter((props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth: AuthState = useContext(AuthContext);

  const toggleModal = (): void => setOpen(!open);

  const toggleShowPassword = (): void => setShowPassword(!showPassword);

  const register = (e: FormEvent<any>): void => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("*Please enter all fields");
      setTimeout(() => setMessage(null), 5000);
      return;
    }

    auth
      .login({ email, password })
      .then((res: any) => {})
      .catch((err: any) => {
        setMessage(err.response.data.message);
        setTimeout(() => setMessage(null), 5000);
      });
  };

  return (
    <Fragment>
      <button
        className="btn btn-sm btn-outline-primary mx-2"
        style={{ minWidth: 80 }}
        onClick={toggleModal}
      >
        Login
      </button>
      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={register}>
            <FormGroup className="mb-4">
              <div className="row">
                <div className="col-sm-12">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </FormGroup>
            <FormGroup className="mb-4">
              <div className="row">
                <div className="col-sm-12">
                  <Label>Password</Label>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i
                          className={`fas fa-eye${
                            showPassword ? "-slash" : ""
                          }`}
                          onClick={toggleShowPassword}
                        ></i>
                      </span>
                    </div>
                  </InputGroup>
                </div>
              </div>
            </FormGroup>
            {message ? (
              <span style={{ color: "#aa0000", marginTop: 20 }}>{message}</span>
            ) : null}
            <hr />
            <FormGroup>
              <button
                className="btn btn-sm btn-outline-primary"
                style={{ width: "100%" }}
                onClick={register}
              >
                Submit
              </button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
});
