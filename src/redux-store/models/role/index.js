import vaiTroProvider from "data-access/vai-tro-provider";
import snackbar from "utils/snackbar-utils";
import { Modal } from "antd";
const { confirm } = Modal;
export default {
  state: {
    listRole: [],
    listTypeTimekeeping: []
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadRole: async (payload = {}, state) => {
      let size = state.role.size || 10;
      let page = state.role.page || 1;
      let ten = state.role.tenSearch;
      let res = await vaiTroProvider.search({ size, page, ten });
      let { code, message, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách vai trò thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.role.updateData({
        listRole: data,
        total: totalElements,
      });
    },
    createOrEdit: async (payload, state) => {
      let id = state.role.id;
      let ten = state.role.ten;
      let ma = state.role.ma;
      let dmQuyenIds = state.role.dmQuyenIds;
      let param = { ten, ma, dmQuyenIds };
      return new Promise((resolve, reject) => {
        vaiTroProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s && s.code === 0) {
              if (id) {
                snackbar.show("Cập nhật vai trò thành công", "success");
              } else {
                snackbar.show("Thêm mới vai trò thành công", "success");
              }
              dispatch.role.updateData({
                id: "",
                ten: "",
                ma: "",
                openPermission: false,
                dmQuyenIds: [],
              });
              dispatch.role.loadRole();
              resolve(s.data);
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              dispatch.role.updateData({
                id: "",
                ten: "",
                ma: "",
                openPermission: false,
                dmQuyenIds: [],
              });
              dispatch.role.loadRole();
              reject();
            } else if (s.code === 1301) {
              snackbar.show(`Tên ${ten} đã tồn tại`, "danger");
            } else {
              if (id) {
                snackbar.show("Cập nhật vai trò không thành công", "danger");
              } else {
                snackbar.show("Thêm mới vai trò không thành công", "danger");
              }
              reject();
            }
          })
          .catch((e) => {
            if (id) {
              snackbar.show("Cập nhật vai trò không thành công", "danger");
            } else {
              snackbar.show("Thêm mới vai trò không thành công", "danger");
            }
            reject();
          });
      });
    },
    onSizeChange: async (payload) => {
      dispatch.role.updateData({ size: payload, page: 1 });
      dispatch.role.loadRole();
    },
    onPageChange: async (payload) => {
      dispatch.role.updateData({ page: payload });
      dispatch.role.loadRole();
    },
    deleteItem: async (payload) => {
      return new Promise((resolve, reject) => {
        confirm({
          okType: "danger",
          okText: "Xóa",
          cancelText: "Hủy",
          content: `Bạn có muốn xóa vai trò ${payload.ten}?`,
          onOk() {
            vaiTroProvider
              .delete(payload.id)
              .then((s) => {
                if (s && s.code === 0) {
                  snackbar.show("Xóa vai trò thành công!", "success");
                  resolve(s.data);
                  dispatch.role.loadRole();
                } else {
                  snackbar.show("Xóa vai trò không thành công", "danger");
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show("Xóa vai trò không thành công", "danger");
                reject();
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
    loadDetail: async (payload) => {
      return new Promise((resolve, reject) => {
        vaiTroProvider
          .getById(payload)
          .then((s) => {
            if (s && s.code === 0) {
              let dmQuyenIds = [];
              s.data.dmQuyen.map((item) => dmQuyenIds.push(item.id));
              dispatch.role.updateData({
                ten: s.data.ten,
                ma: s.data.ma,
                dmQuyenIds: dmQuyenIds,
              });
              resolve(s.data);
            } else {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              reject();
            }
          })
          .catch((e) => {
            snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
            reject();
          });
      });
    },
    getTypeTimekeeping: async () => {
      let res = await vaiTroProvider.getTypeTimekeeping();
      let { code, message, data } = res;
      if (code !== 0) {
        snackbar.show(
          message || "Lấy danh sách loại check in - out thất bại!",
          "danger"
        );
        throw new Error(message);
      }
      dispatch.role.updateData({
        listTypeTimekeeping: data,
      });
    }
  }),
};
