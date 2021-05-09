import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import Table from "site/admin/components/common/Table";
import SelectSize from "site/admin/components/common/SelectSize";
import Pagination from "site/admin/components/common/Pagination";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
import { DatePicker, Button } from "antd";
import { get, isArray } from "lodash";
function Report(props) {
  const {
    exportDate,
    onExport,
    updateData,
    loadCheckin,
    isLoadData,
    size,
    getTypeTimekeeping,
    listTypeTimekeeping
  } = props;
  const [tuNgay, setTuNgay] = useState(moment());
  const [denNgay, setDenNgay] = useState(moment());
  const [ngayCong, setNgayCong] = useState({
    tuNgay: moment(),
    denNgay: moment(),
  });


  useEffect(() => {
    getTypeTimekeeping();
  }, [])

  useEffect(() => {
  }, [listTypeTimekeeping])

  useEffect(() => {
    if (new Date(tuNgay) > new Date(denNgay)) {
      setTuNgay(ngayCong.tuNgay);
      setDenNgay(ngayCong.denNgay);
      snackbar.show("Vui lòng chọn Từ ngày <= Đến ngày!", "danger");
    }
    else {
      updateData({
        onExport: false,
        isLoadData: true,
      });
      loadCheckin({
        page: 1,
        size: size,
        thoiGianBatDauSearch: tuNgay && tuNgay.format("DD-MM-YYYY"),
        thoiGianKetThucSearch: denNgay && denNgay.format("DD-MM-YYYY"),
      }).then((s) => {
        updateData({
          isLoadData: false,
        });
      });
    }

  }, [tuNgay, denNgay]);


  const filterTimekeep = (value) => {
    let data = {};
    value && isArray(listTypeTimekeeping) &&
      listTypeTimekeeping.length > 0 &&
      listTypeTimekeeping.map(timekepp => {
        if (timekepp.value == value) {
          data = timekepp;
        }
      })

    return (data || {}).name || '';
  }
  const onSizeChange = (size) => {
    updateData({
      size, page: 1,
    });
    loadCheckin({
      page: 1,
      size,
      thoiGianBatDauSearch: tuNgay && tuNgay.format("DD-MM-YYYY"),
      thoiGianKetThucSearch: denNgay && denNgay.format("DD-MM-YYYY"),
    });
  };
  const onPageChange = (page) => {
    updateData({
      page,
    });
    loadCheckin({
      page,
      size: props.size,
      thoiGianBatDauSearch: tuNgay && tuNgay.format("DD-MM-YYYY"),
      thoiGianKetThucSearch: denNgay && denNgay.format("DD-MM-YYYY"),
    });
  };
  const handleExportDate = () => {
    if (!!tuNgay && !!denNgay) {
      if (new Date(tuNgay) > new Date(denNgay))
        return snackbar.show("Vui lòng chọn Từ ngày <= Đến ngày!", "danger");

      const param = {
        tuNgay: tuNgay,
        denNgay: denNgay
      }
      updateData({
        onExport: true,
      });

      exportDate(param).then((s) => {
        if (s) {
          updateData({
            onExport: false,
          });
        }
      });
    } else {
      snackbar.show("Vui lòng chọn ngày xuất báo cáo chấm công", "danger");
      return;
    }
  };
  const disabledDate = (value) => {
    return value > moment()
  };


  let data = (props.listCheckin || []).map((item, index) => {
    // col7: (item.khuVucChamCong || {}).anTrua,
    // col8: (item.khuVucChamCong || {}).anDem,
    // col8: item.nhanVienId,
    // let loaiCheckIn = get(item, 'loaiCheckIn') &&;

    return {
      key: index,
      col1: (props.page - 1) * props.size + index + 1,
      col2: item.nhanVien?.ten,
      col3: item.nhanVien?.dmBoPhan?.ten,
      col4: item.nhanVien?.soDienThoai,
      col5: (item.khuVucChamCong || {}).ten,
      col6:
        item.thoiGianBatDau && new Date(item.thoiGianBatDau).format("HH:mm - dd/MM/YYYY"),
      col7:
        get(item, 'thoiGianKetThuc') && new Date(item.thoiGianKetThuc).format("HH:mm - dd/MM/YYYY"),
      col8:
        (get(item, 'loaiCheckIn') || get(item, 'loaiCheckIn') == 0) && filterTimekeep(get(item, 'loaiCheckIn')),
      col9:
        (get(item, 'loaiCheckOut') || get(item, 'loaiCheckOut') == 0) && filterTimekeep(get(item, 'loaiCheckOut')),
      col10:
        (item.thietBiCheckIn || {}).deviceId || '',
      col11:
        (item.thietBiCheckOut || {}).deviceId || '',
      col12:
        (item.nguoiCheckIn || {}).ten || '',
      col13:
        (item.nguoiCheckOut || {}).ten || '',
    };
  });
  return (
    <AdminPage
      header="Danh sách chấm công"
      subheader="Danh sách chấm công"
      icon="subheader-icon fal fa-window"
    >
      <Panel
        title="Danh sách chấm công"
        toolbar={
          <div className="toolbar">
            <div style={{ marginRight: 10 }}>
              <label className="lable_bccc">Từ ngày:</label>
              <DatePicker
                placeholder="Chọn ngày báo cáo chấm công"
                value={tuNgay}
                format={"DD/MM/YYYY"}
                onChange={(e) => {
                  setTuNgay(e);
                  updateData({
                    exportDate: true,
                  });
                }}
                style={{ maxWidth: 140 }}
                disabledDate={disabledDate}
              />
            </div>
            <div>
              <label className="lable_bccc">Đến ngày:</label>
              <DatePicker
                placeholder="Chọn ngày báo cáo chấm công"
                value={denNgay}
                format={"DD/MM/YYYY"}
                onChange={(e) => {
                  setDenNgay(e);
                  updateData({
                    exportDate: true,
                  });
                }}
                style={{ maxWidth: 140 }}
                disabledDate={disabledDate}
              />
            </div>
            <Button
              style={{ marginLeft: 10 }}
              type="primary"
              className="button"
              onClick={() => {
                handleExportDate();
              }}
              loading={onExport}
            >
              Export
            </Button>
          </div>
        }
        icon={[<i className="fal fa-user-check"></i>]}
        allowClose={false}
      >
        <Table
          loading={isLoadData}
          className="custom"
          scroll={{ x: 800, y: 500 }}
          style={{ marginLeft: -10, marginRight: -10 }}
          columns={[
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">STT</div>
                </div>
              ),
              key: "col1",
              dataIndex: "col1",
              width: 70,
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Họ và tên</div>
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
                </div>
              ),
              key: "col3",
              dataIndex: "col3",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box"> Điện thoại </div>
                </div>
              ),
              key: "col4",
              dataIndex: "col4",
              align: "center",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Khu vực chấm công</div>
                </div>
              ),
              key: "col5",
              dataIndex: "col5",
              width: 170,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Thời gian đến</div>
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
                  <div className="title-box">Thời gian về</div>
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
                  <div className="title-box">Loại Check In</div>
                </div>
              ),
              key: "col8",
              dataIndex: "col8",
              align: "center",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Loại Check Out</div>
                </div>
              ),
              key: "col9",
              dataIndex: "col9",
              align: "center",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Thiết bị Check In</div>
                </div>
              ),
              key: "col10",
              dataIndex: "col10",
              align: "center",
              width: 250,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Thiết bị Check Out</div>
                </div>
              ),
              key: "col11",
              dataIndex: "col11",
              align: "center",
              width: 250,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Người Check in</div>
                </div>
              ),
              key: "col12",
              dataIndex: "col12",
              align: "center",
              width: 200,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Người Check out</div>
                </div>
              ),
              key: "col13",
              dataIndex: "col13",
              align: "center",
              width: 200,
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
  );
}
export default connect(
  (state) => {
    return {
      onExport: state.checkin.onExport,
      listCheckin: state.checkin.listCheckin,
      page: state.checkin.page || 1,
      size: state.checkin.size || 10,
      total: state.checkin.total,
      isLoadData: state.checkin.isLoadData,
      listEmployee: state.employee.listEmployee,
      listTypeTimekeeping: state.role.listTypeTimekeeping || []
    };
  },
  ({
    checkin: {
      exportDate,
      updateData,
      loadCheckin
    },
    role
  }) => ({
    exportDate,
    updateData,
    loadCheckin,
    getTypeTimekeeping: role.getTypeTimekeeping

  })
)(Report);
