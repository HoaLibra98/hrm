import React, { useEffect } from "react";
import { Modal, Transfer } from "antd";
import { connect } from "react-redux";
import "./style.scss";

function Authorization(props) {
  const {
    id,
    openPermission,
    updateData,
    ten,
    listPermission,
    loadPermission,
    dmQuyenIds,
    selectedKeys,
    createOrEdit,
    loadDetail,
  } = props;
  useEffect(() => {
    loadPermission({
      page: 1,
      size: 1000,
    });
    if (id) {
      loadDetail(id);
    } else {
      updateData({
        openPermission: false,
        id: "",
        ten: "",
        ma: "",
        dmQuyenIds: [],
        dmQuyen: [],
      });
    }
  }, []);
  let mockData = listPermission.map((item) => {
    return {
      key: item.id,
      title: item.ten,
      ma: item.ma,
    };
  });

  const handleSelectChange = (sourceSelectedKeys, selectedKeys) => {
    updateData({
      selectedKeys: [...selectedKeys, ...sourceSelectedKeys],
    });
  };
  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    updateData({
      dmQuyenIds: [...nextTargetKeys],
    });
  };
  const closePermission = () => {
    updateData({
      openPermission: false,
      id: "",
      ten: "",
      ma: "",
      dmQuyenIds: [],
      dmQuyen: [],
      selectedKeys: [],
    });
  };
  const onSubmit = () => {
    updateData({ dmQuyenIds: dmQuyenIds });
    createOrEdit();
  };
  return (
    <>
      <Modal
        visible={openPermission}
        okText="Xong"
        cancelText="Hủy"
        onCancel={closePermission}
        title={id ? "Cập nhật" : "Thêm quyền"}
        onOk={onSubmit}
        width={700}
      >
        <Transfer
          dataSource={mockData}
          titles={["Quyền", `Quyền của ${ten}`]}
          targetKeys={dmQuyenIds}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          render={(item) => item.title}
          style={{ marginBottom: 16 }}
        ></Transfer>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    role: { id, ten, openPermission, dmQuyenIds, selectedKeys },
    permission: { listPermission },
  } = state;
  return {
    id,
    ten,
    openPermission,
    listPermission,
    selectedKeys,
    dmQuyenIds,
  };
};
const mapDispatchToProps = ({
  permission: { loadPermission },
  role: { updateData, createOrEdit, loadDetail },
}) => ({
  updateData,
  loadPermission,
  createOrEdit,
  loadDetail,
});
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
