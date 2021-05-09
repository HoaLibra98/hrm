import hopDongLaoDongProvider from "data-access/nv-hop-dong-lao-dong-provider";
// import { message } from "antd";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
export default {
  state: {
    listContract: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadContract: async (payload = {}, state) => {
      let size = state.contract.size || 10;
      let page = state.contract.page || 1;
      let dmLoaiHopDongId = state.contract.dmLoaiHopDongIdSearch;
      let soHopDong = state.contract.soHopDongSearch;
      let nhanVienId = state.contract.nhanVienIdSearch;
      let dmBoPhanId = state.contract.dmBoPhanIdSearch;
      let thoiGianKyHopDong =
        state.contract.thoiGianKyHopDongSearch &&
        moment(state.contract.thoiGianKyHopDongSearch._d).format("YYYY-MM-DD");
      let param = {
        size,
        page,
        dmLoaiHopDongId,
        soHopDong,
        nhanVienId,
        dmBoPhanId,
        thoiGianKyHopDong,
      };

      let res = await hopDongLaoDongProvider.search(param);
      const { code, message, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách hợp đồng lao động thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.contract.updateData({
        listContract: data,
        total: totalElements || size,
      });
    },
    onSizeChange: (payload) => {
      dispatch.contract.updateData({ size: payload, page: 1 });
      dispatch.contract.loadContract();
    },
    onPageChange: (payload) => {
      dispatch.contract.updateData({ page: payload });
      dispatch.contract.loadContract();
    },
    createOrEdit: async (payload) => {
      let { id, param } = payload;
      return new Promise((resolve, reject) => {
        hopDongLaoDongProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.contract.updateData({
                nhanVienId: "",
                soHopDong: "",
                dmLoaiHopDongId: "",
                thoiGianKyHopDong: null,
                thoiGianBatDau: null,
                thoiGianKetThuc: null,
                dinhKem: "",
                id: "",
              });
              if (!id) {
                snackbar.show(
                  "Thêm mới hợp đồng lao động thành công!",
                  "success"
                );
              } else {
                snackbar.show(
                  "Cập nhật hợp đồng lao động thành công!",
                  "success"
                );
              }
              resolve(s.data);
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              dispatch.contract.updateData({
                nhanVienId: "",
                soHopDong: "",
                dmLoaiHopDongId: "",
                thoiGianKyHopDong: null,
                thoiGianBatDau: null,
                thoiGianKetThuc: null,
                dinhKem: "",
                id: "",
              });
              dispatch.contract.loadContract();
              reject(s);
            } else {
              if (!id) {
                snackbar.show(
                  "Thêm mới hợp đồng lao động không thành công!",
                  "danger"
                );
              } else {
                snackbar.show(
                  "Cập nhật hợp đồng lao động không thành công!",
                  "danger"
                );
              }
              reject();
            }
          })
          .catch((e) => {
            if (!id) {
              snackbar.show(
                "Thêm mới hợp đồng lao động không thành công!",
                "danger"
              );
            } else {
              snackbar.show(
                "Cập nhật hợp đồng lao động không thành công!",
                "danger"
              );
            }
            reject();
          });
      });
    },
    getDetail: async (payload) => {
      return new Promise((resolve, reject) => {
        hopDongLaoDongProvider
          .getById(payload)
          .then((s) => {
            if (s.code === 0 && s.data) {
              dispatch.contract.updateData({
                nhanVienId: s.data.nhanVienId,
                soHopDong: s.data.soHopDong,
                dmLoaiHopDong: s.data.dmLoaiHopDong,
                thoiGianKyHopDong: s.data.thoiGianKyHopDong,
                thoiGianBatDau: s.data.thoiGianBatDau,
                thoiGianKetThuc: s.data.thoiGianKetThuc,
                dinhKem: s.data.dinhKem,
                dmBoPhanId: s.data.nhanVien.dmBoPhanId,
                dmLoaiHopDongId: s.data.dmLoaiHopDongId,
              });
              resolve(s.data);
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp", "danger");
              reject(s);
            } else {
              snackbar.show("Không tìm thấy kết quả phù hợp", "danger");
            }
          })
          .catch((e) => {
            reject();
          });
      });
    },
  }),
};
