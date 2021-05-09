import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { connect } from "react-redux";

function ModalChangePass(props) {
  useEffect(() => {}, []);
  const closeModal = () => {
    props.updateData({
      matKhau: "",
      matKhauMoi: "",
      xacNhan: "",
      checkChangePass: false,
    });
    props.onClose();
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    if (props.matKhauMoi && props.matKhau && props.xacNhan) {
      if (props.matKhauMoi !== props.xacNhan) {
        props.updateData({
          checkChangePass: true,
        });
        return;
      }
      const param = {
        matKhau: props.matKhau,
        matKhauMoi: props.matKhauMoi,
        id: props.auth && props.auth.id,
      };
      props.changePassword(param).then((s) => {
        if (s && s.code === 0) {
          setTimeout(() => {
            closeModal();
            props.onLogout();
            window.location.href = "/login";
          }, 500);
        }
      });
    }
    props.updateData({
      checkChangePass: true,
    });
    return;
  };
  return (
    <Modal
      visible={true}
      onCancel={closeModal}
      title={"Thay đổi mật khẩu"}
      cancelText="Hủy"
      okText="Thay đổi"
      onOk={handleChangePass}
    >
      <div>
        <Form layout="vertical" hideRequiredMark onFinish={handleChangePass}>
          <Form.Item label="Mật khẩu hiện tại">
            <Input
              placeholder="Nhập mật khẩu hiện tại"
              type="password"
              onChange={(e) => {
                props.updateData({
                  matKhau: e.target.value,
                });
              }}
              value={props.matKhau}
            />
            {props.checkChangePass && !props.matKhau ? (
              <div className="error">Vui lòng nhập mật khẩu hiện tại</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Mật khẩu mới">
            <Input
              placeholder="Nhập mật khẩu mới"
              type="password"
              onChange={(e) => {
                props.updateData({
                  matKhauMoi: e.target.value,
                });
              }}
              value={props.matKhauMoi}
            />
            {props.checkChangePass && !props.matKhauMoi ? (
              <div className="error">Vui lòng nhập mật khẩu hiện mới</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Xác nhận mật khẩu">
            <Input
              placeholder="Nhập xác nhận mật khẩu"
              type="password"
              onChange={(e) => {
                props.updateData({
                  xacNhan: e.target.value,
                });
              }}
              value={props.xacNhan}
            />
            {props.checkChangePass && !props.xacNhan ? (
              <div className="error">Vui lòng xác nhận mật khẩu mới</div>
            ) : props.checkChangePass && props.matKhauMoi !== props.xacNhan ? (
              <div className="error">Xác nhận mật khẩu chưa đúng</div>
            ) : null}
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth.auth || {},
    matKhau: state.employee.matKhau,
    matKhauMoi: state.employee.matKhauMoi,
    xacNhan: state.employee.xacNhan,
    checkChangePass: state.employee.checkChangePass,
  };
}

export default connect(
  mapStateToProps,
  ({ auth: { onLogout }, employee: { changePassword, updateData } }) => {
    return {
      onLogout,
      updateData,
      changePassword,
    };
  }
)(ModalChangePass);
