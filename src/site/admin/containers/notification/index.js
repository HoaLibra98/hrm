import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Input, Form } from "antd";
import FilterSelect from "site/admin/components/common/filterSelect";
import { AdminPage, Panel } from "site/admin/components/admin";
import DataContants from "config/data-contants";
function Notification(props) {
  const {
    loadEmployee,
    updateEmployee,
    listEmployee,
    loadDepartment,
    listDepartment,
    updateData,
    updateDataDepartment,
    createOrEdit,
    onReset,
    tieuDe,
    noiDung,
    checkValidate,
    auth,
    denNhanVienId,
    loai,
    choiceDepart,
    dmBoPhanId,
  } = props;
  useEffect(() => {
    onReset();
    updateEmployee({
      boPhanSearch: undefined,
    });
    updateDataDepartment({
      size: 1000,
    });
    loadDepartment(1)
  }, []);
  useEffect(() => {
    if (choiceDepart) {
      updateEmployee({
        size: 1000,
        boPhanSearch: dmBoPhanId,
      });
      loadEmployee(1)
    }
  }, [dmBoPhanId, choiceDepart]);
  const sentNotifi = () => {
    if (tieuDe && noiDung && dmBoPhanId && denNhanVienId && loai) {
      const param = {
        denNhanVienId,
        dmBoPhanId,
        loai,
        noiDung,
        tieuDe,
        tuNhanVienId: auth && auth.id,
      };
      createOrEdit({ param, id: null });
      updateData({
        checkValidate: false,
      });
    } else
      updateData({
        checkValidate: true,
      });
    return;
  };
  let filterEmployee = listEmployee.filter(
    (item) => item.id !== (auth && auth.id)
  );
  return (
    <AdminPage
      header="Thông báo"
      subheader="Thông báo"
      icon="subheader-icon fal fa-window"
    >
      <Panel
        title="Thông báo"
        allowClose={false}
        allowFullScreen={false}
        icon={[<i className="fal fa-bell"></i>]}
      >
        <Form layout="vertical" hideRequiredMark>
          <div className="row">
            <div className="col-12">
              <Form.Item label="Loại thông báo (*)">
                <FilterSelect
                  onChange={(e) => {
                    updateData({
                      loai: e,
                    });
                  }}
                  placeholder="Chọn loại thông báo"
                  value={loai}
                  listData={DataContants.listNotification}
                  checkValidate={checkValidate && !loai}
                  valueError={"Vui lòng chọn loại thông báo"}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Bộ phận (*)">
                <FilterSelect
                  onChange={(e) => {
                    updateData({ dmBoPhanId: e, choiceDepart: true });
                  }}
                  placeholder="Chọn bộ phận"
                  value={dmBoPhanId}
                  listData={listDepartment}
                  checkValidate={checkValidate && !dmBoPhanId}
                  valueError={"Vui lòng chọn bộ phận"}
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item label="Đến nhân viên (*)">
                <FilterSelect
                  onChange={(e) => {
                    updateData({
                      denNhanVienId: e,
                    });
                  }}
                  placeholder="Chọn nhân viên"
                  value={denNhanVienId}
                  listData={filterEmployee}
                  checkValidate={checkValidate && !denNhanVienId}
                  valueError={"Vui lòng chọn nhân viên"}
                  disabled={dmBoPhanId ? false : true}
                  searchEmployee={true}
                />
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item label="Tiêu đề thông báo  (*)">
                <Input.TextArea
                  placeholder="Tiêu đề thông báo"
                  value={tieuDe}
                  onChange={(e) => {
                    updateData({
                      tieuDe: e.target.value,
                    });
                  }}
                />
                {checkValidate && !tieuDe ? (
                  <div className="error">Vui lòng nhập tiêu đề thông báo</div>
                ) : null}
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item label="Nội dung thông báo (*)">
                <Input.TextArea
                  placeholder="Nội dung thông báo"
                  style={{ minHeight: 120 }}
                  value={noiDung}
                  onChange={(e) => {
                    updateData({
                      noiDung: e.target.value,
                    });
                  }}
                />
                {checkValidate && !noiDung ? (
                  <div className="error">Vui lòng nhập nội dung thông báo</div>
                ) : null}
              </Form.Item>
            </div>
          </div>
          <div
            className="button-footer-panel"
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => sentNotifi()}
            >
              Gửi thông báo
            </Button>
          </div>
        </Form>
      </Panel>
    </AdminPage>
  );
}
export default connect(
  (state) => {
    const {
      auth: { auth = {} },
      employee: { listEmployee },
      department: { listDepartment },
      notification: {
        choiceDepart,
        checkValidate = false,
        tieuDe,
        noiDung,
        denNhanVienId,
        loai,
        dmBoPhanId,
      },
    } = state;
    return {
      listDepartment,
      checkValidate,
      tieuDe,
      noiDung,
      auth,
      listEmployee: listEmployee.filter((item) => item.id !== auth && auth.id),
      denNhanVienId,
      loai,
      choiceDepart,
      dmBoPhanId,
    };
  },
  ({
    department,
    notification: { createOrEdit, updateData, onReset },
    employee,
  }) => {
    return {
      onReset,
      loadDepartment: department.loadDepartment,
      updateData,
      createOrEdit,
      updateDataDepartment: department.updateData,
      loadEmployee: employee.loadEmployee,
      updateEmployee: employee.updateData,
    };
  }
)(Notification);
