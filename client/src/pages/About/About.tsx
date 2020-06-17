import React, { Fragment } from "react";
import { withRouter } from "react-router";

interface Props {}

export const About = withRouter((props: Props) => {
  return (
    <Fragment>
      <h1>About</h1>
    </Fragment>
  );
});
