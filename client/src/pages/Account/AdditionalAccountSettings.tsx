import React, { Fragment, useContext } from "react";
import { CardHeader, Card, CardBody, Row, Input } from "reactstrap";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";

interface Props {}

export const AdditionalAccountSettings = (props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  const toggle = async () => {
    auth.toggleDarkMode();
  };

  return (
    <Fragment>
      <Card className="card-secondary card-outline">
        <CardHeader>Additional Settings/Options</CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <span>Dark Mode</span>
            <span>
              <Input
                type="checkbox"
                // value={auth.user.darkMode}
                checked={auth.user.darkMode}
                onChange={toggle}
              />
            </span>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};
