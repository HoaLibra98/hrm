import tinTucProvider from "data-access/ad-tin-tuc-provider";
import snackbar from "utils/snackbar-utils";
import { Modal } from "antd";
import moment from "moment";
const { confirm } = Modal;

export default {
  state: {
    listNews: [],
  },
  reducers: {
    updateData(state, paylad = {}) {
      return { ...state, ...paylad };
    },
  },
  effects: (dispatch) => ({
    loadNews: async (paylad, state) => {
      let size = state.news.size || 10;
      let page = state.news.page || 1;
      let ten = state.news.ten;
      let ngayHoatDong =
        state.news.ngayHoatDong &&
        moment(state.news.ngayHoatDong).format("YYYY-MM-DD");
      let res = await tinTucProvider.search({ page, size, ten, ngayHoatDong });
      const { code, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách tin tức không thành công!", "danger");
      }
      dispatch.news.updateData({
        listNews: data,
        total: totalElements || size,
      });
    },
    onReset: () => {
      dispatch.news.updateData({
        page: 1,
        size: 10,
        id: "",
        tieuDe: "",
        noiDung: "",
        dinhKem: "",
        checkValidate: false,
        ngayCongBo: new Date(),
        ten: "",
        ngayHoatDong: null,
      });
    },
    createOrEdit: (payload) => {
      const { param, id } = payload;
      return new Promise((resolve, reject) => {
        tinTucProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.news.onReset();
              if (id) {
                snackbar.show("Cập nhật tin tức thành công!", "success");
              } else {
                snackbar.show("Thêm mới tin tức thành công!", "success");
              }
              dispatch.news.loadNews();
              resolve(s.data);
            } else {
              if (id) {
                snackbar.show("Cập nhật tin tức không thành công!", "danger");
              } else {
                snackbar.show("Thêm mới tin tức không thành công!", "danger");
              }
              reject();
            }
          })
          .catch((e) => {
            if (id) {
              snackbar.show("Cập nhật tin tức không thành công!", "danger");
            } else {
              snackbar.show("Thêm mới tin tức không thành công!", "danger");
            }
            reject();
          });
      });
    },
    deleteItem: (payload) => {
      return new Promise((resolve, reject) => {
        confirm({
          okType: "danger",
          okText: "Xóa",
          cancelText: "Hủy",
          title: "Xác nhận",
          content: `Bạn có muốn xóa tin tức "${payload.tieuDe}"`,
          onOk() {
            tinTucProvider
              .delete(payload.id)
              .then((s) => {
                if (s.code === 0) {
                  snackbar.show("Xóa tin tức thành công!", "success");
                  dispatch.news.loadNews();
                  resolve(s);
                } else if (s.code === 602) {
                  snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
                  dispatch.news.loadNews();
                  reject();
                } else {
                  snackbar.show("Xóa tin tức không thành công!", "danger");
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show(
                  e.message || "Xóa tin tức không thành công!",
                  "danger"
                );
                reject();
              });
          },
        });
      });
    },
    onSizeChange: (payload) => {
      dispatch.news.updateData({ size: payload, page: 1 });
      dispatch.news.loadNews();
    },
    onPageChange: (payload) => {
      dispatch.news.updateData({ page: payload });
      dispatch.news.loadNews();
    },
  }),
};
