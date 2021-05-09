import phongBanProvider from "data-access/phong-ban-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    listDepartment: [],
    checkValidate: false,
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadDepartment: async (payload, state) => {
      let size = state.department.size || 10;
      let page = payload || 1;
      let ten = state.department.tenPhongBan;
      let nhanVienPhuTrachId = state.department.phutrachSearch;
      let res = await phongBanProvider.search({
        page,
        size,
        ten,
        nhanVienPhuTrachId,
      });
      let { code, data, totalElements } = res || {};
      if (code !== 0) {
        snackbar.show("Lấy danh sách bộ phận không thành công!", "danger");
      }
      dispatch.department.updateData({
        listDepartment: data,
        total: totalElements || size,
      });
    },
    onSizeChange: async (payload, state) => {
      dispatch.department.updateData({
        size: payload,
        page: 1,
      });
      dispatch.department.loadDepartment(1);
    },
    getDetail: (payload, state) => {
      return new Promise((resolve, reject) => {
        phongBanProvider
          .getById(payload)
          .then((s) => {
            if (s && s.code === 0 && s.data) {
              dispatch.department.updateData({
                ten: s.data.ten,
                mota: s.data.mota,
                nhanVienPhuTrachId: s.data.nhanVienPhuTrachId,
              });
              resolve(s);
            } else {
              resolve(s);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    onReset: (id, state) => {
      dispatch.department.updateData({
        ten: "",
        moTa: "",
        nhanVienPhuTrachId: undefined,
        id: undefined,
        page: 1,
        size: 10,
        openModal: false,
        tenPhongBan: "",
        motaSearch: "",
        phutrachSearch: undefined,
      });
      dispatch.employee.updateData({
        boPhanSearch: null,
        size: 1000,
      });
    },
    createOrEdit: (payload, state) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        phongBanProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              if (!id) {
                snackbar.show("Thêm mới bộ phận thành công", "success");
              } else {
                snackbar.show("Cập nhật bộ phận thành công", "success");
              }
              dispatch.department.onReset();
              dispatch.department.loadDepartment(1);
              resolve(s.data);
            } else if (s.code === 401) {
              localStorage.clear();
              window.location.href = "/login";
            } else {
              if (!id) {
                snackbar.show(s.message || "Thêm bộ phận thành công", "danger");
              } else {
                snackbar.show(
                  s.message || "Cập nhật bộ phận không thành công",
                  "danger"
                );
              }
              reject();
            }
          })
          .catch((e) => {
            if (!id) {
              snackbar.show("Thêm bộ phận thành công", "danger");
            } else {
              snackbar.show("Cập nhật bộ phận không thành công", "danger");
            }
            reject();
          });
      });
    },
    onDelete: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn xóa bộ phận ${payload.ten} này?`,
          okText: "Xóa",
          okType: "danger",
          cancelText: "Hủy",
          onOk() {
            phongBanProvider
              .delete(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.department.loadDepartment(1);
                  snackbar.show("Xóa bộ phận thành công", "success");
                  resolve();
                } else if (s.code === 401) {
                  localStorage.clear();
                  window.location.href = "/login";
                } else {
                  snackbar.show(
                    s.message || "Xóa bộ phận không thành công",
                    "danger"
                  );
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show(
                  e.message || "Xóa bộ phận không thành công",
                  "danger"
                );
                reject();
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
  }),
};
