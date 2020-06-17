import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { ALT_COLOR } from "../env";

interface Props {}

export const SecondaryAside = withRouter((props: Props) => {
  return (
    <Fragment>
      <aside
        className="control-sidebar control-sidebar-dark"
        style={{ background: ALT_COLOR }}
      ></aside>
    </Fragment>
  );
});
