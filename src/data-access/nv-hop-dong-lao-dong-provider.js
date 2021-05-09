import client from "utils/client-utils";
import strings from "resources/strings";
export default {
  search(param = {}) {
    let url = strings.api.nvHopDongLaoDong;
    const {
      page,
      size,
      dmLoaiHopDongId,
      soHopDong,
      nhanVienId,
      dmBoPhanId,
      thoiGianKyHopDong,
    } = param;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (dmLoaiHopDongId) {
      url += "&dmLoaiHopDongId=" + dmLoaiHopDongId;
    }
    if (soHopDong) {
      url += "&soHopDong=" + soHopDong;
    }
    if (nhanVienId) {
      url += "&nhanVienId=" + nhanVienId;
    }
    if (dmBoPhanId) {
      url += "&dmBoPhanId=" + dmBoPhanId;
    }
    if (thoiGianKyHopDong) {
      url += "&thoiGianKyHopDong=" + thoiGianKyHopDong;
    }
    return client.requestApi("get", url, {});
  },
  getById(id) {
    let url = strings.api.nvHopDongLaoDong + "/" + id;
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.nvHopDongLaoDong;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
};
