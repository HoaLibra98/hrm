import duAnProvider from "data-access/du-an-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    listProject: [],
    checkValidate: false,
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadProject: async (payload, state) => {
      let size = payload.size || state.project.size || 10;
      let page = payload.page || 1;
      let ten = state.project.ten;
      let active = payload.active;
      let nhanVienPhuTrachId = state.project.phutrachSearch;
      let res = await duAnProvider.search({
        page,
        size,
        ten,
        nhanVienPhuTrachId,
        active,
      });
      let { code, data, totalElements } = res || {};
      if (code !== 0) {
        snackbar.show("Lấy danh sách dự án không thành công!", "danger");
      }
      dispatch.project.updateData({
        listProject: data,
        total: totalElements || size,
      });
    },
    onSizeChange: async (payload, state) => {
      dispatch.project.updateData({
        size: payload,
        page: 1,
      });
      dispatch.project.loadProject(1);
    },
    getDetail: (payload, state) => {
      return new Promise((resolve, reject) => {
        duAnProvider
          .getById(payload)
          .then((s) => {
            if (s && s.code === 0 && s.data) {
              dispatch.project.updateData({
                ten: s.data.ten,
                nhanVienPhuTrachId: s.data.nhanVienPhuTrachId,
                khuVucChamCongIds: s.data.khuVucChamCongIds || [],
                active: s.data.active,
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
      dispatch.project.updateData({
        ten: "",
        nhanVienPhuTrachId: undefined,
        id: undefined,
        page: 1,
        size: 10,
        openModal: false,
        phutrachSearch: undefined,
        khuVucChamCongIds: [],
      });
      dispatch.employee.updateData({
        boPhanSearch: null,
        size: 1000,
      });
    },
    createOrEdit: (payload, state) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        duAnProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              if (!id) {
                snackbar.show("Thêm mới dự án thành công", "success");
              } else {
                snackbar.show("Cập nhật dự án thành công", "success");
              }
              dispatch.project.onReset();
              dispatch.project.loadProject(1);
              resolve(s.data);
            } else if (s.code === 401) {
              localStorage.clear();
              window.location.href = "/login";
            } else {
              if (!id) {
                snackbar.show(s.message || "Thêm dự án thành công", "danger");
              } else {
                snackbar.show(
                  s.message || "Cập nhật dự án không thành công",
                  "danger"
                );
              }
              reject();
            }
          })
          .catch((e) => {
            if (!id) {
              snackbar.show("Thêm dự án thành công", "danger");
            } else {
              snackbar.show("Cập nhật dự án không thành công", "danger");
            }
            reject();
          });
      });
    },
    onDelete: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn xóa dự án ${payload.ten} này?`,
          okText: "Xóa",
          okType: "danger",
          cancelText: "Hủy",
          onOk() {
            duAnProvider
              .delete(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.project.loadProject(1);
                  snackbar.show("Xóa dự án thành công", "success");
                  resolve();
                } else if (s.code === 401) {
                  localStorage.clear();
                  window.location.href = "/login";
                } else {
                  snackbar.show(
                    s.message || "Xóa dự án không thành công",
                    "danger"
                  );
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show(
                  e.message || "Xóa dự án không thành công",
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
