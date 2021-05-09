import strings from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param = {}) {
    let url = strings.api.adTinTuc;
    const { size, page, ten, ngayHoatDong } = param;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (ten) {
      url += "&tieuDe=" + ten;
    }
    if (ngayHoatDong) {
      url += "&ngayCongBo=" + ngayHoatDong;
    }
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = strings.api.adTinTuc;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = strings.api.adTinTuc + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
