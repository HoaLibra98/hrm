import React from "react";
import { Form, Modal, Input, Checkbox } from "antd";
import { connect } from "react-redux";
function index(props) {
  const { ten, updateData, checkValidate, openModal, anTrua, anToi } = props;
  const handleSubmit = () => {
    let payload = {
      id: props.id,
      param: {
        ten: ten,
        anTrua,
        anToi,
      },
    };
    if (!ten) {
      props.updateData({
        checkValidate: true,
      });
      return;
    } else {
      props.createOrEdit(payload).then((s) => {
        if (s && s.id) {
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
    props.onReset();
  };
  const formatNumber = (item) => {
    return item
      .toLowerCase()
      .replace(
        /[eẽẹèéũụùúẵặăắằâẫậầấđềêễểệếưừữựứôồộốỗơỡờợớáãạàa-zA-Z!@#$%^&*()\-=_+|\\{}\[\]:':"<>,.?/~` ]/gi,
        ""
      )
      .replace(/^(0)([0-9])$/gi, "$2")
      .replace(/^0{2,}/gi, "");
  };
  return (
    <Modal
      visible={openModal}
      onCancel={onCloseModal}
      title={
        props.id ? "Cập nhật khu vực chấm công" : "Thêm mới khu vực chấm công"
      }
      cancelText="Hủy"
      okText={props.id ? "Lưu" : "Thêm mới"}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Tên khu vực chấm công*: ">
          <Input
            placeholder="Nhập tên khu vực chấm công"
            value={ten}
            onChange={(e) => {
              updateData({
                ten: e.target.value,
              });
            }}
          />
          {checkValidate && !ten ? (
            <div className="error">Vui lòng nhập tên khu vực chấm công!</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Số tiền ăn trưa: ">
          <Input
            placeholder="Nhập số tiền ăn trưa"
            value={anTrua && anTrua.formatPrice()}
            onChange={(e) => {
              updateData({
                anTrua: formatNumber(e.target.value.toLowerCase()),
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Số tiền ăn tối: ">
          <Input
            placeholder="Nhập số tiền ăn tối"
            value={anToi && anToi.formatPrice()}
            onChange={(e) => {
              updateData({
                anToi: formatNumber(e.target.value.toLowerCase()),
              });
            }}
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
      ten: state.checkinArea.ten,
      id: state.checkinArea.id,
      checkValidate: state.checkinArea.checkValidate || false,
      openModal: state.checkinArea.openModal,
      anToi: state.checkinArea.anToi,
      anTrua: state.checkinArea.anTrua,
    };
  },
  ({ checkinArea: { updateData, getDetail, createOrEdit, onReset } }) => {
    return {
      createOrEdit,
      updateData,
      getDetail,
      onReset,
    };
  }
)(index);
