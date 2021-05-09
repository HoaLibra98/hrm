import React, { useEffect } from "react";
import { Form, Modal, Input } from "antd";
import { connect } from "react-redux";
import FilterSelect from "site/admin/components/common/filterSelect";
function DepartmentCreate(props) {
  const {
    ten,
    getDetail,
    moTa,
    nhanVienPhuTrachId,
    updateData,
    checkValidate,
    loadEmployee,
    openModal,
    listEmployee,
  } = props;
  useEffect(() => {
    if (props.id) {
      props.updateEmployee({
        boPhanSearch: props.id,
        size: 1000,
      });
      loadEmployee(1);
      // getDetail(props.id)
      //   .then((s) => {})
      //   .catch((e) => {
      //     // snackbar.show("Lấy chi tiết bộ phận không thành công", "danger");
      //   });
    }
  }, []);
  const handleSubmit = () => {
    let payload = {
      id: props.id,
      param: {
        ten: ten,
        moTa: moTa,
        nhanVienPhuTrachId: nhanVienPhuTrachId,
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
      title={props.id ? "Cập nhật bộ phận" : "Thêm mới bộ phận"}
      cancelText="Hủy"
      okText={props.id ? "Lưu" : "Thêm mới"}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Tên bộ phận*">
          <Input
            placeholder="Nhập tên bộ phận"
            value={ten}
            onChange={(e) => {
              updateData({
                ten: e.target.value,
              });
            }}
          />
          {checkValidate && !ten ? (
            <div className="error">Vui lòng nhập tên bộ phận!</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            placeholder="Nhập mô tả"
            value={moTa}
            onChange={(e) => {
              updateData({
                moTa: e.target.value,
              });
            }}
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
      </Form>
    </Modal>
  );
}
export default connect(
  (state) => {
    return {
      auth: state.auth.auth || {},
      ten: state.department.ten,
      moTa: state.department.moTa,
      id: state.department.id,
      nhanVienPhuTrachId: state.department.nhanVienPhuTrachId,
      checkValidate: state.department.checkValidate || false,
      openModal: state.department.openModal,
      listEmployee: state.employee.listEmployee || [],
    };
  },
  ({
    department: { updateData, getDetail, createOrEdit, onReset },
    employee,
  }) => {
    return {
      createOrEdit,
      updateData,
      getDetail,
      onReset,
      loadEmployee: employee.loadEmployee,
      updateEmployee: employee.updateData,
    };
  }
)(DepartmentCreate);
