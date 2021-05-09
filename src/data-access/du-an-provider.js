import strings from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param) {
    const { page, size, ten, nhanVienPhuTrachId, active } = param;
    let url = strings.api.dmDuAn;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (ten) url += "&ten=" + ten;
    if (active) url += "&active=" + active;
    if (nhanVienPhuTrachId) url += "&nhanVienPhuTrachId=" + nhanVienPhuTrachId;
    return client.requestApi("get", url, {});
  },
  getById(id) {
    let url = strings.api.dmDuAn + "/" + id;
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.dmDuAn;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = strings.api.dmDuAn + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
