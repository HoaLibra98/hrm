import nhanVienProvider from "data-access/nhan-vien-provider";
import { message, Modal } from "antd";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
const { confirm } = Modal;
export default {
  state: {
    listEmployee: [],
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    loadEmployee: async (payload, state) => {
      let size = state.employee.size || 10;
      let page = payload || 1;
      let ten = state.employee.hoVaTenSearch;
      let thoiGianBatDauLamViec =
        state.employee.tgLamViecSearch &&
        moment(state.employee.tgLamViecSearch._d).format("YYYY-MM-DD");
      let dmChuyenMonId = state.employee.chuyenMonSearch;
      let dmBoPhanId = state.employee.boPhanSearch;
      let email = state.employee.emailSearch;
      let res = await nhanVienProvider.search({
        page,
        size,
        ten,
        thoiGianBatDauLamViec,
        email,
        dmChuyenMonId,
        dmBoPhanId,
      });
      let { code, data, totalElements, message } = res || {};
      if (code === 0) {
        dispatch.employee.updateData({
          listEmployee: data,
          total: totalElements || size,
        });
      } else {
        throw new Error(message);
      }
    },
    getAllEmployee: async (payload, state) => {
      let res = await nhanVienProvider.search({
        page: 1,
        size: 1000,
      });
      let { code, data, totalElements, message } = res || {};
      if (code === 0) {
        dispatch.employee.updateData({
          listEmployeeAll: data,
        });
      } else {
        throw new Error(message);
      }
    },
    onSizeChange: (payload) => {
      dispatch.employee.updateData({ size: payload, page: 1 });
      dispatch.employee.loadEmployee(1);
    },
    getDetail: async (payload, state) => {
      await nhanVienProvider.getById(payload).then((s) => {
        if (s && s.code === 0 && s.data) {
          dispatch.employee.updateData({
            ten: s.data.ten,
            thoiGianBatDauLamViec: s.data.thoiGianBatDauLamViec,
            thoiGianKetThucLamViec: s.data.thoiGianKetThucLamViec,
            isofhEmail: s.data.isofhEmail,
            matKhau: s.data.matKhau,
            email: s.data.email,
            soDienThoai: s.data.soDienThoai,
            trangThai: s.data.trangThai,
            dmChuyenMonId: s.data.dmChuyenMonId || undefined,
            dmChuyenMon: s.data.dmChuyenMon,
            dmBoPhanId: s.data.dmBoPhanId || undefined,
            dmBoPhan: s.data.dmBoPhan,
            dmNguonTuyenDungId: s.data.dmNguonTuyenDungId || undefined,
            dmNguonTuyenDung: s.data.dmNguonTuyenDung,
            gioiTinh: s.data.gioiTinh,
            soCanCuoc: s.data.soCanCuoc,
            ngayCapCanCuoc: s.data.ngayCapCanCuoc,
            noiCapCanCuoc: s.data.noiCapCanCuoc,
            diaChiHienTai: s.data.diaChiHienTai,
            diaChiTamTru: s.data.diaChiTamTru,
            truongDaoTao: s.data.truongDaoTao,
            chuyenNganh: s.data.chuyenNganh,
            cv: s.data.cv,
            nvHopDongLaoDong: s.data.nvHopDongLaoDong,
            maSoThue: s.data.maSoThue,
            soNgayPhep: s.data.soNgayPhep,
            dmVaiTro: s.data.dmVaiTro,
            dmVaiTroIds:
              s.data.dmVaiTro &&
              s.data.dmVaiTro.length &&
              s.data.dmVaiTro.reduce((arr, item) => [...arr, item.id], []),
            qr: s.data.qr,
            ngaySinh: s.data.ngaySinh,
            anhDaiDien: s.data.anhDaiDien,
            taiKhoan: s.data.taiKhoan,
            mucLuong: s.data.mucLuong,
            soNgayPhepConLai: s.data.soNgayPhepConLai,
            soNgayDiLamTrongThang: s.data.soNgayDiLamTrongThang,
            soNgayPhepDaNghiTrongThang: s.data.soNgayPhepDaNghiTrongThang,
            soNgayDiMuonTrongThang: s.data.soNgayDiMuonTrongThang,
            tongSoNgayPhep: s.data.tongSoNgayPhep,
            soNgayPhepDaNghi: s.data.soNgayPhepDaNghi,
            ma: s.data.ma,
          });
        } else {
          snackbar.show(
            s.message || "Lấy chi tiết nhân viên không thành công",
            "danger"
          );
        }
      });
    },
    onReset: (payload, state) => {
      dispatch.employee.updateData({
        modalAssignProject: false,
        hoVaTenSearch: "",
        emailSearch: "",
        tgLamViecSearch: null,
        chuyenMonSearch: undefined,
        boPhanSearch: undefined,
        page: 1,
        size: 10,
        ten: "",
        thoiGianBatDauLamViec: "",
        thoiGianKetThucLamViec: "",
        isofhEmail: "",
        matKhau: "",
        email: "",
        soDienThoai: "",
        trangThai: "",
        dmChuyenMonId: undefined,
        dmChuyenMon: "",
        dmBoPhanId: undefined,
        dmBoPhan: "",
        dmNguonTuyenDungId: undefined,
        dmNguonTuyenDung: "",
        gioiTinh: undefined,
        soCanCuoc: "",
        ngayCapCanCuoc: undefined,
        noiCapCanCuoc: "",
        diaChiHienTai: "",
        diaChiTamTru: "",
        truongDaoTao: "",
        chuyenNganh: "",
        cv: "",
        nvHopDongLaoDong: "",
        maSoThue: "",
        soNgayPhep: "",
        dmVaiTroIds: "",
        taiKhoan: "",
        ngaySinh: null,
        anhDaiDien: "",
        mucLuong: "",
      });
      dispatch.department.updateData({
        page: 1,
        size: 1000,
      });
      dispatch.recruitment.updateData({
        page: 1,
        size: 1000,
      });
      dispatch.role.updateData({
        page: 1,
        size: 1000,
      });
      dispatch.specialize.updateData({
        page: 1,
        size: 1000,
      });
    },
    createOrEdit: (payload, state) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        nhanVienProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.employee.onReset();
              if (!id) {
                snackbar.show("Thêm mới nhân viên thành công", "success");
              } else {
                snackbar.show("Cập nhật nhân viên thành công", "success");
              }
              resolve(s);
              dispatch.employee.loadEmployee(1);
            } else if (s.code === 401) {
              localStorage.clear();
              window.location.href = "/login";
            } else if (s.code === 1407) {
              snackbar.show("isofhEmail đã tồn tại", "danger");
            } else {
              if (!id) {
                snackbar.show(
                  s.message || "Thêm mới nhân viên không thành công",
                  "danger"
                );
              } else {
                snackbar.show(
                  s.message || "Cập nhật nhân viên thành công",
                  "danger"
                );
              }
              reject();
            }
          })
          .catch((e) => {
            if (!id) {
              snackbar.show("Thêm mới nhân viên không thành công", "danger");
            } else {
              snackbar.show("Cập nhật nhân viên không thành công", "danger");
            }
            reject();
          });
      });
    },
    onDelete: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn xóa nhân viên ${payload.ten} này?`,
          okText: "Xóa",
          okType: "danger",
          cancelText: "Hủy",
          onOk() {
            nhanVienProvider
              .delete(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.employee.loadEmployee(1);
                  snackbar.show("Xóa nhân viên thành công", "success");
                  resolve();
                } else if (s.code === 401) {
                  localStorage.clear();
                  window.location.href = "/login";
                } else {
                  snackbar.show("Xóa nhân viên không thành công", "danger");
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show("Xóa nhân viên không thành công", "danger");
                reject();
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
    onResetPassword: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn reset mật khẩu tài khoản ${payload.taiKhoan} này?`,
          okText: "Xác nhận",
          cancelText: "Hủy",
          onOk() {
            nhanVienProvider
              .resetPassword(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  dispatch.employee.loadEmployee(1);
                  snackbar.show("Reset mật khẩu thành công", "success");
                  resolve();
                } else if (s.code === 401) {
                  localStorage.clear();
                  window.location.href = "/login";
                } else {
                  snackbar.show("Reset mật khẩu không thành công", "danger");
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show("Reset mật khẩu không thành công", "danger");
                reject();
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
    changePassword: (payload, state) => {
      const { matKhau, matKhauMoi, id } = payload;
      return new Promise((resolve, reject) => {
        nhanVienProvider
          .changePassword(matKhau, matKhauMoi, id)
          .then((s) => {
            if (s && s.code === 0) {
              snackbar.show("Thay đổi mật khẩu thành công", "success");
              resolve(s);
            } else {
              snackbar.show(
                s.message || "Thay đổi mật khẩu không thành công",
                "danger"
              );
              resolve(s);
            }
          })
          .catch((e) => {
            snackbar.show(
              e.message || "Thay đổi mật khẩu không thành công",
              "success"
            );
            reject(e);
          });
      });
    },
  }),
};
