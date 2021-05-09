import strings from "resources/strings";
import client from "utils/client-utils";
export default {
  search(param = {}) {
    let url = strings.api.nvNgayNghi;
    const { page, size, nhanVienId, trangThai, ngayNghi, dmBoPhanId, sort } = param;
    url += "?page=" + (page - 1 || 0);
    url += "&size=" + (size || 10);
    if (nhanVienId) {
      url += "&nhanVienId=" + nhanVienId;
    }
    if (trangThai !== undefined && trangThai !== null)
      url += "&trangThai=" + trangThai;
    if (ngayNghi) url += "&ngayNghi=" + ngayNghi;
    if (dmBoPhanId) url += "&dmBoPhanId=" + dmBoPhanId;
    if (sort) {
      url += "&sort=" + sort;
    }
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.nvNgayNghi;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  approval(param, id) {
    let url = strings.api.nvNgayNghi + `/${id}/duyet`;
    return client.requestApi("put", url, param);
  },
  delete(id) {
    let url = strings.api.nvNgayNghi + "/" + id;
    return client.requestApi("delete", url, {});
  },
  getTypeDayOff() {
    const url = strings.api.enums + '?name=LoaiNgayNghi';
    return client.requestApi("get", url, {});
  }
};
