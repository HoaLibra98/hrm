import tuyenDungProvider from "data-access/tuyen-dung-provider";
import snackbar from "utils/snackbar-utils";
import { Modal } from "antd";
const { confirm } = Modal;
export default {
  state: {
    listRecruitment: [],
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadRecruitment: async (payload = {}, state) => {
      let size = state.recruitment.size || 10;
      let page = state.recruitment.page || 1;
      let ten = state.recruitment.tenSearch;
      let diaChi = state.recruitment.diaChiSearch;
      let nguoiLienHe = state.recruitment.nguoiLienHeSearch;
      let res = await tuyenDungProvider.search({
        size,
        page,
        ten,
        nguoiLienHe,
        diaChi,
      });
      let { code, message, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách nguồn tuyển dụng thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.recruitment.updateData({
        listRecruitment: data,
        total: totalElements,
      });
    },
    onSizeChange: async (payload) => {
      dispatch.recruitment.updateData({
        size: payload,
      });
      dispatch.recruitment.loadRecruitment();
    },
    onPageChange: async (payload) => {
      dispatch.recruitment.updateData({ page: payload });
      dispatch.recruitment.loadRecruitment();
    },
    createOrEdit: async (payload) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        tuyenDungProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              if (id) {
                snackbar.show(
                  "Cập nhật nguồn tuyển dụng thành công",
                  "success"
                );
              } else {
                snackbar.show(
                  "Thêm mới nguồn tuyển dụng thành công",
                  "success"
                );
              }
              dispatch.recruitment.updateData({
                ten: "",
                soDienThoai: "",
                diaChi: "",
                website: "",
                nguoiLienHe: "",
                gia: "",
                soLuongNhanVien: "",
              });
              dispatch.recruitment.loadRecruitment();
              resolve(s.data);
            } else if (s.code === 1301) {
              snackbar.show(`Tên ${param.ten} đã tồn tại`, "danger");
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              dispatch.recruitment.updateData({
                ten: "",
                soDienThoai: "",
                diaChi: "",
                website: "",
                nguoiLienHe: "",
                gia: "",
                soLuongNhanVien: "",
              });
              dispatch.recruitment.loadRecruitment();
              reject(s);
            } else {
              if (id) {
                snackbar.show(
                  "Cập nhật nguồn tuyển dụng không thành công",
                  "danger"
                );
              } else {
                snackbar.show(
                  "Thêm mới nguồn tuyển dụng không thành công",
                  "danger"
                );
              }
            }
          })
          .catch((e) => {
            if (id) {
              snackbar.show(
                "Cập nhật nguồn tuyển dụng không thành công",
                "danger"
              );
            } else {
              snackbar.show(
                "Thêm mới nguồn tuyển dụng không thành công",
                "danger"
              );
            }
            reject();
          });
      });
    },
    getDetail: async (payload) => {
      return new Promise((resolve, reject) => {
        tuyenDungProvider
          .getById(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.recruitment.updateData({
                ten: s.data.ten,
                soDienThoai: s.data.soDienThoai,
                diaChi: s.data.diaChi,
                website: s.data.website,
                nguoiLienHe: s.data.nguoiLienHe,
                gia: s.data.gia,
                soLuongNhanVien: s.data.soLuongNhanVien,
                soTien: s.data.soTien,
              });
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp", "danger");
              reject(s);
            } else {
              snackbar.show("Xảy ra lỗi vui lòng thử lại sau", "danger");
            }
          })
          .catch((e) => {
            reject();
          });
      });
    },
    onDeleteItem: async (payload) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn xóa ${payload.ten}`,
          okType: "danger",
          okText: "Xóa",
          cancelText: "Hủy",
          onOk() {
            tuyenDungProvider
              .deleteItem(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  snackbar.show("Xóa nguồn tuyển dụng thành công!", "success");
                  dispatch.recruitment.loadRecruitment();
                  resolve(s);
                } else if (s.code === 602) {
                  snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
                  dispatch.recruitment.loadRecruitment();
                  reject();
                } else {
                  snackbar.show("Xảy ra lõi vui lòng thử lại sau!", "danger");
                }
              })
              .catch((e) => {
                snackbar.show(
                  "Xóa nguồn tuyển dụng không thành công!",
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
