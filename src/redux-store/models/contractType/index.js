import loaiHopDongProvider from "data-access/dm-loai-hop-dong-provider";
import snackbar from "utils/snackbar-utils";
export default {
  state: {
    listContractType: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadContractType: async (payload = {}, state) => {
      let size = payload.size || 10;
      let page = payload.page || 1;
      let ten = state.contractType.tenSearch;
      let param = { size, page, ten };
      let res = await loaiHopDongProvider.search(param);
      const { code, message, data, totalElements } = res;
      if (code !== 0) {
        snackbar.show("Lấy danh sách loại hợp đồng thất bại!", "danger");
        throw new Error(message);
      }
      dispatch.contractType.updateData({
        listContractType: data,
        total: totalElements || size,
      });
    },
    onSizeChange: (payload) => {
      dispatch.contractType.updateData({ size: payload });
      dispatch.contractType.loadContractType({ size: payload, page: 1 });
    },
    onPageChange: (payload, state) => {
      let size = state.contractType.size;
      dispatch.contractType.updateData({ page: payload, size: size });
      dispatch.contractType.loadContractType();
    },
    createOrEdit: async (payload, state) => {
      const { id, param } = payload;
      return new Promise((resolve, reject) => {
        loaiHopDongProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s.code === 0) {
              dispatch.contractType.updateData({
                id: "",
                ten: "",
                ghiChu: "",
              });
              if (id) {
                snackbar.show("Cập nhật loại hợp đồng thành công!", "success");
              } else {
                snackbar.show("Thêm mới loại hợp đồng thành công!", "success");
              }
              dispatch.contractType.loadContractType();
              resolve(s.data);
            } else if (s.code === 1301) {
              snackbar.show(`Tên ${param.ten} đã tồn tại`, "danger");
            } else if (s.code === 602) {
              snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
              dispatch.contractType.updateData({
                id: "",
                ten: "",
                ghiChu: "",
              });
              dispatch.contractType.loadContractType();
              reject();
            } else {
              if (id) {
                snackbar.show(
                  "Cập nhật loại hợp đồng không thành công",
                  "danger"
                );
              } else {
                snackbar.show(
                  "Thêm mới loại hợp đồng không thành công",
                  "danger"
                );
              }
              reject();
            }
          })
          .catch((e) => {
            if (id) {
              snackbar.show(
                "Cập nhật loại hợp đồng không thành công",
                "danger"
              );
            } else {
              snackbar.show(
                "Thêm mới loại hợp đồng không thành công",
                "danger"
              );
            }
            reject();
          });
      });
    },
  }),
};
