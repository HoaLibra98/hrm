import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, DatePicker, Form, Input, Tooltip } from "antd";
import ListImage from "site/admin/components/device/ListImage";
import moment from "moment";
import "./style.scss";
const { TextArea } = Input;

function News(props) {
  const {
    listNews,
    loadNews,
    updateData,
    page,
    size,
    total,
    tieuDe,
    ngayCongBo,
    noiDung,
    id,
    dinhKem,
    deleteItem,
    createOrEdit,
    onPageChange,
    onReset,
    checkValidate,
    requestTimeout,
    ngayHoatDong,
    ten,
  } = props;
  useEffect(() => {
    onReset();
    loadNews();
  }, []);
  let data = listNews.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.tieuDe,
      col3: item.noiDung,
      col4: item.ngayCongBo && moment(item.ngayCongBo).format("DD/MM/YYYY"),
      col5: item,
    };
  });
  const editItem = (item) => {
    updateData({
      id: item.id,
      tieuDe: item.tieuDe,
      noiDung: item.noiDung,
      dinhKem: item.dinhKem,
      ngayCongBo: item.ngayCongBo,
    });
  };
  const onDeleteItem = (item) => {
    deleteItem(item);
  };
  const onChangeImage = (e) => {
    updateData({
      dinhKem: e,
    });
  };
  const onCancel = () => {
    onReset();
  };
  const createOrEditItem = () => {
    if (tieuDe && noiDung && ngayCongBo && dinhKem) {
      updateData({
        checkValidate: false,
      });
      let payload = {
        id,
        param: {
          tieuDe,
          noiDung,
          ngayCongBo: ngayCongBo && ngayCongBo._d,
          dinhKem,
        },
      };
      createOrEdit(payload).then((s) => {
        onReset();
      });
    } else {
      updateData({
        checkValidate: true,
      });
      return;
    }
  };
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onSearch = (e, item) => {
    updateData({
      [item]: e,
      page: 1,
    });
    if (requestTimeout) {
      try {
        clearTimeout(requestTimeout);
      } catch (error) {}
    }
    let data = setTimeout(() => loadNews(), 500);
    updateData({
      requestTimeout: data,
    });
  };
  return (
    <>
      <AdminPage
        header="Quản lý tin tức"
        subheader="Quản lý tin tức"
        icon="subheader-icon fal fa-window"
      >
        <div className="row dm-news">
          <div className="col-8">
            <Panel
              title="Danh sách tin tức"
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-newspaper"></i>]}
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
                        <div className="title-box">Tiêu đề</div>
                        <div className="addition-box">
                          <div className="search-box">
                            <img
                              src={require("resources/images/icon/ic_search.png")}
                              alt=""
                            />
                            <input
                              placeholder="Tìm theo tiêu đề"
                              onChange={(e) => {
                                onSearch(e.target.value, "ten");
                              }}
                              value={ten}
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
                        <div className="title-box">Nội dung</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 250,
                    dataIndex: "col3",
                    key: "col3",
                    render: (item) => {
                      return <div className="text-over-hidden">{item}</div>
                    }
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Ngày hoạt động</div>
                        <div className="addition-box">
                          <DatePicker
                            placeholder="Ngày hoạt động"
                            onChange={(e) => {
                              onSearch(e, "ngayHoatDong");
                            }}
                            format={"DD/MM/YYYY"}
                            value={ngayHoatDong && moment(ngayHoatDong)}
                          />
                        </div>
                      </div>
                    ),
                    width: 150,
                    dataIndex: "col4",
                    key: "col4",
                  },
                  {
                    title: (
                      <div className="custome-header">
                        <div className="title-box">Tiện ích</div>
                        <div className="addition-box"></div>
                      </div>
                    ),
                    width: 120,
                    key: "col5",
                    dataIndex: "col5",
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
                                onDeleteItem(item);
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
                <SelectSize value={size} selectItem={onSizeChange} />
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
              title={id ? "Cập nhật" : "Thêm mới"}
              allowClose={false}
              allowFullScreen={false}
              icon={[<i className="fal fa-newspaper"></i>]}
            >
              <Form layout="vertical">
                <Form.Item>
                  <ListImage
                    uploadImage={(e) => onChangeImage(e)}
                    files={dinhKem}
                    provider="news"
                  />
                  {checkValidate && !dinhKem ? (
                    <div className="error">Vui lòng chọn ảnh đính kèm</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Tiêu đề tin tức">
                  <Input
                    placeholder="Nhập tiêu đề tin tức"
                    value={tieuDe}
                    onChange={(e) => {
                      updateData({ tieuDe: e.target.value });
                    }}
                  />
                  {checkValidate && !tieuDe ? (
                    <div className="error">Vui lòng nhập tiêu đề</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Nội dung tin tức">
                  <TextArea
                    placeholder="Nhập nội dung tin tức"
                    rows={7}
                    value={noiDung}
                    onChange={(e) => {
                      updateData({ noiDung: e.target.value });
                    }}
                  />
                  {checkValidate && !noiDung ? (
                    <div className="error">Vui lòng nhập nội dung</div>
                  ) : null}
                </Form.Item>
                <Form.Item label="Ngày hoạt động">
                  <DatePicker
                    placeholder="Ngày hoạt động"
                    value={ngayCongBo}
                    onChange={(e) => {
                      updateData({ ngayCongBo: e });
                    }}
                    format={"DD/MM/YYYY"}
                  />
                  {checkValidate && !ngayCongBo ? (
                    <div className="error">Vui lòng chọn ngày hoạt động</div>
                  ) : null}
                </Form.Item>
              </Form>
              <div className="submit-button button-footer-panel">
                <Button onClick={onCancel}>Hủy</Button>
                <Button type="primary" onClick={createOrEditItem}>
                  {id ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </Panel>
          </div>
        </div>
      </AdminPage>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    news: {
      listNews,
      page,
      size,
      total,
      tieuDe,
      ngayCongBo,
      noiDung,
      id,
      dinhKem,
      checkValidate,
      requestTimeout,
      ten,
      ngayHoatDong,
    },
  } = state;
  return {
    listNews,
    page: page || 1,
    size: size || 10,
    total,
    tieuDe,
    ngayCongBo: ngayCongBo && moment(ngayCongBo),
    noiDung,
    id,
    dinhKem,
    checkValidate,
    requestTimeout,
    ten,
    ngayHoatDong,
  };
};
const mapDispatchToProps = ({
  news: {
    updateData,
    loadNews,
    createOrEdit,
    deleteItem,
    onSizeChange,
    onPageChange,
    onReset,
  },
}) => ({
  updateData,
  loadNews,
  createOrEdit,
  deleteItem,
  onSizeChange,
  onPageChange,
  onReset,
});
export default connect(mapStateToProps, mapDispatchToProps)(News);
