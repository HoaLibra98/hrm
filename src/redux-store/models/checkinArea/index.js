import khuVucChamCongProvider from "data-access/khu-vuc-cham-cong-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    listCheckinArea: [],
    checkValidate: false,
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadData: async (payload, state) => {
      let size = payload.size || state.checkinArea.size || 10;
      let page = payload.page || state.checkinArea.page || 1;
      let ten = state.checkinArea.ten || state.checkinArea.tenSearch;
      let res = await khuVucChamCongProvider.search({
        page,
        size,
        ten,
      });
      let { code, data, totalElements, message } = res || {};
      if (code !== 0) {
        throw new Error(message);
      }
      dispatch.checkinArea.updateData({
        listCheckinArea: data,
        total: totalElements || size,
      });
    },
    onSizeChange: async (payload, state) => {
      dispatch.checkinArea.updateData({
        size: payload,
        page: 1,
      });
      dispatch.checkinArea.loadData(1);
    },
    getDetail: (payload, state) => {
      return new Promise((resolve, reject) => {
        khuVucChamCongProvider
          .getById(payload)
          .then((s) => {
            if (s && s.code === 0 && s.data) {
              dispatch.checkinArea.updateData({
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
      dispatch.checkinArea.updateData({
        ten: "",
        id: undefined,
        page: 1,
        size: 10,
        anTrua: "",
        anToi: "",
        openModal: false,
        tenSearch: "",
      });
    },
    createOrEdit: (payload, state) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        khuVucChamCongProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              if (!id) {
                snackbar.show(
                  "Th??m m???i khu v???c ch???m c??ng th??nh c??ng",
                  "success"
                );
              } else {
                snackbar.show(
                  "C???p nh???t khu v???c ch???m c??ng th??nh c??ng",
                  "success"
                );
              }
              dispatch.checkinArea.onReset();
              dispatch.checkinArea.loadData(1);
              resolve(s.data);
            } else if (s.code === 401) {
              localStorage.clear();
              window.location.href = "/login";
            } else {
              if (!id) {
                snackbar.show(
                  s.message || "Th??m khu v???c ch???m c??ng th??nh c??ng",
                  "danger"
                );
              } else {
                snackbar.show(
                  s.message || "C???p nh???t khu v???c ch???m c??ng kh??ng th??nh c??ng",
                  "danger"
                );
              }
              reject();
            }
          })
          .catch((e) => {
            if (!id) {
              snackbar.show("Th??m khu v???c ch???m c??ng th??nh c??ng", "danger");
            } else {
              snackbar.show(
                "C???p nh???t khu v???c ch???m c??ng kh??ng th??nh c??ng",
                "danger"
              );
            }
            reject();
          });
      });
    },
    onDelete: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "X??c nh???n",
          content: `B???n c?? mu???n x??a khu v???c ch???m c??ng ${payload.ten} n??y?`,
          okText: "X??a",
          okType: "danger",
          cancelText: "H???y",
          onOk() {
            khuVucChamCongProvider
              .delete(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.checkinArea.loadData(1);
                  snackbar.show("X??a khu v???c ch???m c??ng th??nh c??ng", "success");
                  resolve();
                } else if (s.code === 401) {
                  localStorage.clear();
                  window.location.href = "/login";
                } else {
                  snackbar.show(
                    s.message || "X??a khu v???c ch???m c??ng kh??ng th??nh c??ng",
                    "danger"
                  );
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show(
                  e.message || "X??a khu v???c ch???m c??ng kh??ng th??nh c??ng",
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
