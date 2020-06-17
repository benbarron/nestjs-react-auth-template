import React, { Fragment, useContext, useState } from "react";
import { withRouter } from "react-router";
import {
  CardBody,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { AuthState } from "../../utils/userTypes";
import { NotificationContext } from "../../context/NotificationContext";
import { NotificationState } from "../../utils/notificationTypes";

interface Props {}

export const ChangeUserInfo = withRouter((props: Props) => {
  const auth: AuthState = useContext(AuthContext);
  const notification: NotificationState = useContext(NotificationContext);

  const [firstname, setFirstname] = useState(auth.user.firstname);
  const [lastname, setLastname] = useState(auth.user.lastname);
  const [email, setEmail] = useState(auth.user.email);
  const [city, setCity] = useState(auth.user.city || "");
  const [state, setState] = useState(auth.user.state || "");
  const [bio, setBio] = useState(auth.user.bio || "");
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateUserInfo = () => {
    auth
      .updateProfileInfo({ firstname, lastname, email, city, state, bio })
      .then((res: any) => {
        notification.displayNotification({
          color: "success",
          title: "Success",
          description: res.data.message,
        });

        setEditMode(false);
      })
      .catch((err: any) => {
        notification.displayNotification({
          color: "danger",
          title: "Error",
          description: err.response.data.message,
        });
      });
  };

  const resetChanges = () => {
    setFirstname(auth.user.firstname);
    setLastname(auth.user.lastname);
    setEmail(auth.user.email);
    setCity(auth.user.city || "");
    setState(auth.user.state || "");
    setBio(auth.user.bio || "");
    setEditMode(false);
  };

  return (
    <Fragment>
      <Card className="card-secondary card-outline">
        <CardHeader>Update User Information</CardHeader>
        <CardBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup row>
              <Col sm={6}>
                <Label>Firstname</Label>
                <Input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  disabled={!editMode}
                />
              </Col>
              <Col sm={6}>
                <Label>Lastname</Label>
                <Input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  disabled={!editMode}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editMode}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={6}>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!editMode}
                />
              </Col>
              <Col sm={6}>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!editMode}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Label>Bio</Label>
                <Input
                  type="textarea"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={!editMode}
                />
              </Col>
            </FormGroup>
            {editMode ? (
              <FormGroup row>
                <Col sm={6}>
                  <Button
                    outline
                    size="sm"
                    color="secondary"
                    className="float-left"
                    onClick={resetChanges}
                  >
                    Reset Changes
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    outline
                    size="sm"
                    color="primary"
                    className="float-right"
                    onClick={updateUserInfo}
                  >
                    Save Changes
                  </Button>
                </Col>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Col sm={12}>
                  <Button
                    outline
                    size="sm"
                    color="secondary"
                    style={{ width: "100%" }}
                    onClick={(e) => setEditMode(true)}
                  >
                    Enter Edit Mode
                  </Button>
                </Col>
              </FormGroup>
            )}
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
});
