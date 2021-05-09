import client from "utils/client-utils";
import constants from "resources/strings";

export default {
  search(param) {
    const { page, size } = param;
    let url = constants.api.thongBao;
    if (page) url += "?page=" + (page - 1 || 0);
    if (size) url += "&size=" + (size || 10);
    client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = constants.api.thongBao;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
};
