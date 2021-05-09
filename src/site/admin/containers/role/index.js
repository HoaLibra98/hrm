import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Tooltip, Form, Input } from "antd";
import Authorization from "./authorization";

function Role(props) {
  const {
    id,
    listRole,
    loadRole,
    updateData,
    page,
    size,
    total,
    ma,
    onSizeChange,
    onPageChange,
    openPermission,
    checkValidate,
    ten,
    createOrEdit,
    timeRequest,
    tenSearch,
  } = props;
  useEffect(() => {
    loadRole({ page, size });
    updateData({
      openPermission: false,
      id: "",
      ten: "",
      ma: "",
      tenSearch: "",
    });
  }, []);
  let data = listRole.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.ten,
      col3: item,
      col4: item,
    };
  });
  const editItem = (item) => {
    updateData({
      id: item.id,
      ten: item.ten,
      ma: item.ma,
    });
  };
  const openPermiss = (item) => {
    updateData({
      openPermission: true,
      id: item.id,
      ten: item.ten,
      ma: ma,
    });
  };
  const onSubmit = () => {
    if (ten && ma) {
      updateData({ checkValidate: false });
      createOrEdit();
    } else {
      updateData({ checkValidate: true });
      return;
    }
  };
  const onCancel = () => {
    updateData({
      id: "",
      ten: "",
      ma: "",
    });
  };
  const onSearch = (e) => {
    updateData({ tenSearch: e.target.value });
    if (timeRequest) {
      try {
        clearTimeout(timeRequest);
      } catch (error) { }
    }
    let data = setTimeout(() => {
      loadRole();
    }, 500);
    updateData({ timeRequest: data });
  };
  return (
    <>
      <AdminPage
        header="Quản lý vai trò"
        subheader="Quản lý vai trò"
        icon="subheader-icon fal fa-window"
      >
        <div className="row">
          <div className="col-8">
            <Panel
              title="Danh sách vai trò"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-user-cog"></i>]}
            >
              <Table
                className="custom"
                scroll={{ x: 500, y: 500 }}
                style={{ marginLeft: -10, marginRight: -10 }}
                columns={[
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">STT</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    align: "center",
                    width: 40,
                    key: "col1",
                    dataIndex: "col1",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tên vai trò</div>
                        <div className="addition-box">
                          <div className="search-box">
                            <img
                              src={require("resources/images/icon/ic_search.png")}
                              alt=""
                            />
                            <input
                              placeholder="Tìm theo tên vai trò"
                              value={tenSearch}
                              onChange={(e) => onSearch(e)}
                            />
                          </div>
                        </div>
                      </div>
                    ),
                    width: 150,
                    dataIndex: "col2",
                    key: "col2",
                    align: "center",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Nhóm quyền</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 150,
                    dataIndex: "col3",
                    key: "col3",
                    align: "center",
                    render: (item) => {
                      return (
                        <Button onClick={() => openPermiss(item)}>
                          Gán quyền
                        </Button>
                      );
                    },
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tiện ích</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 90,
                    key: "col4",
                    dataIndex: "col4",
                    fixed: "right",
                    render: (item) => {
                      return (
                        <div className="col-action">
                          <Tooltip placement="topLeft" title="Sửa">
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                              onClick={() => editItem(item)}
                            >
                              <i className="fal fa-edit"></i>
                            </button>
                          </Tooltip>
                        </div>
                      );
                    },
                  },
                ]}
                dataSource={data}
              />
              <div className="footer">
                <SelectSize value={size} selectItem={(e) => onSizeChange(e)} />
                <Pagination
                  onPageChange={(e) => onPageChange(e)}
                  page={page}
                  size={size}
                  total={total}
                  style={{ flex: 1, justifyContent: "flex-end" }}
                />
              </div>
            </Panel>
          </div>
          <div className="col-4">
            <Panel
              title="Thêm mới"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-user-cog"></i>]}
            >
              <Form layout="vertical">
                <Form.Item label="Mã vai trò*">
                  <Input
                    placeholder="Nhập mã vai trò"
                    value={ma}
                    onChange={(e) => updateData({ ma: e.target.value })}
                    disabled={id ? true : false}
                  />
                  {checkValidate && !ma ? (
                    <div className="validate">Vui lòng nhập mã vai trò!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Tên vai trò*">
                  <Input
                    placeholder="Nhập tên vai trò"
                    value={ten}
                    onChange={(e) => updateData({ ten: e.target.value })}
                  />
                  {checkValidate && !ten ? (
                    <div className="validate">Vui lòng nhập tên vai trò!</div>
                  ) : null}
                </Form.Item>
                <div
                  className="button-footer-panel"
                >
                  <Button onClick={onCancel} style={{ marginRight: 8 }} className="btn btn-delete">
                    Hủy
                  </Button>
                  <Button type="primary" onClick={onSubmit}>
                    {id ? "Cập nhật" : "Thêm mới"}
                  </Button>
                </div>
              </Form>
            </Panel>
          </div>
        </div>
      </AdminPage>
      {openPermission ? <Authorization /> : null}
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    role: {
      listRole,
      page,
      size,
      total,
      id,
      ma,
      dmQuyen,
      openPermission,
      checkValidate,
      ten,
      timeRequest,
      tenSearch,
    },
  } = state;
  return {
    listRole,
    page: page || 1,
    size: size || 10,
    total,
    id,
    ten,
    ma,
    dmQuyen,
    openPermission,
    checkValidate,
    timeRequest,
    tenSearch,
  };
};
const mapDispatchToProps = ({
  role: {
    updateData,
    loadRole,
    createOrEdit,
    deleteItem,
    onSizeChange,
    onPageChange,
  },
}) => ({
  updateData,
  loadRole,
  createOrEdit,
  deleteItem,
  onSizeChange,
  onPageChange,
});
export default connect(mapStateToProps, mapDispatchToProps)(Role);
