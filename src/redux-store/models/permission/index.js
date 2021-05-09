import quyenProvider from "data-access/quyen-provider";
import snackbar from "utils/snackbar-utils";
import { Modal } from "antd";
const { confirm } = Modal;
export default {
  state: {
    listPermission: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadPermission: async (payload = {}, state) => {
      let size = payload.size || 10;
      let page = payload.page || 1;
      let ten = state.permission.nameSearch;
      let ma = state.permission.maSearch;
      let param = { size, page, ten, ma };
      let res = await quyenProvider.search(param);
      let { code, message, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách quyền thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.permission.updateData({
        listPermission: data,
        total: totalElements || size,
      });
    },
    createOrEdit: async (payload, state) => {
      let id = state.permission.id;
      let ten = state.permission.ten;
      let ma = state.permission.ma;
      let param = { ten, ma };
      return new Promise((resolve, reject) => {
        quyenProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s && s.code === 0) {
              if (id) {
                snackbar.show("Cập nhật quyền thành công!", "success");
              } else {
                snackbar.show("Thêm mới quyền thành công!", "success");
              }
              dispatch.permission.updateData({ ma: "", ten: "", id: "" });
              dispatch.permission.loadPermission();
              resolve(s.data);
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              dispatch.permission.updateData({
                ma: "",
                ten: "",
                id: "",
              });
              dispatch.permission.loadPermission();
              reject();
            } else if (s.code === 1301) {
              snackbar.show(`Tên ${ten} đã tồn tại`, "danger");
            } else {
              if (id) {
                snackbar.show("Cập nhật quyền không thành công!", "danger");
              } else {
                snackbar.show("Thêm mới quyền không thành công!", "danger");
              }
              reject();
            }
          })
          .catch((e) => {
            if (id) {
              snackbar.show("Cập nhật quyền không thành công!", "danger");
            } else {
              snackbar.show("Thêm mới quyền không thành công!", "danger");
            }
            reject();
          });
      });
    },
    deleteItem: async (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          okType: "danger",
          title: "Xác nhận",
          content: `Bạn có muốn xóa quyền ${payload.ten}?`,
          cancelText: "Hủy",
          okText: "Xóa",
          onOk() {
            quyenProvider
              .delete(payload.id)
              .then((s) => {
                if (s && s.code === 0) {
                  snackbar.show("Xóa quyền thành công!", "success");
                  dispatch.permission.loadPermission();
                  resolve(s.data);
                } else {
                  snackbar.show("Xóa quyền không thành công!", "danger");
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show("Xóa quyền không thành công!", "danger");
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
      dispatch.permission.updateData({ size: payload, page: 1 });
      dispatch.permission.loadPermission({ size: payload, page: 1 });
    },
    onPageChange: async (payload, state) => {
      let size = state.permission.size;
      dispatch.permission.updateData({ page: payload });
      dispatch.permission.loadPermission({ page: payload, size: size });
    },
  }),
};
