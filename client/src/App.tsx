import React, { Fragment, useEffect, useContext } from "react";
import { TopNavigationBar } from "./components/TopNavigationBar";
import { SideNavigationPanel } from "./components/SideNavigationPanel";
import { SecondaryAside } from "./components/SecondaryAside";
import { Footer } from "./components/Footer";
import { AuthState } from "./utils/userTypes";
import { AuthContext } from "./context/AuthContext";
import { routes } from "./routes";
import { Switch, Route, withRouter } from "react-router";
import "./App.css";
import { Notification } from "./components/Notification";
import { LoadingState } from "./utils/loadingTypes";
import { LoadingContext } from "./context/LoadingContext";
import { LoadingBar } from "./components/LoadingBar";

export const App = withRouter((props: any) => {
  const auth: AuthState = useContext(AuthContext);
  const loading: LoadingState = useContext(LoadingContext);

  const init = async () => {
    loading.setLoading(true);
    try {
      await auth.loadUser();
      loading.setLoading(false);
    } catch (e) {
      props.history.push("/");
      loading.setLoading(false);
    }
  };

  useEffect(() => {
    init();
    return () => {};
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) {
    var filteredRoutes = routes.filter((route) => !route.auth);
  } else {
    var filteredRoutes = routes;
  }

  return (
    <Fragment>
      <Notification />
      <TopNavigationBar />
      <SecondaryAside />
      <SideNavigationPanel />
      <div className="content-wrapper">
        <LoadingBar />
        <Switch>
          {filteredRoutes.map((route, i) => (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              render={() => (
                <div className="p-2">
                  {auth.isLoading ? null : <route.component />}
                </div>
              )}
            />
          ))}
        </Switch>
      </div>
      <Footer />
    </Fragment>
  );
});
