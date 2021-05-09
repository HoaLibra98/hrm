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
import { get } from "lodash";
function ListOT(props) {
  const {
    listOT,
    loadOT,
    page,
    size,
    updateData,
    loadEmployee,
    listEmployee,
    trangThai,
    updateDataEmploy,
    changeStatus,
    onReset,
    nhanVienId,
    ngaySearch,
    requestTimeout,
    listWorkOT,
    loadWorkOT
  } = props;
  useEffect(() => {
    onReset();
    updateDataEmploy({
      size: 1000,
    });
    loadOT({ page, size: 10 });
    loadEmployee(1);
    loadWorkOT({ page: 0, size: 10000 });
  }, []);

  const getTypeOT = (id) => {
    let value = '';
    value = listWorkOT.find(item => item.id === id)
    return (value || {}).ten;
  }
  let data = (listOT || []).map((item, index) => {
    return {
      key: index,
      col1: (page - 1) * size + index + 1,
      col2: item.nhanVienId,
      col4:
        (
          get(item, 'createdAt')
            ? moment(item.createdAt).format("DD/MM/YYYY")
            : null
        ),
      col5:
        (
          (get(item, 'dmLamNgoaiGioId') || get(item, 'dmLamNgoaiGioId') == 0) && getTypeOT(item.dmLamNgoaiGioId)
        ),
      // col6:
      //   item.thoiGianKetThuc && moment(item.thoiGianKetThuc).format("HH:mm"),
      col7: item.lyDo,
      col8: item.ghiChu,
      col9: item.trangThai,
      col10: item,
    };
  });
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };
  const onPageChange = (page) => {
    updateData({
      page,
    });
    loadOT({ page: page });
  };
  const getEmployee = (item) => {
    var data = listEmployee.filter((data) => {
      return parseInt(data.id) === Number(item);
    });
    if (data.length > 0) return data[0];
    return {};
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
        nhanVienId: item.nhanVienId,
        thoiGianBatDau: item.thoiGianBatDau,
        thoiGianKetThuc: item.thoiGianKetThuc,
        lyDo: item.lyDo,
        ghiChu: item.ghiChu,
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
    let data = setTimeout(() => loadOT({ page: 1 }), 500);
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
      render: (item) => {
        return <>{item && getEmployee(item).ten}</>;
      },
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Ngày OT</div>
          <div className="addition-box">
            {/* <DatePicker
              value={ngaySearch && moment(ngaySearch)}
              onChange={(e) => {
                onSearch(e, "ngaySearch");
              }}
              format={"DD/MM/YYYY"}
              placeholder="Tìm theo thời gian OT"
            /> */}
          </div>
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
          <div className="title-box">Loại OT</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col5",
      dataIndex: "col5",
      align: "center",
      width: 200,
    },
    // {
    //   title: (
    //     <div className="custome-header">
    //       <div className="title-box"> Thời gian kết thúc </div>
    //       <div className="addition-box"></div>
    //     </div>
    //   ),
    //   key: "col6",
    //   dataIndex: "col6",
    //   align: "center",
    //   width: 200,
    // },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Lý do</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col7",
      dataIndex: "col7",
      align: "center",
      width: 200,
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Ghi chú</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col8",
      dataIndex: "col8",
      align: "center",
      width: 200,
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Trạng thái</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col9",
      dataIndex: "col9",
      align: "center",
      width: 200,
      render: (item) => {
        return <>{item !== null && getStatus(item).ten}</>;
      },
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Tiện ích</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "col10",
      dataIndex: "col10",
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
      header="Danh sách OT"
      subheader="Danh sách OT"
      icon="subheader-icon fal fa-window"
    >
      <Panel
        title="Danh sách OT"
        toolbar={
          <div className="toolbar">
            <FilterSelect
              style={{ width: 145 }}
              onChange={(e) => {
                updateData({
                  trangThai: e,
                });
                loadOT({ page: 1, size: size, trangThai: e });
              }}
              placeholder="Chọn trạng thái"
              value={trangThai}
              listData={DataContants.listLeave}
            />
          </div>
        }
        icon={[<i className="fal fa-calendar-plus"></i>]}
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
      ot: {
        listOT = [],
        page,
        size,
        trangThai,
        total,
        ngaySearch,
        nhanVienId,
        requestTimeout,
      },
      workOT: {
        listWorkOT = [],
      },
      employee: { listEmployee = [] },
    } = state;
    return {
      listOT,
      page,
      size,
      listEmployee,
      trangThai,
      total,
      ngaySearch,
      nhanVienId,
      requestTimeout,
      listWorkOT
    };
  },
  ({
    ot: { loadOT, updateData, onSizeChange, changeStatus, onReset },
    employee,
    workOT: {
      loadWorkOT,
    },
  }) => {
    return {
      onReset,
      loadOT,
      updateData,
      updateDataEmploy: employee.updateData,
      onSizeChange,
      loadEmployee: employee.loadEmployee,
      changeStatus,
      loadWorkOT
    };
  }
)(ListOT);
