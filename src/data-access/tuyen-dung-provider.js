import constants from "resources/strings";
import client from "utils/client-utils";

export default {
  search(param) {
    const { page, size, ten, nguoiLienHe, diaChi } = param;
    let url = constants.api.dmnguontuyendung;
    url += "?page=" + (page - 1 || 0);
    if (size) {
      url += "&size=" + size;
    }
    if (ten) {
      url += "&ten=" + ten;
    }
    if (diaChi) {
      url += "&diaChi=" + diaChi;
    }
    if (nguoiLienHe) {
      url += "&nguoiLienHe" + nguoiLienHe;
    }
    return client.requestApi("get", url, {});
  },
  getById(id) {
    let url = constants.api.dmnguontuyendung + "/" + id;
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = constants.api.dmnguontuyendung;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  deleteItem(id) {
    let url = constants.api.dmnguontuyendung + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
