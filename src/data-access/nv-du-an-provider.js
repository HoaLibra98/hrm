import strings from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param) {
    const { page, size, nhanVienId } = param;
    let url = strings.api.nvDuAn;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (nhanVienId) {
      url += "&nhanVienId=" + nhanVienId;
    }
    return client.requestApi("get", url, {});
  },
  getById(id) {
    let url = strings.api.nvDuAn + "/" + id;
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.nvDuAn + "/batch";
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = strings.api.nvDuAn + "/" + id;
    return client.requestApi("delete", url, {});
  },
  deleteMore(param) {
    let url = strings.api.nvDuAn + "/batch";
    return client.requestApi("delete", url, param);
  },
};
