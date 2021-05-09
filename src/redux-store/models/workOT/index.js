import dmLamNgoaiGio from "data-access/dm-lam-viec-ngoai-gio-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
import { get } from "lodash";
const { confirm } = Modal;
export default {
    state: {
        listWorkOT: [],
    },

    reducers: {
        updateData(state, payload = {}) {
            return { ...state, ...payload };
        },
    },
    effects: (dispatch) => ({
        loadWorkOT: async (payload = {}, state) => {
            let size = (payload || {}).size ? (payload || {}).size : (state.workOT.size || 10);
            let page = (payload || {}).page ? (payload || {}).page : state.workOT.page || 1;
            let ten = state.workOT.tenSearch;
            let res = await dmLamNgoaiGio.search({ page, size, ten });
            let { code, message, data, totalElements } = res;
            if (code !== 0) {
                snackbar.show("Lấy danh sách làm ngoài giờ thất bại!", "danger");
                throw new Error(message);
            }
            dispatch.workOT.updateData({
                listWorkOT: data,
                total: totalElements || size,
            });
        },
        createOrEdit: (payload, state) => {
            const { id, param } = payload;
            return new Promise((resolve, reject) => {
                dmLamNgoaiGio
                    .createOrEdit(param, id)
                    .then((s) => {
                        if (s.code === 0) {
                            dispatch.workOT.updateData({
                                id: "",
                                ten: "",
                                ma: "",
                                soTien: ""
                            });
                            if (!id) {
                                snackbar.show("Thêm mới làm ngoài giờ thành công", "success");
                            } else {
                                snackbar.show("Cập nhật làm ngoài giờ thành công", "success");
                            }
                            dispatch.workOT.loadWorkOT();
                            resolve(s.data);
                        }
                        else if (s.code === 1301) {
                            snackbar.show(`Tên ${param.ten} đã tồn tại`, "danger");
                        } else if (s.code === 602) {
                            snackbar.show("Không tìm thấy kết quả phù hợp!", "danger");
                            dispatch.workOT.updateData({
                                id: "",
                                ten: "",
                                ma: "",
                                soTien: ""
                            });
                            dispatch.workOT.loadWorkOT();
                            reject();
                        } else {
                            if (!id) {
                                snackbar.show("Thêm mới làm ngoài giờ không thành công", "danger");
                            } else {
                                snackbar.show("Cập nhật làm ngoài giờ không thành công", "danger");
                            }
                            reject();
                        }
                    })
                    .catch((e) => {
                        if (!id) {
                            snackbar.show("Thêm mới làm ngoài giờ không thành công", "danger");
                        } else {
                            snackbar.show("Cập nhật làm ngoài giờ không thành công", "danger");
                        }
                        reject();
                    });
            });
        },
        deleteItem: (payload, state) => {
            return new Promise((resolve, reject) => {
                confirm({
                    title: "Xác nhận",
                    okType: "danger",
                    okText: "Xóa",
                    cancelText: "Hủy",
                    content: `Bạn có muốn xóa ${payload.ten}`,
                    onOk() {
                        dmLamNgoaiGio
                            .deleteItem(payload.id)
                            .then((s) => {
                                if (s.code === 0) {
                                    dispatch.workOT.loadWorkOT();
                                    snackbar.show("Xóa làm ngoài giờ thành công!", "success");
                                    resolve(s.data);
                                } else {
                                    snackbar.show("Xóa làm ngoài giờ không thành công!", "danger");
                                    reject();
                                }
                            })
                            .catch((e) => {
                                snackbar.show("Xóa làm ngoài giờ không thành công!", "danger");
                                reject();
                            });
                    },
                    onCancel() {
                        reject();
                    },
                });
            });
        },
        onSizeChange: async (payload) => {
            dispatch.workOT.updateData({
                size: payload,
                page: 1,
            });
            dispatch.workOT.loadWorkOT();
        },
        onPageChange: async (payload) => {
            dispatch.workOT.updateData({ page: payload });
            dispatch.workOT.loadWorkOT();
        },
    }),
};
