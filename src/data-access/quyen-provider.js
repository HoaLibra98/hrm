import constants from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param) {
    const { page, size, ten, ma } = param;
    let url = constants.api.dmquyen;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (ten) {
      url += "&ten=" + ten;
    }
    if (ma) {
      url += "&ma=" + ma;
    }
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = constants.api.dmquyen;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = constants.api.dmquyen + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
