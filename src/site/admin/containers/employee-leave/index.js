import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import { Tooltip, DatePicker } from "antd";
import DataContants from "config/data-contants";
import moment from "moment";
import { get, isArray } from "lodash";
function EmployeeLeave(props) {
  const {
    listDayOff,
    loadDayOff,
    page,
    size,
    updateData,
    loadEmployee,
    listEmployee,
    listDepartment,
    loadDepartment,
    trangThai,
    changeStatus,
    updateDataEmploy,
    updateDataDepart,
    auth,
    onReset,
    dmBoPhanId,
    nhanVienId,
    requestTimeout,
    ngayNghi,
    getTypeDayOff,
    listTypeDayOff
  } = props;
  useEffect(() => {
    onReset();
    getTypeDayOff();
    updateDataEmploy({
      size: 1000,
    });
    updateDataDepart({
      size: 1000,
    });
    loadDayOff({ page, size: 10, sort: "ngayNghi,asc" });
    loadEmployee(1);
    loadDepartment(1);
  }, []);

  const filterDayOff = (value) => {
    let data = {};
    (value || value == 0) && isArray(listTypeDayOff) &&
      listTypeDayOff.length > 0 &&
      listTypeDayOff.map(dayOff => {
        if (dayOff.value == value) {
          data = dayOff;
        }
      })

    return (data || {}).name || '';
  }

  let data = (listDayOff || []).map((item, index) => {
    return {
      key: index,
      col1: (page - 1) * size + index + 1,
      col2: (item.nhanVien || {}).ten,
      col3: (item.nhanVien.dmBoPhan || {}).ten,
      col4: item.ngayNghi && moment(item.ngayNghi).format("DD/MM/YYYY"),
      col5: item.soLuong,
      col6: item.lyDo,
      col7: item.trangThai,
      col8: item,
      col9: (get(item, "loaiNgayNghi") || get(item, "loaiNgayNghi") == 0) && filterDayOff(item.loaiNgayNghi),
    };
  });
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    updateData({
      page,
    });
    loadDayOff({ page: page });
  };
  const getStatus = (item) => {
    var data = DataContants.listLeave.filter((data) => {
      return parseInt(data.id) === Number(item);
    });
    if (data.length > 0) return data[0];
    return {};
  };
  const onChangeStatus = (item, status) => {
    const payload = {
      id: item.id,
      trangThaiOld: trangThai,
      param: {
        nguoiDuyetId: auth && auth.id,
        ngayNghi: item.ngayNghi,
        soLuong: item.soLuong,
        lyDo: item.lyDo,
        loaiNgayNghi: item.loaiNgayNghi,
        thoiGianNghi: item.thoiGianNghi,
        trangThai: status === "confirm" ? 1 : status === "refuse" ? 2 : 0,
      },
    };
    changeStatus(payload);
  };
  const onSearch = (e, item) => {
    updateData({
      [item]: e,
    });
    if (requestTimeout) {
      try {
        clearTimeout(requestTimeout);
      } catch (error) { }
    }
    let data = setTimeout(() => loadDayOff({ page: 1 }), 500);
    updateData({
      requestTimeout: data,
    });
  };
  let columns = [
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
          <div className="title-box">Họ và tên</div>
          <div className="addition-box">
            <FilterSelect
              onChange={(e) => {
                onSearch(e, "nhanVienId");
              }}
              placeholder="Chọn nhân viên"
              value={nhanVienId}
              listData={listEmployee}
              searchEmployee={true}
            />
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
          <div className="title-box">Bộ phận</div>
          <div className="addition-box">
            <FilterSelect
              onChange={(e) => {
                onSearch(e, "dmBoPhanId");
              }}
              placeholder="Chọn bộ phận"
              value={dmBoPhanId}
              listData={listDepartment}
            />
          </div>
        </div>
      ),
      key: "col3",
      dataIndex: "col3",
      width: 200,
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Ngày xin nghỉ</div>
          <div className="addition-box">
            <DatePicker
              value={ngayNghi && moment(ngayNghi)}
              onChange={(e) => {
                onSearch(e, "ngayNghi");
              }}
              format={"DD/MM/YYYY"}
              placeholder="Tìm theo thời gian làm việc"
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
          <div className="title-box">Tổng số ngày nghỉ</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col5",
      dataIndex: "col5",
      align: "center",
      width: 170,
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box"> Lý do</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col6",
      dataIndex: "col6",
      width: 200,
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Trạng thái</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col7",
      dataIndex: "col7",
      align: "center",
      width: 150,
      render: (item) => {
        return <>{item !== null && getStatus(item).ten}</>;
      },
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Loại ngày nghỉ</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col9",
      dataIndex: "col9",
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
      key: "col8",
      dataIndex: "col8",
      align: "center",
      width: 120,
      fixed: "right",
      render: (item) => {
        return (
          <div className="col-action" style={{ justifyContent: "center" }}>
            {item.trangThai !== 2 ? (
              <Tooltip placement="topLeft" title={"Từ chối"}>
                <button
                  className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                  onClick={() => {
                    onChangeStatus(item, "refuse");
                  }}
                >
                  <i className="fal fa-times"></i>
                </button>
              </Tooltip>
            ) : null}
            {item.trangThai !== 1 ? (
              <Tooltip placement="topLeft" title={"Xác nhận"}>
                <button
                  className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                  onClick={() => {
                    onChangeStatus(item, "confirm");
                  }}
                >
                  <i className="fal fa-check"></i>
                </button>
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <AdminPage
      header="Danh sách báo nghỉ"
      subheader="Danh sách báo nghỉ"
      icon="subheader-icon fal fa-window"
    >
      <Panel
        title="Danh sách báo nghỉ"
        toolbar={
          <div className="toolbar">
            <FilterSelect
              style={{ width: 145 }}
              onChange={(e) => {
                updateData({
                  trangThai: e,
                });
                loadDayOff({ page: 1, size: size, trangThai: e });
              }}
              placeholder="Chọn trạng thái"
              value={trangThai}
              listData={DataContants.listLeave}
            />
          </div>
        }
        icon={[<i className="fal fa-calendar-minus"></i>]}
      >
        <Table
          className="custom"
          scroll={{ x: 800, y: 500 }}
          style={{ marginLeft: -10, marginRight: -10 }}
          columns={columns}
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
  );
}
export default connect(
  (state) => {
    const {
      auth: { auth, checkRole },
      dayOff: {
        listDayOff = [],
        listTypeDayOff = [],
        page,
        size,
        trangThai,
        total,
        requestTimeout,
        ngayNghi,
        nhanVienId,
        dmBoPhanId,
      },
      employee: { listEmployee = [] },
      department: { listDepartment = [] },
    } = state;
    return {
      checkRole,
      auth,
      listDayOff,
      listTypeDayOff,
      page,
      size,
      listEmployee,
      listDepartment,
      trangThai,
      requestTimeout,
      total,
      ngayNghi,
      nhanVienId,
      dmBoPhanId,
    };
  },
  ({
    dayOff: { loadDayOff, updateData, onSizeChange, changeStatus, onReset, getTypeDayOff },
    employee,
    department,
  }) => {
    return {
      loadDayOff,
      updateData,
      onSizeChange,
      loadEmployee: employee.loadEmployee,
      updateDataEmploy: employee.updateData,
      loadDepartment: department.loadDepartment,
      updateDataDepart: department.updateData,
      changeStatus,
      onReset,
      getTypeDayOff
    };
  }
)(EmployeeLeave);
