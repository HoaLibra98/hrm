import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Tooltip, Form, Input } from "antd";

function Specialize(props) {
  const {
    listSpecialize,
    loadSpecialize,
    page,
    size,
    updateData,
    deleteItem,
    tenSearch,
    timeRequest,
    total,
    onPageChange,
    onSizeChange,
    id,
    ten,
    moTa,
    createOrEdit,
    checkValidate,
  } = props;
  useEffect(() => {
    updateData({
      id: "",
      ten: "",
      moTa: "",
      checkValidate: false,
      tenSearch: "",
      size: 10,
    });
    loadSpecialize({
      page: page || 1,
      size: size || 10,
    });
  }, []);

  let data = listSpecialize.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.ten,
      col3: item.moTa,
      col4: item,
    };
  });
  const editItem = (item) => {
    updateData({
      ten: item.ten,
      moTa: item.moTa,
      id: item.id,
    });
  };
  const onSearch = (event) => {
    updateData({
      tenSearch: event.target.value,
    });
    if (timeRequest) {
      try {
        clearTimeout(timeRequest);
      } catch (error) {}
    }
    let data = setTimeout(() => {
      loadSpecialize();
    }, 500);
    updateData({
      timeRequest: data,
    });
  };
  const onSubmit = () => {
    let payload = {
      id,
      param: {
        ten,
        moTa,
      },
    };
    if (!ten) {
      updateData({
        checkValidate: true,
      });
      return {};
    } else {
      updateData({ checkValidate: false });
      createOrEdit(payload).then((s) => {});
    }
  };
  const onCancel = () => {
    updateData({
      ten: "",
      id: "",
      moTa: "",
    });
  };
  return (
    <>
      <AdminPage
        header="Danh sách Chuyên môn"
        subheader="Danh sách Chuyên môn"
        icon="subheader-icon fal fa-window"
      >
        <div className="row">
          <div className="col-8">
            <Panel
              title="Danh sách Chuyên môn"
              allowFullScreen={false}
              allowClose={false}
              // toolbar={
              //   <div className="toolbar">
              //     <Button className="button" onClick={openModal}>
              //       Thêm mới
              //     </Button>
              //   </div>
              // }
              icon={[<i className="fal fa-users"></i>]}
            >
              <Table
                style={{ marginLeft: 10, marginRight: -10 }}
                className="custom"
                scroll={{ x: 500, y: 500 }}
                columns={[
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">STT</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    dataIndex: "col1",
                    key: "col1",
                    width: 70,
                    align: "center",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Chuyên môn</div>
                        <div className="addition-box">
                          <div className="search-box">
                            <img
                              src={require("resources/images/icon/ic_search.png")}
                              alt=""
                            />
                            <input
                              value={tenSearch}
                              onChange={(event) => onSearch(event)}
                              placeholder="Tìm theo chuyên môn"
                            />
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
                        <div className="title-box">Ghi chú</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 200,
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
                    width: 120,
                    dataIndex: "col4",
                    key: "col4",
                    align: "center",
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
                          <Tooltip placement="topLeft" title={"Xóa"}>
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                              onClick={() => deleteItem(item)}
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
              ></Table>
              <div className="footer">
                <SelectSize
                  value={size}
                  selectItem={(e) => onSizeChange(e)}
                ></SelectSize>
                <Pagination
                  page={page}
                  size={size}
                  total={total}
                  onPageChange={(e) => onPageChange(e)}
                ></Pagination>
              </div>
            </Panel>
          </div>
          <div className="col-4">
            <Panel
              title="Thêm mới"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-users"></i>]}
            >
              <Form layout="vertical">
                <Form.Item label="Tên chuyên môn">
                  <Input
                    value={ten}
                    placeholder="Nhập tên chuyên môn"
                    onChange={(e) => {
                      updateData({ ten: e.target.value });
                    }}
                  />
                  {checkValidate && !ten ? (
                    <div style={{ color: "red" }}>
                      Vui lòng nhập tên chuyên môn!
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ghi chú">
                  <Input
                    value={moTa}
                    placeholder="Nhập ghi chú"
                    onChange={(e) => {
                      updateData({ moTa: e.target.value });
                    }}
                  />
                </Form.Item>
                <div className="button-footer-panel">
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
    auth: { auth },
    specialize: {
      listSpecialize,
      page,
      size,
      isOpen,
      tenSearch,
      timeRequest,
      total,
      id,
      ten,
      moTa,
      checkValidate,
    },
  } = state;
  return {
    auth,
    listSpecialize,
    page: page || 1,
    size: size || 10,
    isOpen: isOpen || false,
    tenSearch,
    timeRequest,
    total: total || 0,
    id,
    ten,
    moTa,
    checkValidate,
  };
};
const mapDispatchToProps = ({
  specialize: {
    loadSpecialize,
    updateData,
    deleteItem,
    onPageChange,
    onSizeChange,
    createOrEdit,
  },
}) => ({
  loadSpecialize,
  updateData,
  deleteItem,
  onPageChange,
  onSizeChange,
  createOrEdit,
});
export default connect(mapStateToProps, mapDispatchToProps)(Specialize);
