import strings from "resources/strings";
import client from "utils/client-utils";
export default {
  search(param = {}) {
    let url = strings.api.lamNgoaiGio;
    const { page, size, nhanVienId, trangThai, thoiGianBatDau, sort } = param;
    url += "?page=" + (page - 1 || 0);
    url += "&size=" + (size || 10);
    if (nhanVienId) {
      url += "&nhanVienId=" + nhanVienId;
    }
    if(thoiGianBatDau) url += "&thoiGianBatDau=" + thoiGianBatDau;
    if (trangThai !== undefined && trangThai !== null && trangThai !== "") {
      url += "&trangThai=" + trangThai;
    }
    if (sort) {
      url += "&sort=" + sort;
    }
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.lamNgoaiGio;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  approval(param, id) {
    let url = strings.api.lamNgoaiGio + `/${id}/duyet`;
    return client.requestApi("put", url, param);
  },
  delete(id) {
    let url = strings.api.lamNgoaiGio + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
