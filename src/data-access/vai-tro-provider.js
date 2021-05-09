import constants from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param) {
    const { page, size, ten } = param;
    let url = constants.api.dmvaitro;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (ten) {
      url += "&ten=" + ten;
    }
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = constants.api.dmvaitro;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = constants.api.dmvaitro + "/" + id;
    return client.requestApi("delete", url, {});
  },
  getById(id) {
    let url = constants.api.dmvaitro + "/" + id;
    return client.requestApi("get", url, {});
  },
  getTypeTimekeeping() {
    const url = constants.api.enums + '?name=LoaiChamCong';
    return client.requestApi("get", url, {});
  }
};
