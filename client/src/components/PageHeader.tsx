import React, { Fragment } from "react";
import { withRouter } from "react-router";

interface Props {}

export const PageHeader = withRouter((props: Props) => {
  return (
    <Fragment>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Fixed Navbar Layout</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Layout</a>
                </li>
                <li className="breadcrumb-item active">Fixed Navbar Layout</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
});
