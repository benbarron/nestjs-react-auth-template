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

export const RegisterModal = withRouter((props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth: AuthState = useContext(AuthContext);

  const toggleModal = (): void => setOpen(!open);

  const toggleShowPassword = (): void => setShowPassword(!showPassword);

  const register = (e: FormEvent<any>): void => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password) {
      setMessage("*Please enter all fields");
      setTimeout(() => setMessage(null), 5000);
      return;
    }

    if (password.length < 6) {
      setMessage("*Password must be at least 6 characters long.");
      setTimeout(() => setMessage(null), 5000);
      return;
    }

    auth
      .register({ firstname, lastname, email, password })
      .then((res: any) => {})
      .catch((err: any) => {
        setMessage(err.response.data.message);
        setTimeout(() => setMessage(null), 5000);
      });
  };

  return (
    <Fragment>
      <button
        className="btn btn-sm btn-outline-secondary mx-2"
        style={{ minWidth: 80 }}
        onClick={toggleModal}
      >
        Register
      </button>
      <Modal isOpen={open} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Register</ModalHeader>
        <ModalBody>
          <Form onSubmit={register}>
            <FormGroup className="mb-4">
              <div className="row">
                <div className="col-sm-6">
                  <Label>Firstname</Label>
                  <Input
                    name="firstname"
                    placeholder="Firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <Label>Lastname</Label>
                  <Input
                    name="lastname"
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
            </FormGroup>
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
