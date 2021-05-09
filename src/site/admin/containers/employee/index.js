import React, { useEffect, useRef } from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import { Button, Tooltip, DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import ModalAssignProject from "./AssignProject";
function Employee(props) {
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    props.updateData({
      page,
    });
    props.loadEmployee(page);
  };
  useEffect(() => {
    props.onReset();
    props.loadEmployee(1);
    props.loadSpecialize();
    props.loadDepartment();
  }, []);
  let listData = props.data.map((item, index) => {
    return {
      key: index,
      col1: (props.page - 1) * props.size + index + 1,
      col2: item.anhDaiDien,
      col3: item.ten,
      col4: item.email,
      col5:
        item.thoiGianBatDauLamViec &&
        moment(item.thoiGianBatDauLamViec).format("DD/MM/YYYY"),
      col6: (item.dmChuyenMon || {}).ten,
      col7: item.mucLuong || 0,
      col8: item.dmBoPhan && item.dmBoPhan.ten,
      col9: item.soNgayPhep || 0,
      col10: item.cv,
      col11: item,
    };
  });
  const editItem = (item) => {
    props.history.push({
      pathname: `/nhan-vien/chinh-sua/${item.id}`,
      state: {
        listDepartment: props.listDepartment,
        listSpecialize: props.listSpecialize,
      },
    });
  };
  const addItem = () => {
    props.history.push({
      pathname: `/nhan-vien/them-moi`,
      state: {
        listDepartment: props.listDepartment,
        listSpecialize: props.listSpecialize,
      },
    });
  };
  const viewDetail = (item) => {
    props.history.push({
      pathname: `/nhan-vien/chi-tiet/${item.id}`,
      // state: {
      //   c: item.dmBoPhan && item.dmBoPhan.ten,
      //   ChuyenMon:
      //     getSecialize(item.dmChuyenMonId) &&
      //     getSecialize(item.dmChuyenMonId).ten,
      // },
    });
  };
  const viewAssignProject = (item) => {
    props.updateData({
      modalAssignProject: true,
    });
  };
  // const getSecialize = (item) => {
  //   var data = props.listSpecialize.filter((data) => {
  //     return parseInt(data.id) === Number(item);
  //   });
  //   if (data.length > 0) return data[0];
  //   return {};
  // };
  // const onDelete = (item) => {
  //   props.onDelete(item);
  // };
  const onResetPassword = (item) => {
    props.onResetPassword(item);
  };
  const onSearch = (e, item) => {
    props.updateData({
      [item]: e,
      page: 1,
      size: 10,
    });
    if (props.requestTimeout) {
      try {
        clearTimeout(props.requestTimeout);
      } catch (error) {}
    }
    let data = setTimeout(() => props.loadEmployee(1), 500);
    props.updateData({
      requestTimeout: data,
    });
  };
  return (
    <AdminPage
      icon="subheader-icon fal fa-window"
      header="Danh sách nhân sự"
      subheader="Danh sách nhân sự"
    >
      <Panel
        id="panel-list-site"
        title="Danh sách nhân sự"
        icon={[<i className="fal fa-users"></i>]}
        toolbar={
          <div className="toolbar">
            <Button className="button" onClick={() => viewAssignProject()}>
              Phân công dự án
            </Button>
            <Button className="button" onClick={() => addItem()}>
              Thêm mới
            </Button>
          </div>
        }
      >
        <Table
          scroll={{ x: 800, y: 500 }}
          style={{ marginLeft: -10, marginRight: -10 }}
          className="custom"
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
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Ảnh đại diện</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 150,
              dataIndex: "col2",
              key: "col2",
              align: "center",
              render: (item) => {
                return item ? (
                  <img
                    src={item.absoluteFileUrl()}
                    alt=" "
                    style={{ maxWidth: 85 }}
                  />
                ) : (
                  <img
                    src={require("resources/images/nhanvien/anhdaidien.png")}
                    alt=" "
                  />
                );
              },
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Họ và tên</div>
                  <div className="addition-box">
                    <div className="search-box">
                      <img src={require("resources/images/icon/ic_search.png")} alt="" />
                      <input
                        value={props.hoVaTenSearch}
                        onChange={(e) => {
                          onSearch(e.target.value, "hoVaTenSearch");
                        }}
                        placeholder="Tìm theo họ và tên"
                      />
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
                  <div className="title-box">Email</div>
                  <div className="addition-box">
                    <div className="search-box">
                      <img src={require("resources/images/icon/ic_search.png")} alt="" />
                      <input
                        value={props.emailSearch}
                        onChange={(e) => {
                          onSearch(e.target.value, "emailSearch");
                        }}
                        placeholder="Tìm theo email"
                      />
                    </div>
                  </div>
                </div>
              ),
              width: 200,
              dataIndex: "col4",
              key: "col4",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">T/G Làm Việc</div>
                  <div className="addition-box">
                    <DatePicker
                      value={props.tgLamViecSearch}
                      onChange={(e) => {
                        onSearch(e, "tgLamViecSearch");
                      }}
                      format={"DD/MM/YYYY"}
                      placeholder="Tìm theo thời gian làm việc"
                    />
                  </div>
                </div>
              ),
              width: 200,
              dataIndex: "col5",
              key: "col5",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Chuyên Môn</div>
                  <div className="addition-box">
                    <FilterSelect
                      onChange={(e) => {
                        onSearch(e, "chuyenMonSearch");
                      }}
                      placeholder="Chọn chuyên môn"
                      value={props.chuyenMonSearch}
                      listData={props.listSpecialize}
                    />
                  </div>
                </div>
              ),
              width: 150,
              dataIndex: "col6",
              key: "col6",
              // render: (item) => {
              //   return <>{getSecialize(item) && getSecialize(item).ten}</>;
              // },
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Mức lương</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 150,
              dataIndex: "col7",
              key: "col7",
              align: "center",
              render: (item) => {
                return <>{item && item.formatPrice()}</>;
              },
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Bộ phận</div>
                  <div className="addition-box">
                    <FilterSelect
                      onChange={(e) => {
                        onSearch(e, "boPhanSearch");
                      }}
                      placeholder="Chọn bộ phận"
                      value={props.boPhanSearch}
                      listData={props.listDepartment}
                    />
                  </div>
                </div>
              ),
              width: 170,
              dataIndex: "col8",
              key: "col8",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Ngày phép</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 150,
              dataIndex: "col9",
              key: "col9",
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">CV</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 200,
              dataIndex: "col10",
              key: "col10",
              render: (item) => {
                let exts = (item && item.split(".")) || [];
                let urlCV = exts.length && exts[exts.length - 1].toLowerCase();
                return item && (urlCV === "doc" || urlCV === "docx") ? (
                  <a
                    className="link-file"
                    href={item.absoluteFileUrl()}
                    download
                  >
                    {item}
                  </a>
                ) : item && urlCV === "pdf" ? (
                  <a
                    className="link-file"
                    target="_blank"
                    href={item.absoluteFileUrl()}
                    rel="noopener noreferrer"
                  >
                    {item}
                  </a>
                ) : null;
              },
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tiện ích</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 170,
              dataIndex: "col11",
              key: "col11",
              align: "center",
              fixed: "right",
              render: (item) => {
                return (
                  <div className="col-action">
                    <Tooltip placement="topLeft" title={"Xem chi tiết"}>
                      <div>
                        <button
                          onClick={() => viewDetail(item)}
                          className="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i className="fal fa-eye"></i>
                        </button>
                      </div>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Sửa"}>
                      <div>
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                          onClick={() => editItem(item)}
                        >
                          <i className="fal fa-edit"></i>
                        </button>
                      </div>
                    </Tooltip>
                    {/* <Tooltip placement="topLeft" title={"Xóa"}>
                      <div>
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                          onClick={() => {
                            onDelete(item);
                          }}
                        >
                          <i className="fal fa-trash-alt"></i>
                        </button>
                      </div>
                    </Tooltip> */}
                    <Tooltip placement="topLeft" title={"Reset mật khẩu"}>
                      <div>
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                          onClick={() => onResetPassword(item)}
                        >
                          <i className="fal fa-sync"></i>
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                );
              },
            },
          ]}
          dataSource={listData}
        ></Table>
        <div className="footer">
          <SelectSize value={props.size} selectItem={onSizeChange} />
          <Pagination
            onPageChange={onPageChange}
            page={props.page}
            size={props.size}
            total={props.total}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </div>
      </Panel>
      {props.modalAssignProject && <ModalAssignProject />}
    </AdminPage>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
      data: state.employee.listEmployee || [],
      page: state.employee.page || 1,
      size: state.employee.size || 10,
      total: state.employee.total || 0,
      hoVaTenSearch: state.employee.hoVaTenSearch,
      tgLamViecSearch:
        state.employee.tgLamViecSearch &&
        moment(state.employee.tgLamViecSearch),
      chuyenMonSearch: state.employee.chuyenMonSearch || null,
      boPhanSearch: state.employee.boPhanSearch || null,
      listSpecialize: state.specialize.listSpecialize,
      listDepartment: state.department.listDepartment,
      requestTimeout: state.employee.requestTimeout,
      modalAssignProject: state.employee.modalAssignProject,
    };
  },
  ({
    employee: {
      loadEmployee,
      updateData,
      onSizeChange,
      onDelete,
      onResetPassword,
      onReset,
    },
    specialize: { loadSpecialize },
    department: { loadDepartment },
  }) => {
    return {
      loadEmployee,
      updateData,
      onSizeChange,
      onDelete,
      loadSpecialize,
      loadDepartment,
      onResetPassword,
      onReset,
    };
  }
)(Employee);
