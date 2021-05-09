import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, DatePicker, message, Button, Radio, TimePicker } from "antd";
import moment from "moment";
import { AdminPage, Panel } from "site/admin/components/admin";
import FilterSelect from "site/admin/components/common/filterSelect";
import snackbar from "utils/snackbar-utils";
function CheckIn(props) {
  const {
    loadEmployee,
    listEmployee,
    thoiGianBatDau,
    create,
    updateData,
    thoiGian,
    nhanVienId,
    checkValidate,
    updateDataEmployee,
    onReset,
    loadCheckinArea,
    listCheckinArea,
    khuVucChamCongId,
    getDateNetwork,
    datetime,
    thoiGianKetThuc
  } = props;

  useEffect(() => {
    getDateNetwork();
    updateDataEmployee({
      size: 1000,
    });
    loadEmployee(1);
    loadCheckinArea({ page: 1, size: 1000 });
  }, []);

  useEffect(() => {
    datetime && onReset(datetime);
  }, [datetime])



  const handleSubmit = () => {
    if (!nhanVienId || !thoiGian || !khuVucChamCongId || !thoiGianBatDau) {
      updateData({
        checkValidate: true,
      });
      return;
    } else {
      let checkTime = moment(thoiGianBatDau).format("THH:mm:ss+07:00") > moment(thoiGianKetThuc).format("THH:mm:ss+07:00");

      const param = {
        khuVucChamCongId,
        nhanVienId,
        thoiGianBatDau: moment(thoiGian).format("YYYY-MM-DD") + moment(thoiGianBatDau).format("THH:mm:ss+07:00"),
        thoiGianKetThuc: moment(thoiGian).format("YYYY-MM-DD") + moment(thoiGianKetThuc).format("THH:mm:ss+07:00")
      };
      !checkTime ?
        create(param) :
        snackbar.show(
          "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc",
          "danger"
        );
    }
  };
  return (
    <div>
      <AdminPage
        header="Chấm công tay"
        subheader="Chấm công tay"
        icon="subheader-icon fal fa-window"
      >
        <Panel
          title="Chấm công tay"
          icon={[<i className="fal fa-calendar-check"></i>]}
        >
          <Form layout="vertical">
            <div className="row">
              <div className="col-lg-3">
                <Form.Item label="Chọn nhân viên (*)">
                  <FilterSelect
                    onChange={(e) => {
                      updateData({
                        nhanVienId: e,
                      });
                    }}
                    placeholder="Chọn nhân viên"
                    value={nhanVienId}
                    listData={listEmployee}
                    checkValidate={checkValidate && !nhanVienId}
                    valueError={"Vui lòng chọn nhân viên"}
                    searchEmployee={true}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-3">
                <Form.Item label="Chọn khu vực chấm công (*)">
                  <FilterSelect
                    onChange={(e) => {
                      updateData({
                        khuVucChamCongId: e,
                      });
                    }}
                    placeholder="Chọn khu vực chấm công"
                    value={khuVucChamCongId}
                    listData={listCheckinArea}
                    checkValidate={checkValidate && !khuVucChamCongId}
                    valueError={"Vui lòng chọn khu vực chấm công"}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-2">
                <Form.Item label="Ngày chấm công (*)">
                  <DatePicker
                    defaultValue={thoiGian}
                    style={{ width: "100%" }}
                    placeholder="Ngày chấm công"
                    onChange={(e) => {
                      updateData({
                        thoiGian: e,
                      });
                    }}
                    disabledDate={(e) => {
                      return e > moment(datetime)
                    }}
                    value={thoiGian}
                    format={"DD/MM/YYYY"}
                  />
                  {checkValidate && !thoiGian ? (
                    <div className="error">Vui lòng chọn ngày chấm công</div>
                  ) : null}
                </Form.Item>
              </div>
              <div className="col-lg-2">
                <Form.Item label="Thời gian bắt đầu (*)">
                  <TimePicker
                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                    style={{ width: "100%" }}
                    placeholder="Thời gian bắt đầu"
                    onChange={(e) => {
                      updateData({
                        thoiGianBatDau: e,
                      });
                    }}
                    value={thoiGianBatDau}
                    format={'HH:mm:ss'}
                  />
                  {checkValidate && !thoiGianBatDau ? (
                    <div className="error">Vui lòng chọn thời gian bắt đầu</div>
                  ) : null}
                </Form.Item>
              </div>
              <div className="col-lg-2">
                <Form.Item label="Thời gian kết thúc (*)">
                  <TimePicker
                    defaultOpenValue={moment(thoiGianKetThuc)}
                    style={{ width: "100%" }}
                    placeholder="Thời gian kết thúc (*)"
                    onChange={(e) => {
                      updateData({
                        thoiGianKetThuc: e,
                      });
                    }}
                    value={thoiGianKetThuc}
                    format={'HH:mm:ss'}
                  />
                  {checkValidate && !thoiGianKetThuc ? (
                    <div className="error">Vui lòng chọn thời gian kết thúc</div>
                  ) : null}
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="button-footer-panel">
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Chấm công
            </Button>
          </div>
        </Panel>
      </AdminPage>
    </div>
  );
}
export default connect(
  (state) => {
    const {
      employee: { listEmployee = [] },
      checkin: {
        thoiGianKetThuc,
        thoiGianBatDau,
        thoiGian,
        nhanVienId,
        checkValidate = false,
        khuVucChamCongId,
      },
      checkinArea: { listCheckinArea = [] },
      dateTimeOnl: {
        datetime
      },

    } = state;

    return {
      listCheckinArea,
      listEmployee,
      thoiGianKetThuc,
      thoiGian: thoiGian && moment(thoiGian),
      nhanVienId,
      checkValidate,
      khuVucChamCongId,
      datetime,
      thoiGianBatDau
    };
  },
  ({
    employee,
    checkin: {
      create,
      updateData,
      onReset
    },
    checkinArea,
    dateTimeOnl
  }) => {
    return {
      loadEmployee: employee.loadEmployee,
      updateDataEmployee: employee.updateData,
      create,
      updateData,
      onReset,
      loadCheckinArea: checkinArea.loadData,
      getDateNetwork: dateTimeOnl.getDateNetwork,
    };
  }
)(CheckIn);
