import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";
import { withRouter } from "react-router";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Button,
  InputGroup,
} from "reactstrap";
import axios, { AxiosResponse } from "axios";
import { NotificationState } from "../../utils/notificationTypes";
import { NotificationContext } from "../../context/NotificationContext";
import { API_HOST } from "../../env";

export const ForgotPassword = withRouter(
  (props: any): JSX.Element => {
    const auth: AuthState = useContext(AuthContext);
    const notification: NotificationState = useContext(NotificationContext);

    const [step, setStep] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
      if (auth.isAuthenticated) {
        props.history.push("/");
      }
    });

    const sendResetEmail = async (e: any) => {
      e.preventDefault();
      try {
        const res: AxiosResponse<any> = await axios.post(
          `${API_HOST}/api/auth/password/send`,
          { email }
        );
        setStep(1);
      } catch (err) {
        notification.displayNotification({
          color: "danger",
          title: "Error",
          description: err.response.data.message,
        });
        setTimeout(notification.clearNotification, 5000);
      }
    };

    const resetPassword = async (e: any) => {
      e.preventDefault();
      try {
        const res: AxiosResponse<any> = await axios.post(
          `${API_HOST}/api/auth/password/reset`,
          { resetToken: code, newPassword: password }
        );
        notification.displayNotification({
          color: "success",
          title: "Success",
          description: res.data.message,
        });
        setEmail("");
        setPassword("");
        setCode("");
        props.history.push("/");
      } catch (err) {
        notification.displayNotification({
          color: "danger",
          title: "Error",
          description: err.response.data.message,
        });
      }
      setTimeout(notification.clearNotification, 5000);
    };

    return (
      <Fragment>
        <Container className="mt-5">
          <Row>
            <Col sm={{ size: 12, offset: 0 }} md={{ size: 6, offset: 3 }}>
              <Card>
                {step == 0 ? (
                  <Fragment>
                    <CardHeader className="text-center">
                      Reset Password
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={(e) => e.preventDefault()}>
                        <p className="text-center">
                          Enter the email that is associated with your account,
                          we will then send you an email with a code that can be
                          used to reset your password.
                        </p>
                        <hr />
                        <FormGroup row className="text-center">
                          {/* <Label className="mx-auto">Email Address</Label> */}
                          <br />
                          <Input
                            type="text"
                            name="email"
                            value={email}
                            placeholder="Email Address"
                            className="text-center"
                            autoComplete=""
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <Button
                            outline
                            size="sm"
                            color="primary"
                            className="m-auto"
                            onClick={sendResetEmail}
                          >
                            Send Email
                          </Button>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Fragment>
                ) : (
                  <Fragment>
                    <CardHeader className="text-center">
                      {" "}
                      Reset Password
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={(e) => e.preventDefault()}>
                        <p className="text-center">
                          A code has been sent to {email}, enter the code along
                          with your new password below.
                        </p>
                        <hr />
                        <FormGroup row>
                          <Input
                            type="text"
                            name="code"
                            value={code}
                            placeholder="Code"
                            className="text-center"
                            autoComplete=""
                            onChange={(e) => setCode(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <InputGroup>
                            <Input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={password}
                              className="text-center"
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
                        </FormGroup>
                        <FormGroup row>
                          <Button
                            outline
                            size="sm"
                            color="primary"
                            className="m-auto"
                            onClick={resetPassword}
                          >
                            Reset Password
                          </Button>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Fragment>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
);
