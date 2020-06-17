import React, { Fragment, useContext } from "react";
import { withRouter } from "react-router";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";
import { UserImage } from "./UserImage";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { ChangeUserInfo } from "./ChangeUserInfo";
import { ChangePassword } from "./ChangePassword";
import { AdditionalAccountSettings } from "./AdditionalAccountSettings";

interface Props {}

export const Account = withRouter((props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  if (!auth.user) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Container className="mt-3">
        <Row>
          <Col sm={12} md={4}>
            <UserImage />
            <br />
            <AdditionalAccountSettings />
          </Col>
          <Col sm={12} md={8}>
            <ChangeUserInfo />
            <br />
            <ChangePassword />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});
