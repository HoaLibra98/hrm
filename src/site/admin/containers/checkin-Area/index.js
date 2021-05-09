import React, { useEffect } from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import Create from "./create";
function CheckinArea(props) {
  const {
    loadData,
    listCheckinArea,
    updateData,
    openModal,
    tenSearch,
    onReset,
    requestTimeout,
  } = props;
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    updateData({
      page,
    });
    loadData(page);
  };
  useEffect(() => {
    onReset();
    loadData({ page: 1 });
  }, []);
  let data =
    listCheckinArea &&
    listCheckinArea.length &&
    listCheckinArea.map((item, index) => {
      return {
        key: index,
        col1: (props.page - 1) * props.size + index + 1,
        col2: item.ten,
        col3: item.anTrua && `${item.anTrua.formatPrice()} vnđ` || 0,
        col4: item.anToi && `${item.anToi.formatPrice()} vnđ` || 0,
        col5: item,
      };
    });
  const onOpenModal = (item) => {
    if (item && item.id) {
      updateData({
        openModal: true,
        ...item,
      });
    } else {
      updateData({
        openModal: true,
        active: true,
      });
    }
  };
  const onDelete = (item) => {
    props.onDelete(item);
  };
  const onSearch = (e, item) => {
    updateData({
      [item]: e,
    });
    if (requestTimeout) {
      try {
        clearTimeout(requestTimeout);
      } catch (error) {}
    }
    let data = setTimeout(() => loadData({ page: 1, size: 10 }), 500);
    props.updateData({
      requestTimeout: data,
    });
  };
  return (
    <>
      <AdminPage
        header="Danh sách khu vực chấm công"
        subheader="Danh sách khu vực chấm công"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Danh sách khu vực chấm công"
          toolbar={
            <div className="toolbar">
              <Button className="button" onClick={() => onOpenModal()}>
                Thêm mới
              </Button>
            </div>
          }
          icon={[<i className="fal fa-server"></i>]}
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
                key: "col1",
                dataIndex: "col1",
                width: 100,
                align: "center",
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tên khu vực chấm công</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          value={tenSearch}
                          onChange={(e) => {
                            onSearch(e.target.value, "tenSearch");
                          }}
                          placeholder="Tìm kiếm theo khu vực chấm công"
                        />
                      </div>
                    </div>
                  </div>
                ),
                key: "col2",
                dataIndex: "col2",
                align: "center",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Ăn trưa</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col3",
                dataIndex: "col3",
                align: "center",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Ăn tối</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col4",
                dataIndex: "col4",
                align: "center",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tiện ích</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col5",
                dataIndex: "col5",
                align: "center",
                width: 120,
                fixed: "right",
                render: (item) => {
                  return (
                    <div className="col-action">
                      <Tooltip placement="topLeft" title={"Sửa"}>
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                          onClick={() => {
                            onOpenModal(item);
                          }}
                        >
                          <i className="fal fa-edit"></i>
                        </button>
                      </Tooltip>
                      <Tooltip placement="topLeft" title={"Xóa"}>
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                          onClick={() => {
                            onDelete(item);
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
            dataSource={data || []}
          ></Table>
          <div className="footer">
            <SelectSize value={props.size} selectItem={onSizeChange} />
            <Pagination
              onPageChange={onPageChange}
              page={props.page}
              size={props.size}
              total={props.total}
              style={{ flex: 1, justifyContent: "flex-end" }}
            ></Pagination>
          </div>
        </Panel>
      </AdminPage>
      {openModal && <Create />}
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    checkinArea: {
      listCheckinArea = [],
      tenSearch = "",
      page = 1,
      size = 10,
      total,
      openModal,
      requestTimeout,
    },
  } = state;
  return {
    listCheckinArea,
    tenSearch,
    page,
    size,
    total,
    openModal,
    requestTimeout,
  };
};
const mapDispatchToProps = ({
  checkinArea: { loadData, updateData, onSizeChange, onDelete, onReset },
}) => ({
  loadData,
  updateData,
  onSizeChange,
  onDelete,
  onReset,
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckinArea);
