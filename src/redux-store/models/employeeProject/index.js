import nvduAnProvider from "data-access/nv-du-an-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    listEmployeeProject: [],
    checkValidate: false,
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadEmployeeProject: async (payload, state) => {
      let size = state.employeeProject.size || 10;
      let page = payload || 1;
      let nhanVienId = payload.nhanVienId;
      let res = await nvduAnProvider.search({
        page,
        size,
        nhanVienId,
      });
      let { code, data, totalElements } = res || {};
      if (code !== 0) {
        snackbar.show("Lấy danh sách dự án không thành công!", "danger");
      }
      dispatch.employeeProject.updateData({
        listEmployeeProject: data,
        total: totalElements || size,
        duAnIds: data.reduce((arr, current) => [...arr, current.duAnId], []),
        duAnIdsCheck: data,
      });
    },
    onSizeChange: async (payload, state) => {
      dispatch.employeeProject.updateData({
        size: payload,
        page: 1,
      });
      dispatch.employeeProject.loadEmployeeProject(1);
    },
    onReset: (id, state) => {
      dispatch.employeeProject.updateData({
        ten: "",
        id: undefined,
        page: 1,
        size: 10,
      });
    },
    tagsProject: (payload, state) => {
      return new Promise((resolve, reject) => {
        nvduAnProvider
          .createOrEdit(payload.param)
          .then((s) => {
            if (s.code === 0) {
              if (!!payload.notifi === false) {
                snackbar.show("Thêm dự án cho nhân viên thành công", "success");
              }
              dispatch.employeeProject.onReset();
              resolve(s.data);
            } else if (s.code === 401) {
              localStorage.clear();
              window.location.href = "/login";
            } else {
              snackbar.show(
                s.message || "Thêm dự án cho nhân viên thành công",
                "danger"
              );
              reject();
            }
          })
          .catch((e) => {
            snackbar.show("Thêm dự án cho nhân viên thành công", "danger");
            reject();
          });
      });
    },
    onDeleteMore: (payload, state) => {
      return new Promise((resolve, reject) => {
        nvduAnProvider.deleteMore(payload);
      });
    },
  }),
};
