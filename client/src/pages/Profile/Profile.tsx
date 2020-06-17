import React, { Fragment, useState, useContext } from "react";
import { withRouter } from "react-router";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { AuthState } from "../../utils/userTypes";
import { AuthContext } from "../../context/AuthContext";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { ProfileInfo } from "./ProfileInfo";

interface Props {}

export const Profile = withRouter((props: Props) => {
  const auth: AuthState = useContext(AuthContext);

  if (!auth.user) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Container className="mt-3">
        <Row>
          <Col sm={12} md={4}>
            <ProfileInfo />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});
