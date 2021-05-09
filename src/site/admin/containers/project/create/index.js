import React, { useEffect } from "react";
import { Form, Modal, Input, Checkbox } from "antd";
import { connect } from "react-redux";
import FilterSelect from "site/admin/components/common/filterSelect";
function Project(props) {
  const {
    ten,
    getDetail,
    nhanVienPhuTrachId,
    updateData,
    checkValidate,
    loadEmployee,
    openModal,
    listEmployee,
    khuVucChamCongIds,
    listCheckinArea,
    loadCheckinArea,
    active,
  } = props;
  useEffect(() => {
    // if (props.id) {
    //   getDetail(props.id);
    // }
    props.updateEmployee({
      size: 1000,
    });
    loadEmployee(1);
    loadCheckinArea({ page: 1, size: 1000 });
  }, []);
  const handleSubmit = () => {
    let payload = {
      id: props.id,
      param: {
        ten: ten,
        active: active,
        nhanVienPhuTrachId: nhanVienPhuTrachId,
        khuVucChamCongIds: khuVucChamCongIds,
      },
    };
    if (!ten || !nhanVienPhuTrachId) {
      props.updateData({
        checkValidate: true,
      });
      return;
    } else {
      props.createOrEdit(payload).then((s) => {
        if (s && s.id) {
          props.updateEmployee({
            boPhanSearch: null,
            size: 1000,
          });
          onCloseModal();
        }
      });
    }
  };
  const onCloseModal = () => {
    props.updateData({
      openModal: false,
      checkValidate: false,
    });
    props.updateEmployee({
      boPhanSearch: null,
      size: 1000,
    });
    props.onReset();
  };
  return (
    <Modal
      visible={openModal}
      onCancel={onCloseModal}
      title={props.id ? "Cập nhật dự án" : "Thêm mới dự án"}
      cancelText="Hủy"
      okText={props.id ? "Lưu" : "Thêm mới"}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Tên dự án*">
          <Input
            placeholder="Nhập tên dự án"
            value={ten}
            onChange={(e) => {
              updateData({
                ten: e.target.value,
              });
            }}
          />
          {checkValidate && !ten ? (
            <div className="error">Vui lòng nhập tên dự án!</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Khu vực chấm công">
          <FilterSelect
            onChange={(e) => {
              updateData({
                khuVucChamCongIds: e,
              });
            }}
            mode="multiple"
            placeholder="Chọn khu vực chấm công"
            value={khuVucChamCongIds}
            listData={listCheckinArea}
          />
        </Form.Item>
        <Form.Item label="Chọn người phụ trách*">
          <FilterSelect
            onChange={(e) => {
              updateData({
                nhanVienPhuTrachId: e,
              });
            }}
            placeholder="Chọn người phụ trách"
            value={nhanVienPhuTrachId}
            listData={listEmployee}
            checkValidate={checkValidate && !nhanVienPhuTrachId}
            valueError={"Vui lòng chọn người phụ trách!"}
            searchEmployee={true}
          />
        </Form.Item>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Checkbox
            checked={active}
            onChange={() => {
              updateData({ active: !active });
            }}
          >
            Hiệu lực
          </Checkbox>
        </div>
      </Form>
    </Modal>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
      ten: state.project.ten,
      khuVucChamCongIds: state.project.khuVucChamCongIds,
      id: state.project.id,
      active: state.project.active,
      nhanVienPhuTrachId: state.project.nhanVienPhuTrachId,
      checkValidate: state.project.checkValidate || false,
      openModal: state.project.openModal,
      listEmployee: state.employee.listEmployee || [],
      listCheckinArea: state.checkinArea.listCheckinArea || [],
    };
  },
  ({
    project: { updateData, getDetail, createOrEdit, onReset },
    employee,
    checkinArea,
  }) => {
    return {
      createOrEdit,
      updateData,
      getDetail,
      onReset,
      loadEmployee: employee.loadEmployee,
      updateEmployee: employee.updateData,
      loadCheckinArea: checkinArea.loadData,
    };
  }
)(Project);
