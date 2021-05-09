import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ThemeProvider } from "styled-components";
import { pink } from "themes";
import Layout from "app/Layout";
import Admin from "site/admin";
import NoiQuy from "site/user/containers/rules";
import Auth from "site/user/containers/auth/LoginScreen";
import { Main } from "./styled";
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import RouterWithPaths from "components/RouterWithPaths";

import { Switch, Route } from "react-router-dom";
import { originUrl, accountUrl } from "client/request";
import { useHistory } from "react-router-dom";

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

const App = (props) => {
  const history = useHistory();

  useEffect(() => {
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const authCode = urlParams.get("code");
    // if (urlParams.get("access_token")) {
    //   props.loadWithToken(urlParams.get("access_token"));
    // }
    // if (authCode) {
    //   onLogin(authCode, "", originUrl);
    // } else {
    //   if (
    //     (!props.auth || !props.auth.access_token) &&
    //     !urlParams.get("access_token")
    //   ) {
    //     window.location.href = accountUrl;
    //   }
    // }
    reportWindowSize();
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);
  useEffect(() => {
    props.checkRole();
  }, []);
  const reportWindowSize = () => {
    props.updateApplication({
      width: window.innerWidth,
    });
  };
  // const onLogin = (code, deviceToken, redirectURI) => {
  //   props.updateData({ auth: null });
  //   props
  //     .onLogin({ code, deviceToken, redirectURI })
  //     .then((s) => {
  //       const urlParams = new URLSearchParams(window.location.search);
  //       const state = decodeURIComponent(urlParams.get("state"));
  //       if (history) history.push(`${state}`);
  //     })
  //     .catch((e) => {});
  // };
  const logout = connect(null, ({ auth: { updateData } }) => ({ updateData }))(
    (props) => {
      props.updateData({
        auth: null,
      });
      localStorage.removeItem("auth");
      setTimeout(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        window.location.href = urlParams.get("redirect") || "/";
      }, 2000);
      return null;
    }
  );
  String.prototype.uintTextBox = function () {
    var re = /^\d*$/;
    return re.test(this);
  };
  const routers = [
    {
      path: ["/login"],
      component: Auth,
    },
    {
      path: ["/noiquy"],
      component: NoiQuy,
    },
    {
      path: ["/logout"],
      component: logout,
    },
    {
      path: [
        "/",
        "/:function1",
        "/:function1/:id",
        "/:function1/:function2/:id",
      ],
      component: Admin,
    },
  ];
  return (
    <ThemeProvider theme={pink}>
      <ConfigProvider locale={viVN}>
        <Switch>
          {routers.map((route, key) => {
            if (route.component)
              return (
                <RouterWithPaths
                  key={key}
                  path={route.path}
                  render={(props) => {
                    return <route.component {...props} />;
                  }}
                />
              );
            return null;
          })}
        </Switch>
      </ConfigProvider>
    </ThemeProvider>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
});

const mapDispatch = ({
  auth: { onLogin, onLogout, updateData, loadWithToken, checkRole },
  application: { updateData: updateApplication },
}) => ({
  onLogin,
  onLogout,
  updateData,
  loadWithToken,
  updateApplication,
  checkRole,
});

export default connect(mapState, mapDispatch)(App);
