import ngayNghiProvider from "data-access/nv-ngay-nghi-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
const { confirm } = Modal;
export default {
  state: {
    listDayOff: [],
    listTypeDayOff: []
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadDayOff: async (payload, state) => {
      const { page, size } = payload;
      let nhanVienId = payload.nhanVienId || state.dayOff.nhanVienId;
      let ngayNghi =
        state.dayOff.ngayNghi &&
        moment(state.dayOff.ngayNghi._d).format("YYYY-MM-DD");
      let dmBoPhanId = state.dayOff.dmBoPhanId;
      let trangThai = state.dayOff.trangThai;
      let sort = payload.sort;
      let param = {
        nhanVienId,
        size,
        page,
        ngayNghi,
        dmBoPhanId,
        trangThai,
        sort,
      };
      let res = await ngayNghiProvider.search(param);
      const { code, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách ngày nghỉ không thành công!", "danger");
      }
      dispatch.dayOff.updateData({
        listDayOff: data,
        total: totalElements || 10,
        page: page || 1,
        size: size || 10,
      });
    },
    onSizeChange: async (payload, state) => {
      dispatch.dayOff.updateData({
        size: payload,
        page: 1,
      });
      dispatch.dayOff.loadDayOff({ page: 1, size: payload });
    },
    onReset: (payload, state) => {
      dispatch.dayOff.updateData({
        loaiNgayNghi: 0,
        thoiGianNghi: 0,
        thoiGianBatDau: null,
        thoiGianKetThuc: null,
        checkValidate: false,
        lyDo: "",
        page: 1,
        size: 10,
        trangThai: null,
        dmBoPhanId: undefined,
        nhanVienId: undefined,
        ngayNghi: null,
      });
    },
    createOrEdit: (payload, state) => {
      return new Promise((resolve, reject) => {
        ngayNghiProvider
          .createOrEdit(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.dayOff.onReset();
              snackbar.show("Thêm đề xuất nghỉ phép thành công", "success");
              dispatch.dayOff.loadDayOff({
                page: 1,
                nhanVienId: state.auth.auth.id,
              });
              resolve(s);
            } else {
              snackbar.show(
                s.message || "Thêm đề xuất nghỉ phép không thành công",
                "danger"
              );
              reject(s);
            }
          })
          .catch((e) => {
            snackbar.show("Thêm đề xuất nghỉ phép không thành công", "danger");
          });
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
          content: `Bạn có muốn ${trangThai === 1
            ? "Xác nhận đề xuất nghỉ phép"
            : "Từ chối đề xuất nghỉ phép"
            } này?`,
          okText: trangThai === 1 ? "Xác nhận" : "Từ chối",
          okType: trangThai === 1 ? "primary" : "danger",
          cancelText: "Hủy",
          onOk() {
            ngayNghiProvider
              .approval(param, id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.dayOff.onReset();
                  snackbar.show(
                    trangThai === 1
                      ? "Xác nhận đề xuất nghỉ phép thành công"
                      : trangThai === 2
                        ? "Từ chối đề xuất nghỉ phép thành công"
                        : "Thay đổi trạng thái thành công",
                    "success"
                  );
                  dispatch.dayOff.loadDayOff({
                    page: 1,
                    trangThai: trangThaiOld,
                  });
                  resolve(s);
                } else {
                  snackbar.show(
                    trangThai === 1
                      ? s.message ||
                      "Xác nhận đề xuất nghỉ phép không thành công"
                      : trangThai === 2
                        ? s.message ||
                        "Từ chối đề xuất nghỉ phép không thành công"
                        : "Thay đổi trạng thái không thành công",
                    "danger"
                  );
                  reject(s);
                }
              })
              .catch((e) => {
                snackbar.show(
                  e.message || trangThai === 1
                    ? "Xác nhận không thành công"
                    : e.message || trangThai === 2
                      ? "Từ chối không thành công"
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
    onDelete: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn hủy lịch nghỉ phép ngày ${moment(
            payload.ngayNghi
          ).format("DD/MM/YYYY")} này?`,
          okText: "Đồng ý",
          oKType: "info",
          cancelType: "danger",
          cancelText: "Hủy",
          onOk() {
            ngayNghiProvider
              .delete(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.dayOff.loadDayOff({
                    page: 1,
                    nhanVienId: state.auth.auth.id,
                  });
                  snackbar.show("Hủy lịch nghỉ phép thành công", "success");
                  resolve();
                } else {
                  snackbar.show(
                    "Hủy lịch nghỉ phép không thành công",
                    "danger"
                  );
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show(
                  (e && e.message) || "Hủy lịch nghỉ phép không thành công",
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
    getTypeDayOff: async () => {
      let res = await ngayNghiProvider.getTypeDayOff();
      let { code, message, data } = res;
      if (code !== 0) {
        snackbar.show(
          message || "Lấy danh sách loại ngày nghỉ thất bại!",
          "danger"
        );
        throw new Error(message);
      }
      dispatch.dayOff.updateData({
        listTypeDayOff: data,
      });
    }
  }),
};
