import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Tooltip } from "antd";

function RecruitmentSources(props) {
  const {
    listRecruitment,
    loadRecruitment,
    page,
    size,
    total,
    onPageChange,
    onSizeChange,
    onDeleteItem,
    tenSearch,
    nguoiLienHeSearch,
    updateData,
    diaChiSearch,
    request,
    webSearch,
  } = props;
  useEffect(() => {
    loadRecruitment();
  }, []);
  let data = listRecruitment.map((item, index) => {
    return {
      key: item.id,
      col1: (page - 1) * size + index + 1,
      col2: item.ten,
      col3: item.website,
      col4: item.diaChi,
      col5: item.soDienThoai,
      col6: item.nguoiLienHe,
      col7: item.soTien ? item.soTien.formatPrice() : null,
      col8: item.soLuong,
      col9: item,
    };
  });
  const onChangeSize = (size) => {
    onSizeChange(size);
  };
  const onChangePage = (page) => {
    onPageChange(page);
  };
  const createItem = () => {
    props.history.push("/nguon-tuyen-dung/them-moi");
  };
  const editItem = (item) => {
    props.history.push(`/nguon-tuyen-dung/chinh-sua/${item.id}`);
  };
  const deleteItem = (item) => {
    onDeleteItem(item);
  };
  const onSearch = (e, action) => {
    updateData({
      [action]: e.target.value,
    });
    if (request) {
      try {
        clearTimeout(request);
      } catch (error) {}
    }
    let data = setTimeout(() => loadRecruitment(), 500);
    updateData({ request: data });
  };
  return (
    <>
      <AdminPage
        header="Danh sách nguồn tuyển dụng"
        subheader="Danh sách nguồn tuyển dụng"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Danh sách nguồn tuyển dụng"
          toolbar={
            <div className="toolbar">
              <Button className="button" onClick={createItem}>
                Thêm mới
              </Button>
            </div>
          }
          icon={[<i className="fal fa-users-class"></i>]}
        >
          <Table
            style={{ marginLeft: -10, marginRight: -10 }}
            className="custom"
            scroll={{ x: 800, y: 500 }}
            columns={[
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">STT</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col1",
                dataIndex: "col1",
                width: 100,
                align: "center",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tên nguốn tuyển dụng</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          placeholder="Tìm theo tên nguồn tuyển dụng"
                          value={tenSearch}
                          onChange={(e) => onSearch(e, "tenSearch")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 250,
                key: "col2",
                dataIndex: "col2",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Website</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          placeholder="Tìm theo website"
                          value={webSearch}
                          onChange={(e) => onSearch(e, "webSearch")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 250,
                key: "col3",
                dataIndex: "col3",
                render: (website) => {
                  return (
                    <a href={website} target="_blank">
                      {website}
                    </a>
                  );
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Địa chỉ</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          placeholder="Tìm theo địa chỉ"
                          value={diaChiSearch}
                          onChange={(e) => onSearch(e, "diaChiSearch")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 250,
                key: "col4",
                dataIndex: "col4",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Số điện thoại</div>
                    <div className="addition-box">
                      {/* <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input placeholder="Tìm theo số điện thoại" />
                      </div> */}
                    </div>
                  </div>
                ),
                width: 200,
                key: "col5",
                dataIndex: "col5",
                align: "center",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Người liên hệ</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          placeholder="Tìm theo người liên hệ"
                          value={nguoiLienHeSearch}
                          onChange={(e) => onSearch(e, "nguoiLienHeSearch")}
                        />
                      </div>
                    </div>
                  </div>
                ),
                width: 200,
                key: "col6",
                dataIndex: "col6",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tiền</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 150,
                key: "col7",
                dataIndex: "col7",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Số lượng</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 150,
                key: "col8",
                dataIndex: "col8",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tiện ích</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                width: 90,
                key: "col9",
                dataIndex: "col9",
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
          ></Table>
          <div className="footer">
            <SelectSize value={size} selectItem={onChangeSize}></SelectSize>
            <Pagination
              page={page}
              size={size}
              total={total}
              onPageChange={onChangePage}
            ></Pagination>
          </div>
        </Panel>
      </AdminPage>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    recruitment: {
      listRecruitment,
      page,
      size,
      total,
      tenSearch,
      nguoiLienHeSearch,
      diaChiSearch,
      request,
      webSearch,
    },
  } = state;
  return {
    listRecruitment,
    page: page || 1,
    size: size || 10,
    total,
    tenSearch,
    nguoiLienHeSearch,
    diaChiSearch,
    request,
    webSearch,
  };
};
const mapDispatchToProp = ({
  recruitment: {
    loadRecruitment,
    onPageChange,
    onSizeChange,
    onDeleteItem,
    updateData,
  },
}) => ({
  loadRecruitment,
  onPageChange,
  onSizeChange,
  onDeleteItem,
  updateData,
});
export default connect(mapStateToProps, mapDispatchToProp)(RecruitmentSources);
