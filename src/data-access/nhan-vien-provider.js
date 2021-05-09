import client from "utils/client-utils";
import constants from "resources/strings";
var md5 = require("md5");
export default {
  getById(id) {
    let url = constants.api.dmNhanvien + "/" + id;
    return client.requestApi("get", url, {});
  },
  search(param) {
    const {
      page,
      size,
      ten,
      thoiGianBatDauLamViec,
      dmChuyenMonId,
      dmBoPhanId,
      email,
    } = param;
    let url = constants.api.dmNhanvien;
    url += "?page=" + (page - 1 || 0) + "&";
    url += "size=" + (size || 10);
    if (ten) url += "&ten=" + ten;
    if (thoiGianBatDauLamViec)
      url += "&thoiGianBatDauLamViec=" + thoiGianBatDauLamViec;
    if (dmChuyenMonId) url += "&dmChuyenMonId=" + dmChuyenMonId;
    if (dmBoPhanId) url += "&dmBoPhanId=" + dmBoPhanId;
    if (email) url += "&email=" + email;
    return client.requestApi("get", url, {});
  },
  createOrEdit(param, id) {
    let url = constants.api.dmNhanvien;
    if (id) {
      url += "/" + id;
      return client.requestApi("put", url, param);
    } else {
      return client.requestApi("post", url, param);
    }
  },
  delete(id) {
    let url = constants.api.dmNhanvien + "/" + id;
    return client.requestApi("delete", url, {});
  },
  resetPassword(id) {
    let url = constants.api.dmNhanvien + "/dat-lai-mat-khau/" + id;
    return client.requestApi("put", url, {});
  },
  changePassword(matKhau, matKhauMoi, id) {
    const param = {
      matKhau: md5(matKhau),
      matKhauMoi: md5(matKhauMoi),
    };
    let url = constants.api.dmNhanvien + "/doi-mat-khau/" + id;
    return client.requestApi("put", url, param);
  },
};
