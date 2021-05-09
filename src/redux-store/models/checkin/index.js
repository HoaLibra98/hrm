import checkinProvider from "data-access/nv-cham-cong-provider";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
export default {
  state: {
    listCheckin: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadCheckin: async (payload, state) => {
      let res = await checkinProvider.search(payload);
      let { code, message, data, totalElements } = res;
      if (code !== 0) {
        throw new Error(res);
      }
      dispatch.checkin.updateData({ listCheckin: data, total: totalElements });
    },
    onReset: (datetime) => {
      dispatch.checkin.updateData({
        thoiGian: datetime ? moment(datetime) : moment(new Date()),
        nhanVienId: undefined,
        checkValidate: false,
        thoiGianBatDau: undefined,
        thoiGianKetThuc: moment(new Date()),
        khuVucChamCongId: undefined,
      });
    },
    create: (payload, state) => {
      return new Promise((resolve, reject) => {
        checkinProvider
          .createOrEdit(payload)
          .then((s) => {
            if (s.code === 0) {
              snackbar.show("Chấm công thành công", "success");
              dispatch.checkin.onReset();
              resolve(s.data);
            } else if (s.code === 401) {
              localStorage.clear();
              window.location.href = "/login";
            } else {
              snackbar.show("Chấm công không thành công", "danger");
              reject();
            }
          })
          .catch((e) => {
            snackbar.show(e.message || "Chấm công không thành công", "danger");
            reject();
          });
      });
    },
    exportDate: async (payload, state) => {

      if (!payload.tuNgay && !payload.denNgay) return

      const param = `?tuNgay=${moment(payload.tuNgay).format("DD-MM-YYYY")}&denNgay=${moment(payload.denNgay).format("DD-MM-YYYY")}`;
      const tng = moment(payload.tuNgay).format("DD-MM-YYYY") === moment(payload.denNgay).format("DD-MM-YYYY");
      // let date = !!payload && payload.format("YYYY-MM-DD");
      const res = await checkinProvider.exportDate(param);
      const { code, data, message } = res;
      if (code === 0) {
        const save = document.createElement("a");
        save.href = data.doc.absoluteFileUrl();
        save.download = `Báo cáo chấm công ${tng ? 'ngày ' +payload.tuNgay.format("DD-MM-YYYY") :`Từ ngày ${payload.tuNgay.format("DD-MM-YYYY")} Đến ngày ${payload.denNgay.format("DD-MM-YYYY")} ` }`;
        save.style = "display:none;opacity:0;color:transparent;";
        (document.body || document.documentElement).appendChild(save);
        save.click();
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      } else {
        snackbar.show(message, "danger");
      }
      dispatch.checkin.updateData({
        onExport: false,
      });
      throw new Error(res);
    },
  }),
};
