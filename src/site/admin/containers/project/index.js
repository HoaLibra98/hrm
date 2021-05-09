import React, { useEffect } from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Table, SelectSize, Pagination } from "site/admin/components/common";
import { Button, Tooltip } from "antd";
import { connect } from "react-redux";
import Create from "./create";
function Project(props) {
  const {
    loadProject,
    listProject,
    updateData,
    openModal,
    ten,
    onReset,
    loadEmployee,
    requestTimeout,
  } = props;
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    updateData({
      page,
    });
    loadProject({ page });
  };
  useEffect(() => {
    onReset();
    loadProject({ page: 1, size: 10 });
  }, []);
  let data =
    listProject &&
    listProject.length &&
    listProject.map((item, index) => {
      return {
        key: index,
        col1: (props.page - 1) * props.size + index + 1,
        col2: item.ten,
        col3: item.khuVucChamCong || [],
        col4: (item.nhanVienPhuTrach || {}).ten,
        col5: item.active,
        col6: item.tongSoNhanVien,
        col7: item,
      };
    });
  const onOpenModal = (item) => {
    if (item && item.id) {
      updateData({
        openModal: true,
        ...item,
        khuVucChamCongIds: item.khuVucChamCongIds || [],
      });
    } else {
      updateData({
        openModal: true,
        active: true,
        khuVucChamCongIds: [],
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
    });
    if (requestTimeout) {
      try {
        clearTimeout(requestTimeout);
      } catch (error) {}
    }
    let data = setTimeout(() => loadProject({ page: 1, size: 10 }), 500);
    props.updateData({
      requestTimeout: data,
    });
  };
  return (
    <>
      <AdminPage
        header="Danh sách dự án"
        subheader="Danh sách dự án"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Danh sách dự án"
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
                    <div className="title-box">Tên dự án</div>
                    <div className="addition-box">
                      <div className="search-box">
                        <img
                          src={require("resources/images/icon/ic_search.png")}
                          alt=""
                        />
                        <input
                          value={ten}
                          onChange={(e) => {
                            onSearch(e.target.value, "ten");
                          }}
                          placeholder="Tìm theo tên dự án"
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
                    <div className="title-box">Khu vực chấm công</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col3",
                dataIndex: "col3",
                width: 200,
                render: (item) => {
                  return (
                    <>
                      {item
                        .reduce((res, current) => [...res, current.ten], [])
                        .join(", ")}
                    </>
                  );
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Người phụ trách</div>
                    <div className="addition-box">
                      {/* <FilterSelect
                        onChange={(e) => {
                          onSearch(e, "phutrachSearch");
                        }}
                        placeholder="Chọn người phụ trách"
                        value={phutrachSearch}
                        listData={listEmployee}
                        searchEmployee={true}
                      /> */}
                    </div>
                  </div>
                ),
                key: "col4",
                dataIndex: "col4",
                width: 150,
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Hiệu lực</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col5",
                dataIndex: "col5",
                align: "center",
                width: 90,
                render: (item) => {
                  return <>{item && <i className="fal fa-check"></i>}</>;
                },
              },
              {
                title: (
                  <div className="custome-header">
                    <div className="title-box">Tổng số nhân viên</div>
                    <div className="addition-box"></div>
                  </div>
                ),
                key: "col6",
                dataIndex: "col6",
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
                key: "col7",
                dataIndex: "col7",
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
    project: {
      listProject = [],
      ten = "",
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
    listProject,
    ten,
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
  project: { loadProject, updateData, onSizeChange, onDelete, onReset },
  employee: { loadEmployee },
}) => ({
  loadProject,
  updateData,
  onSizeChange,
  onDelete,
  onReset,
  loadEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(Project);
