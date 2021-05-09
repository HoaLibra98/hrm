import chuyenMonProvider from "data-access/chuyen-mon-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    listSpecialize: [],
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadSpecialize: async (payload = {}, state) => {
      let size = state.specialize.size || 10;
      let page = state.specialize.page || 1;
      let ten = state.specialize.tenSearch;
      let res = await chuyenMonProvider.search({ page, size, ten });
      let { code, message, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách chuyên môn thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.specialize.updateData({
        listSpecialize: data,
        total: totalElements || size,
      });
    },
    createOrEdit: (payload, state) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        chuyenMonProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.specialize.updateData({
                id: "",
                ten: "",
                moTa: "",
              });
              if (!id) {
                snackbar.show("Thêm mới chuyên môn thành công", "success");
              } else {
                snackbar.show("Cập nhật chuyên môn thành công", "success");
              }
              dispatch.specialize.loadSpecialize();
              resolve(s.data);
            } else if (s.code === 1301) {
              snackbar.show(`Tên ${param.ten} đã tồn tại`, "danger");
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              dispatch.specialize.updateData({
                id: "",
                ten: "",
                moTa: "",
              });
              dispatch.specialize.loadSpecialize();
              reject();
            } else {
              if (!id) {
                snackbar.show("Thêm mới chuyên môn không thành công", "danger");
              } else {
                snackbar.show("Cập nhật chuyên môn không thành công", "danger");
              }
              reject();
            }
          })
          .catch((e) => {
            if (!id) {
              snackbar.show("Thêm mới chuyên môn không thành công", "danger");
            } else {
              snackbar.show("Cập nhật chuyên môn không thành công", "danger");
            }
            reject();
          });
      });
    },
    deleteItem: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          okType: "danger",
          okText: "Xóa",
          cancelText: "Hủy",
          content: `Bạn có muốn xóa chuyên môn ${payload.ten}`,
          onOk() {
            chuyenMonProvider
              .deleteItem(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.specialize.loadSpecialize();
                  snackbar.show("Xóa chuyên môn thành công!", "success");
                  resolve(s.data);
                } else {
                  snackbar.show("Xóa chuyên môn không thành công!", "danger");
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show("Xóa chuyên môn không thành công!", "danger");
                reject();
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
    onSizeChange: async (payload) => {
      dispatch.specialize.updateData({
        size: payload,
        page: 1,
      });
      dispatch.specialize.loadSpecialize();
    },
    onPageChange: async (payload) => {
      dispatch.specialize.updateData({ page: payload });
      dispatch.specialize.loadSpecialize();
    },
  }),
};
