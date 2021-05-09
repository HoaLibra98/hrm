import thongBaoProvider from "data-access/thong-bao-provider";
import snackbar from "utils/snackbar-utils";
export default {
  state: {
    listNotification: [],
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadNotification: async (payload, state) => {
      let res = await thongBaoProvider.search(payload);
      let { code, data } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách thông báo không thành công!", "danger");
      }
      dispatch.notification.updateData({
        listNotification: data,
      });
    },
    onReset: (payload, state) => {
      dispatch.notification.updateData({
        tieuDe: "",
        noiDung: "",
        dmBoPhanId: undefined,
        denNhanVienId: undefined,
        loai: undefined,
        checkValidate: false,
        choiceDepart: false
      });
    },
    createOrEdit: (payload, state) => {
      const { param, id } = payload;
      return new Promise((resolve, reject) => {
        thongBaoProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s && s.code === 0 && s.data) {
              snackbar.show("Gửi thông báo thành công", "success");
              dispatch.notification.onReset();
              dispatch.employee.updateData({
                boPhanSearch: null,
              });
            } else {
              snackbar.show(
                s.message || "Gửi thông báo không thành công",
                "danger"
              );
            }
            resolve(s);
          })
          .catch((e) => {
            snackbar.show(
              e.message || "Gửi thông báo không thành công",
              "danger"
            );
            reject(e);
          });
      });
    },
  }),
};
