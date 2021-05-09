import lamNgoaiGioProvider from "data-access/lam-ngoai-gio-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
const { confirm } = Modal;
export default {
  state: {
    listOT: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadOT: async (payload = {}, state) => {
      const { page, size } = payload;
      let thoiGianBatDau =
        state.ot.ngaySearch &&
        moment(state.ot.ngaySearch._d).format("YYYY-MM-DD");
      let nhanVienId = payload.nhanVienId || state.ot.nhanVienId;
      let trangThai = state.ot.trangThai;
      let sort = payload.sort;
      let res = await lamNgoaiGioProvider.search({
        page,
        size,
        thoiGianBatDau,
        nhanVienId,
        trangThai,
      });
      const { code, data, totalElements, message } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách OT thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.ot.updateData({
        listOT: data,
        total: totalElements || 10,
        page: page || 1,
        size: size || 10,
      });
    },
    onSizeChange: async (payload, state) => {
      dispatch.ot.updateData({
        size: payload,
      });
      dispatch.ot.loadOT({ page: 1, size: payload });
    },
    onReset: (payload, state) => {
      dispatch.ot.updateData({
        trangThai: undefined,
        thoiGianBatDau: null,
        thoiGianKetThuc: null,
        checkValidate: false,
        lyDo: "",
        page: 1,
        size: 10,
        nhanVienId: undefined,
        ngaySearch: null,
        ghiChu: "",
      });
    },
    changeStatus: (payload, state) => {
      const {
        param,
        id,
        trangThaiOld,
        param: { trangThai },
      } = payload;
      return new Promise((resolve, reject) => {
        confirm({
          title: trangThai === 1 ? "Xác nhận" : "Từ chối",
          content: `Bạn có muốn ${
            trangThai === 1 ? "Xác nhận đề xuất OT" : "Từ chối đề xuất OT"
          } này?`,
          okText: trangThai === 1 ? "Xác nhận" : "Từ chối",
          okType: trangThai === 1 ? "primary" : "danger",
          cancelText: "Hủy",
          onOk() {
            lamNgoaiGioProvider
              .approval(param, id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.ot.onReset();
                  snackbar.show(
                    trangThai === 1
                      ? "Xác nhận đề xuất OT thành công"
                      : trangThai === 2
                      ? "Từ chối đề xuất OT thành công"
                      : "Thay đổi trạng thái thành công",
                    "success"
                  );
                  dispatch.ot.loadOT({
                    page: 1,
                    trangThai: trangThaiOld,
                  });
                  resolve(s);
                } else {
                  snackbar.show(
                    s.message || trangThai === 1
                      ? "Xác nhận đề xuất OT không thành công"
                      : s.message || trangThai === 2
                      ? "Từ chối đề xuất OT không thành công"
                      : "Thay đổi trạng thái không thành công",
                    "danger"
                  );
                  reject(s);
                }
              })
              .catch((e) => {
                snackbar.show(
                  trangThai === 1
                    ? e.message || "Xác nhận không thành công"
                    : trangThai === 2
                    ? e.message || "Từ chối không thành công"
                    : "Thay đổi trạng thái không thành công",
                  "danger"
                );
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
    createOrEdit: (payload, state) => {
      return new Promise((resolve, reject) => {
        lamNgoaiGioProvider
          .createOrEdit(payload)
          .then((s) => {
            if (s && s.code === 0) {
              snackbar.show("Thêm mới đề xuất thành công!", "success");
              dispatch.ot.updateData({
                lyDo: "",
                ghiChu: "",
                checkValidate: false,
              });
              dispatch.ot.loadOT({
                page: 0,
                size: 10,
                nhanVienId: payload.nhanVienId,
              });
              resolve(s);
            } else {
              snackbar.show("Thêm mới đề xuất không thành công!", "danger");
              reject(s);
            }
          })
          .catch((e) => {
            snackbar.show("Thêm mới đề xuất không thành công!", "danger");
            reject();
          });
      });
    },
    deleteItem: (payload) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          okText: "Đồng ý",
          oKType: "info",
          cancelType: "danger",
          cancelText: "Hủy",
          content: `Bạn có muốn hủy đề xuất OT?`,
          onOk() {
            lamNgoaiGioProvider.delete(payload.id).then((s) => {
              if (s && s.code === 0) {
                snackbar.show("Xóa đề xuất OT thành công!", "success");
                dispatch.ot.loadOT({ page: 1, size: 10 });
                resolve();
              } else if (s.code === 602) {
                snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
                dispatch.ot.loadOT({ page: 1, size: 10 });
                reject();
              } else {
                snackbar.show("Xóa đề xuất OT không thành công!", "danger");
                dispatch.ot.loadOT({ page: 1, size: 10 });
                reject();
              }
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
