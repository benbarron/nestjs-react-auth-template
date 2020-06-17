import React, { Fragment, useContext, useState } from "react";
import { withRouter } from "react-router";
import {
  CardHeader,
  Card,
  CardBody,
  Form,
  FormGroup,
  Col,
  Label,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";
import { NotificationState } from "../../utils/notificationTypes";
import { NotificationContext } from "../../context/NotificationContext";

interface Props {}

export const ChangePassword: React.FC = (props: Props): JSX.Element => {
  const auth: AuthState = useContext(AuthContext);
  const notification: NotificationState = useContext(NotificationContext);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const changePassword = () => {
    auth
      .updatePassword({ oldPassword, newPassword })
      .then((res) => {
        notification.displayNotification({
          color: "success",
          title: "Success",
          description: res.data.message,
        });
        setOldPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        notification.displayNotification({
          color: "success",
          title: "Success",
          description: err.response.data.message,
        });
      });
  };

  return (
    <Fragment>
      <Card className="card-secondary card-outline">
        <CardHeader>Change Password</CardHeader>
        <CardBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Col sm={12}>
                <Label>Old Password</Label>
                <InputGroup>
                  <Input
                    name="password"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <div
                    className="input-group-append"
                    onClick={(e) => setShowOldPassword(!showOldPassword)}
                  >
                    <span className="input-group-text">
                      <i
                        className={`fas fa-eye${
                          showOldPassword ? "-slash" : ""
                        }`}
                      ></i>
                    </span>
                  </div>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Label>New Password</Label>
                <InputGroup>
                  <Input
                    name="password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div
                    className="input-group-append"
                    onClick={(e) => setShowNewPassword(!showNewPassword)}
                  >
                    <span className="input-group-text">
                      <i
                        className={`fas fa-eye${
                          showNewPassword ? "-slash" : ""
                        }`}
                      ></i>
                    </span>
                  </div>
                </InputGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Button
                  outline
                  color="secondary"
                  size="sm"
                  style={{ width: "100%" }}
                  onClick={changePassword}
                >
                  Set New Password
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
