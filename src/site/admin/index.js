import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { Switch } from "react-router-dom";
import RouterWithPaths from "components/RouterWithPaths";
import {
  SideBar,
  Header,
  Breadcrumbs,
  Footer,
  SettingLayout,
} from "site/admin/components/admin";
import { connect } from "react-redux";
import dateUtils from "mainam-react-native-date-utils";
import "antd/dist/antd.css";
import { Loading } from "site/admin/components/admin";
const Admin = (props) => {
  useEffect(() => {
    window.registerEvent();
  });

  const routers = [
    {
      roles: [],
      path: ["/"],
      component: Loadable({
        loader: () => import("site/admin/containers/home"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-nhan-vien"],
      component: Loadable({
        loader: () => import("site/admin/containers/employee"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-muc-lam-ngoai-gio"],
      component: Loadable({
        loader: () => import("site/admin/containers/workOT"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/nhan-vien/them-moi", "/nhan-vien/chinh-sua/:id"],
      component: Loadable({
        loader: () => import("site/admin/containers/employee/create"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/nhan-vien/chi-tiet/:id"],
      component: Loadable({
        loader: () => import("site/admin/containers/employee/detail"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-bo-phan"],
      component: Loadable({
        loader: () => import("site/admin/containers/department"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-du-an"],
      component: Loadable({
        loader: () => import("site/admin/containers/project"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/khu-vuc-cham-cong"],
      component: Loadable({
        loader: () => import("site/admin/containers/checkin-Area"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/thong-tin-nhan-vien"],
      component: Loadable({
        loader: () => import("site/admin/containers/employee-info"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/cham-cong-tay"],
      component: Loadable({
        loader: () => import("site/admin/containers/check-in"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-chuyen-mon"],
      component: Loadable({
        loader: () => import("site/admin/containers/specialize"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-bao-nghi"],
      component: Loadable({
        loader: () => import("site/admin/containers/employee-leave"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/bao-cao-cham-cong"],
      component: Loadable({
        loader: () => import("site/admin/containers/report"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/thong-bao"],
      component: Loadable({
        loader: () => import("site/admin/containers/notification"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-ot"],
      component: Loadable({
        loader: () => import("site/admin/containers/listOT"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/de-xuat-nghi-phep"],
      component: Loadable({
        loader: () => import("site/admin/containers/offer-leave"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/danh-sach-hop-dong"],
      component: Loadable({
        loader: () => import("site/admin/containers/contract"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/loai-hop-dong"],
      component: Loadable({
        loader: () => import("site/admin/containers/contractType"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: [
        "/danh-sach-hop-dong/them-moi",
        "/danh-sach-hop-dong/chinh-sua/:id",
      ],
      component: Loadable({
        loader: () => import("site/admin/containers/contract/create"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/nguon-tuyen-dung"],
      component: Loadable({
        loader: () => import("site/admin/containers/recruitment-sources"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/nguon-tuyen-dung/them-moi", "/nguon-tuyen-dung/chinh-sua/:id"],
      component: Loadable({
        loader: () => import("site/admin/containers/recruitment-sources/create"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/tin-tuc"],
      component: Loadable({
        loader: () => import("site/admin/containers/news"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/de-xuat-ot"],
      component: Loadable({
        loader: () => import("site/admin/containers/offer-ot"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/lich-phong-van"],
      component: Loadable({
        loader: () => import("site/admin/containers/interview"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-quyen"],
      component: Loadable({
        loader: () => import("site/admin/containers/permission"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR", "ROLE_Manager"],
      path: ["/danh-sach-vai-tro"],
      component: Loadable({
        loader: () => import("site/admin/containers/role"),
        loading: Loading,
      }),
    },
    {
      roles: ["ROLE_HR"],
      path: ["/lich-di-lam"],
      component: Loadable({
        loader: () => import("site/admin/containers/work"),
        loading: Loading,
      }),
    },
  ];
  if (!props.auth || !props.auth.id) {
    localStorage.clear();
    props.history.push("/login");
    return null;
  }
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-inner">
          <SideBar />
          <div className="page-content-wrapper">
            <Header />
            <main id="js-page-content" role="main" className="page-content">
              <Breadcrumbs />
              <Switch>
                {routers.map((route, key) => {
                  if (route.component)
                    return (
                      <RouterWithPaths
                        exact
                        key={key}
                        roles={route.roles}
                        path={route.path}
                        render={(props) => {
                          return <route.component {...props} />;
                        }}
                      />
                    );
                  return null;
                })}
              </Switch>
            </main>
            <div
              className="page-content-overlay"
              data-action="toggle"
              data-class="mobile-nav-on"
            ></div>
            <Footer />
            <div
              className="modal fade modal-backdrop-transparent"
              id="modal-shortcut"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modal-shortcut"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-top modal-transparent"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <ul className="app-list w-auto h-auto p-0 text-left">
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-primary-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-home icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Home</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="page_inbox_general.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-success-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-success-300 "></i>
                            <i className="ni ni-envelope icon-stack-1x text-white"></i>
                          </div>
                          <span className="app-list-name">Inbox</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-plus icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Add More</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p id="js-color-profile" className="d-none">
              <span className="color-primary-50"></span>
              <span className="color-primary-100"></span>
              <span className="color-primary-200"></span>
              <span className="color-primary-300"></span>
              <span className="color-primary-400"></span>
              <span className="color-primary-500"></span>
              <span className="color-primary-600"></span>
              <span className="color-primary-700"></span>
              <span className="color-primary-800"></span>
              <span className="color-primary-900"></span>
              <span className="color-info-50"></span>
              <span className="color-info-100"></span>
              <span className="color-info-200"></span>
              <span className="color-info-300"></span>
              <span className="color-info-400"></span>
              <span className="color-info-500"></span>
              <span className="color-info-600"></span>
              <span className="color-info-700"></span>
              <span className="color-info-800"></span>
              <span className="color-info-900"></span>
              <span className="color-danger-50"></span>
              <span className="color-danger-100"></span>
              <span className="color-danger-200"></span>
              <span className="color-danger-300"></span>
              <span className="color-danger-400"></span>
              <span className="color-danger-500"></span>
              <span className="color-danger-600"></span>
              <span className="color-danger-700"></span>
              <span className="color-danger-800"></span>
              <span className="color-danger-900"></span>
              <span className="color-warning-50"></span>
              <span className="color-warning-100"></span>
              <span className="color-warning-200"></span>
              <span className="color-warning-300"></span>
              <span className="color-warning-400"></span>
              <span className="color-warning-500"></span>
              <span className="color-warning-600"></span>
              <span className="color-warning-700"></span>
              <span className="color-warning-800"></span>
              <span className="color-warning-900"></span>
              <span className="color-success-50"></span>
              <span className="color-success-100"></span>
              <span className="color-success-200"></span>
              <span className="color-success-300"></span>
              <span className="color-success-400"></span>
              <span className="color-success-500"></span>
              <span className="color-success-600"></span>
              <span className="color-success-700"></span>
              <span className="color-success-800"></span>
              <span className="color-success-900"></span>
              <span className="color-fusion-50"></span>
              <span className="color-fusion-100"></span>
              <span className="color-fusion-200"></span>
              <span className="color-fusion-300"></span>
              <span className="color-fusion-400"></span>
              <span className="color-fusion-500"></span>
              <span className="color-fusion-600"></span>
              <span className="color-fusion-700"></span>
              <span className="color-fusion-800"></span>
              <span className="color-fusion-900"></span>
            </p>
          </div>
        </div>
      </div>
      <SettingLayout />
    </div>
  );
}

export default connect((state) => {
  return {
    auth: state.auth.auth,
  };
})(Admin);
