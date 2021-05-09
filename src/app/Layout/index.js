import React, { Suspense } from "react";
// import Header from "app/Header";
// import ClientLayout from "pages/client";
// import Pages from "pages";
// import Sidebar from "../Sidebar";
import { Main } from "./styled";

export default function index() {
  return (
    <Main className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
      <Suspense fallback={<div></div>}>
        {/* <Header /> */}
      </Suspense>
      <div className="app-main">
        <Suspense fallback={<div></div>}>
          {/* <Sidebar /> */}
        </Suspense>

        <div className="app-main__outer">
          <div className="app-main__inner">
            {/* <Pages /> */}
          </div>
          {/* <div className="app-wrapper-footer">
            <div className="app-footer">
              <div className="app-footer__inner">
                <div className="app-footer-left"></div>
                <div className="app-footer-right">Một sản phẩm của iSofH</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Main>
  );
}
