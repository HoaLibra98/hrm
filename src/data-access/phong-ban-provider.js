import strings from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param) {
    const { page, size, ten, mota, nhanVienPhuTrachId } = param;
    let url = strings.api.dmBoPhan;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (ten) url += "&ten=" + ten;
    if (mota) url += "&mota=" + mota;
    if (nhanVienPhuTrachId) url += "&nhanVienPhuTrachId=" + nhanVienPhuTrachId;
    return client.requestApi("get", url, {});
  },
  getById(id) {
    let url = strings.api.dmBoPhan + "/" + id;
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.dmBoPhan;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = strings.api.dmBoPhan + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
