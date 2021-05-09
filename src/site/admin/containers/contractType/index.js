import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Form, Input, Tooltip } from "antd";

function ContractType(props) {
  const {
    listContractType,
    loadContractType,
    page,
    size,
    updateData,
    createOrEdit,
    ten,
    ghiChu,
    id,
    checkValidte,
    total,
    onSizeChange,
    onPageChange,
    timeRequest,
    nameSearch,
  } = props;
  useEffect(() => {
    updateData({
      checkValidte: false,
      id: "",
      ten: "",
      ghiChu: "",
      tenSearch: "",
    });
    loadContractType({ page, size });
  }, []);
  let data = listContractType.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.ten,
      col3: item.ghiChu,
      col4: item,
    };
  });
  const onCancel = () => {
    updateData({
      ten: "",
      ghiChu: "",
      id: "",
    });
  };
  const onSubmit = () => {
    let payload = {
      id,
      param: {
        ten,
        ghiChu,
      },
    };
    if (ten) {
      updateData({ checkValidte: false });
      createOrEdit(payload);
    } else {
      updateData({ checkValidte: true });
      return {};
    }
  };
  const editItem = (item) => {
    updateData({
      ten: item.ten,
      ghiChu: item.ghiChu,
      id: item.id,
    });
  };
  const onSearch = (e) => {
    updateData({ tenSearch: e.target.value });
    if (timeRequest) {
      try {
        clearTimeout(timeRequest);
      } catch (error) {}
    }
    let data = setTimeout(() => {
      loadContractType({ page: 1, size: 10 });
    }, 500);
    updateData({ timeRequest: data });
  };
  return (
    <>
      <AdminPage
        header="Danh sách loại hợp đồng"
        subheader="Danh sách loại hợp đồng"
        icon="subheader-icon fal fa-window"
      >
        <div className="row">
          <div className="col-8">
            <Panel
              title="Danh sách loại hợp đồng"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-id-card-alt"></i>]}
            >
              <Table
                style={{ marginLeft: -10, marginRight: -10 }}
                scroll={{ x: 800, y: 500 }}
                className="custom"
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
                    width: 60,
                    align: "center",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Loại hợp đồng</div>
                        <div className="addition-box">
                          <div className="search-box">
                            <img
                              src={require("resources/images/icon/ic_search.png")}
                              alt=""
                            />
                            <input
                              placeholder="Tìm theo loại hợp đồng"
                              value={nameSearch}
                              onChange={(e) => onSearch(e)}
                            />
                          </div>
                        </div>
                      </div>
                    ),
                    dataIndex: "col2",
                    key: "col2",
                    width: 200,
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Ghi chú</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    dataIndex: "col3",
                    key: "col3",
                    width: 200,
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tiện ích</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    key: "col4",
                    dataIndex: "col4",
                    width: 90,
                    fixed: "right",
                    render: (item) => {
                      return (
                        <div className="col-action">
                          <Tooltip placement="topLeft" title="Sửa">
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                              onClick={() => {
                                editItem(item);
                              }}
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
              ></Table>
              <div className="footer">
                <SelectSize
                  value={size}
                  selectItem={(e) => onSizeChange(e)}
                ></SelectSize>
                <Pagination
                  page={page}
                  size={size}
                  onPageChange={(e) => onPageChange(e)}
                  total={total}
                ></Pagination>
              </div>
            </Panel>
          </div>
          <div className="col-4">
            <Panel title="Thêm mới" allowClose={false} allowFullScreen={false}>
              <Form layout="vertical">
                <Form.Item label="Tên loại*">
                  <Input
                    placeholder="Nhập tên loại hợp đồng"
                    value={ten}
                    onChange={(e) => {
                      updateData({ ten: e.target.value });
                    }}
                  />
                  {checkValidte && !ten ? (
                    <div style={{ color: "red" }}>
                      Vui lòng nhập tên loại hợp đồng!
                    </div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ghi chú">
                  <Input
                    placeholder="Nhập ghi chú"
                    value={ghiChu}
                    onChange={(e) => {
                      updateData({ ghiChu: e.target.value });
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
    contractType: {
      listContractType,
      page,
      size,
      isOpen,
      ten,
      ghiChu,
      id,
      checkValidte,
      total,
      timeRequest,
      nameSearch,
    },
  } = state;

  return {
    listContractType,
    page: page || 1,
    size: size || 10,
    isOpen,
    ten,
    ghiChu,
    id,
    checkValidte,
    total: total || size,
    timeRequest,
    nameSearch,
  };
};
const mapDispatchToProps = ({
  contractType: {
    loadContractType,
    updateData,
    createOrEdit,
    onSizeChange,
    onPageChange,
  },
}) => ({
  loadContractType,
  updateData,
  createOrEdit,
  onSizeChange,
  onPageChange,
});
export default connect(mapStateToProps, mapDispatchToProps)(ContractType);
