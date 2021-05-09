import React from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Button, Select } from "antd";
import { Table, SelectSize, Pagination } from "site/admin/components/common";

function index(props) {
  return (
    <>
      {/* <AdminPage
        header="Danh sách lịch phỏng vấn"
        subheader="Danh sách lịch phỏng vấn"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Danh sách lịch phỏng vấn"
          toolbar={
            <div className="toolbar">
              <Button className="button">Thêm mới</Button>
            </div>
          }
        >
          <Table
            scroll={{ x: 800, y: 500 }}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">STT</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 70,
                dataIndex: "col1",
                key: "col1",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Họ và tên</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input />
                      </div>
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col2",
                key: "col2",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Email</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input />
                      </div>
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col3",
                key: "col3",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">SĐT</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 150,
                dataIndex: "col4",
                key: "col4",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Vị trí</div>
                    <div className="addition-box">
                      <Select></Select>
                    </div>
                  </div>
                ),
                width: 150,
                dataIndex: "col5",
                key: "col5",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Giờ phỏng vấn</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                dataIndex: "col6",
                key: "col6",
                width: 120,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Trường</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input />
                      </div>
                    </div>
                  </div>
                ),
                width: 150,
                dataIndex: "col7",
                key: "col7",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Chuyên ngành</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input />
                      </div>
                    </div>
                  </div>
                ),
                width: 150,
                key: "col8",
                dataIndex: "col8",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Nguồn tuyển dụng</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input />
                      </div>
                    </div>
                  </div>
                ),
                width: 200,
                dataIndex: "col9",
                key: "col9",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Comfirm</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 100,
                dataIndex: "col10",
                key: "col10",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tham dự phỏng vấn</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 200,
                key: "col11",
                dataIndex: "col11",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Kết quả</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 150,
                key: "col12",
                dataIndex: "col12",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">tiện ích</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                fixed: "right",
                key: "col13",
                dataIndex: "col13",
              },
            ]}
          ></Table>
          <div className="footer">
            <SelectSize />
            <Pagination />
          </div>
        </Panel>
      </AdminPage>
     */}
    </>
  );
}

export default index;
