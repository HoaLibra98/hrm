import strings from "resources/strings";
import client from "utils/client-utils";
export default {
  search(param = {}) {
    let url = strings.api.dmLoaiHopDong;
    const { page, size, ten } = param;
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
    let url = strings.api.dmLoaiHopDong;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
};
