import React, { useEffect } from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import Create from "./create";
function Department(props) {
  const {
    loadDepartment,
    listDepartment,
    updateData,
    openModal,
    tenPhongBan,
    onReset,
    loadEmployee,
    phutrachSearch,
    listEmployee,
    requestTimeout,
  } = props;
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    updateData({
      page,
    });
    loadDepartment(page);
  };
  useEffect(() => {
    onReset();
    loadDepartment(1);
    loadEmployee(1);
  }, []);
  let data =
    listDepartment &&
    listDepartment.length &&
    listDepartment.map((item, index) => {
      return {
        key: index,
        col1: (props.page - 1) * props.size + index + 1,
        col2: item.ten,
        col3: item.moTa,
        col4: item.nhanVienPhuTrach && item.nhanVienPhuTrach.ten,
        col5: item.tongSoNhanVien,
        col6: item,
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
      });
    }
  };
  const onDelete = (item) => {
    props.onDelete(item);
  };
  const onSearch = (e, item) => {
    updateData({
      [item]: e,
      page: 1,
      size: 10
    });
    if (requestTimeout) {
      try {
        clearTimeout(requestTimeout);
      } catch (error) {}
    }
    let data = setTimeout(() => loadDepartment(1), 500);
    props.updateData({
      requestTimeout: data,
    });
  };
  return (
    <>
      <AdminPage
        header="Danh sách bộ phận"
        subheader="Danh sách bộ phận"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Danh sách bộ phận"
          toolbar={
            <div className="toolbar">
              <Button className="button" onClick={() => onOpenModal()}>
                Thêm mới
              </Button>
            </div>
          }
          icon={[<i className="fal fa-building"></i>]}
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
                    <div className="title-box">Tên bộ phận</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          value={tenPhongBan}
                          onChange={(e) => {
                            onSearch(e.target.value, "tenPhongBan");
                          }}
                          placeholder="Tìm theo tên bộ phận"
                        />
                      </div>
                    </div>
                  </div>
                ),
                key: "col2",
                dataIndex: "col2",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Mô tả</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col3",
                dataIndex: "col3",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Người phụ trách</div>
                    <div className="addition-box">
                      <FilterSelect
                        onChange={(e) => {
                          onSearch(e, "phutrachSearch");
                        }}
                        placeholder="Chọn người phụ trách"
                        value={phutrachSearch}
                        listData={listEmployee}
                        searchEmployee={true}
                      />
                    </div>
                  </div>
                ),
                key: "col4",
                dataIndex: "col4",
                width: 200,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tổng số nhân viên</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col5",
                dataIndex: "col5",
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
                key: "col6",
                dataIndex: "col6",
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
    department: {
      listDepartment = [],
      tenPhongBan = "",
      page = 1,
      size = 10,
      total,
      openModal,
      phutrachSearch,
      requestTimeout,
    },
    employee: { listEmployee = [] },
  } = state;
  return {
    listDepartment,
    tenPhongBan,
    listEmployee,
    page,
    size,
    total,
    openModal,
    phutrachSearch,
    requestTimeout,
  };
};
const mapDispatchToProps = ({
  department: { loadDepartment, updateData, onSizeChange, onDelete, onReset },
  employee: { loadEmployee },
}) => ({
  loadDepartment,
  updateData,
  onSizeChange,
  onDelete,
  onReset,
  loadEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(Department);
