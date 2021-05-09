import React from "react";
import { Switch, Route } from "react-router-dom";
import { getState } from "redux-store/stores";
import clientUtils from "utils/client-utils";
const RouterWithPaths = ({ path, roles = [], ...rest }) => {
  const state = getState();
  const { auth: { auth = {} } = {} } = state;
  const currentRole = (auth && auth.authorities) || [];
  let data = localStorage.getItem("auth") || "";
  if (data) {
    data = JSON.parse(data);
    clientUtils.auth = "Bearer " + data.access_token;
  }
  if (roles.length) {
    if (!roles.find((item) => currentRole.find((item2) => item2 === item))) {
      if (auth) window.location.href = "/Dashboard";
      return;
    }
  }

  return (
    <Switch key={rest.key}>
      {typeof path === "string" ? (
        <Route path={path} {...rest} />
      ) : (
        path.map((item, index) => <Route path={item} {...rest} key={index} />)
      )}
    </Switch>
  );
};

export default RouterWithPaths;
