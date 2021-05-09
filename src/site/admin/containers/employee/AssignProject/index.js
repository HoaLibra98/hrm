import React, { useEffect, useState } from "react";
import { Form, Modal, DatePicker } from "antd";
import { connect } from "react-redux";
import FilterSelect from "site/admin/components/common/filterSelect";
import { project } from "../../../../../redux-store/models";
import moment from "moment";
const AssignProject = (props) =>{
  const {
    modalAssignProject,
    loadProject,
    getAllEmployee,
    tagsProject,
  } = props;
  const [state, _setState] = useState({ nhanVienIds: [], duAnIds: [] });
  const setState = (newState) => {
    _setState({ ...state, ...newState });
  };
  const handleSubmit = () => {
    const { nhanVienIds, duAnIds, tuNgay, denNgay } = state;
    if (duAnIds && tuNgay && nhanVienIds) {
      let param = [];
      param = duAnIds.reduce(
        (value, currentValue) => [
          ...value,
          ...nhanVienIds.map((item) => {
            return {
              nhanVienId: item,
              duAnId: currentValue,
              tuNgay: tuNgay && tuNgay.format("YYYY-MM-DD"),
              denNgay: denNgay && denNgay.format("YYYY-MM-DD"),
            };
          }),
        ],
        []
      );
      setState({
        checkValidate: false,
      });
      tagsProject({ param: [...param] }).then((e) => {
        onCloseModal();
      });
    } else {
      setState({
        checkValidate: true,
      });
    }
  };
  const onCloseModal = () => {
    props.updateData({
      modalAssignProject: false,
      checkValidate: false,
    });
    props.onReset();
  };
  useEffect(() => {
    getAllEmployee();
    loadProject({ page: 1, size: 1000, active: true });
  }, []);
  return (
    <Modal
      visible={modalAssignProject}
      onCancel={onCloseModal}
      title={"Phân công dự án"}
      cancelText="Đóng"
      okText={"Phân công"}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Nhân viên (*):">
          <FilterSelect
            mode="multiple"
            onChange={(e) => {
              setState({
                nhanVienIds: e,
              });
            }}
            placeholder="Chọn nhân viên"
            value={state.nhanVienIds}
            listData={props.listEmployeeAll}
            noFillAll={true}
            searchEmployee
            checkValidate={state.checkValidate && !state.nhanVienIds.length}
            valueError={"Vui lòng chọn nhân viên tham gia!"}
          />
        </Form.Item>
        <Form.Item label="Dự án (*):">
          <FilterSelect
            mode="multiple"
            onChange={(e) => {
              setState({
                duAnIds: e,
              });
            }}
            placeholder="Chọn dự án"
            value={state.duAnIds}
            listData={props.listProject}
            noFillAll={true}
            checkValidate={state.checkValidate && !state.duAnIds.length}
            valueError={"Vui lòng chọn dự án tham gia!"}
          />
        </Form.Item>
        <Form.Item label="Thời gian tham gia (*):">
          <div style={{ display: "flex" }}>
            <DatePicker
              placeholder="Từ ngày"
              style={{ marginRight: "0.5em" }}
              onChange={(e) => {
                setState({
                  tuNgay: e,
                });
              }}
              value={state.tuNgay}
              disabledDate={(d) => {
                return d._d > state.denNgay;
              }}
            />
            <DatePicker
              placeholder="Đến ngày"
              style={{ marginLeft: "0.5em" }}
              onChange={(e) => {
                setState({
                  denNgay: e,
                });
              }}
              value={state.denNgay}
              disabledDate={(d) => {
                return d._d < state.tuNgay;
              }}
            />
          </div>
          {state.checkValidate && !state.tuNgay && (
            <div className="error">Vui lòng chọn thời gian tham gia!</div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
      modalAssignProject: state.employee.modalAssignProject,
      listProject: state.project.listProject,
      listEmployeeAll: state.employee.listEmployeeAll,
    };
  },
  ({
    employee: { updateData, onReset, getAllEmployee },
    project,
    employeeProject,
  }) => {
    return {
      updateData,
      onReset,
      loadProject: project.loadProject,
      getAllEmployee,
      tagsProject: employeeProject.tagsProject,
    };
  }
)(AssignProject);
