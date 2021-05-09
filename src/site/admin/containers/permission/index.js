import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Form, Tooltip, Input } from "antd";

function Permission(props) {
  const {
    listPermission,
    page,
    size,
    total,
    ma,
    ten,
    id,
    updateData,
    loadPermission,
    createOrEdit,
    deleteItem,
    onSizeChange,
    onPageChange,
    requestTime,
    checkValidate,
    maSearch,
    nameSearch,
  } = props;
  useEffect(() => {
    updateData({
      id: "",
      ten: "",
      ma: "",
      checkValidate: false,
      maSearch: "",
      nameSearch: "",
    });
    loadPermission({ size, page });
  }, []);
  let data = listPermission.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.ma,
      col3: item.ten,
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
  const onSearch = (e, action) => {
    updateData({
      [action]: e.target.value,
    });
    if (requestTime) {
      try {
        clearTimeout(requestTime);
      } catch (error) { }
    }
    let data = setTimeout(() => {
      loadPermission({ size: 10, page: 1 });
    }, 500);
    updateData({ requestTime: data });
  };
  const onCancel = () => {
    updateData({
      id: "",
      ten: "",
      ma: "",
      checkValidate: false,
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

  return (
    <>
      <AdminPage
        header="Quản lý quyền"
        subheader="Quản lý quyền"
        icon="subheader-icon fal fa-window"
      >
        <div className="row">
          <div className="col-8">
            <Panel
              title="Danh sách quyền"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-user-cog"></i>]}
            >
              <Table
                className="custom"
                scroll={{ x: 800, y: 500 }}
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
                    width: 50,
                    key: "col1",
                    dataIndex: "col1",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Mã quyền</div>
                        <div className="addition-box">
                          <div className="search-box">
                            <img
                              src={require("resources/images/icon/ic_search.png")}
                              alt=""
                            />
                            <input
                              placeholder="Tìm theo mã quyền"
                              value={maSearch}
                              onChange={(e) => onSearch(e, "maSearch")}
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
                        <div className="title-box">Tên quyền</div>
                        <div className="addition-box">
                          <div className="search-box">
                            <img
                              src={require("resources/images/icon/ic_search.png")}
                              alt=""
                            />
                            <input
                              placeholder="Tìm theo tên quyền"
                              value={nameSearch}
                              onChange={(e) => onSearch(e, "nameSearch")}
                            />
                          </div>
                        </div>
                      </div>
                    ),
                    width: 250,
                    dataIndex: "col3",
                    key: "col3",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tiện ích</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 70,
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
                          <Tooltip placement="topLeft" title="Xóa">
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                              onClick={() => {
                                deleteItem(item);
                              }}
                            >
                              <i className="fal fa-trash-alt"></i>
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
                <Form.Item label="Mã quyền">
                  <Input
                    placeholder="Nhập mã quyền"
                    value={ma}
                    onChange={(e) => updateData({ ma: e.target.value })}
                  />
                  {checkValidate && !ma ? (
                    <div className="validate">Vui lòng nhập mã quyền!</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Tên quyền">
                  <Input
                    placeholder="Nhập tên quyền"
                    value={ten}
                    onChange={(e) => updateData({ ten: e.target.value })}
                  />
                  {checkValidate && !ten ? (
                    <div className="validate">Vui lòng nhập tên quyền!</div>
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
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    permission: {
      listPermission,
      page,
      size,
      total,
      ma,
      ten,
      id,
      checkValidate,
      requestTime,
      maSearch,
      nameSearch,
    },
  } = state;
  return {
    listPermission,
    page: page || 1,
    size: size || 10,
    total,
    ma,
    ten,
    id,
    checkValidate,
    requestTime,
    maSearch,
    nameSearch,
  };
};
const mapDispatchToProps = ({
  permission: {
    updateData,
    loadPermission,
    createOrEdit,
    deleteItem,
    onSizeChange,
    onPageChange,
  },
}) => ({
  updateData,
  loadPermission,
  createOrEdit,
  deleteItem,
  onSizeChange,
  onPageChange,
});
export default connect(mapStateToProps, mapDispatchToProps)(Permission);
