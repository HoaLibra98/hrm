import client from "utils/client-utils";
import strings from "resources/strings";

export default {
  search(param = {}) {
    let url = strings.api.nvChamCong.search;
    const { page, size, nhanVienId, thoiGianBatDauSearch, thoiGianKetThucSearch } = param;
    url += "?page=" + (page - 1 || 0);
    url += "&size=" + (size || 10);
    if (nhanVienId) {
      url += "&nhanVienId=" + nhanVienId;
    }
    if (thoiGianBatDauSearch && thoiGianKetThucSearch) {
      url += "&thoiGianBatDau=" + thoiGianBatDauSearch;
      url += "&thoiGianKetThuc=" + thoiGianKetThucSearch;
    }
    return client.requestApi("get", url, {});
  },
  createOrEdit(param) {
    let url = strings.api.nvChamCong.createOrEdit;
    return client.requestApi("post", url, param);
  },
  exportDate(param) {
    let url = strings.api.nvChamCong.exportDate;
    if (!param) return;
    url += param;
    return client.requestApi("get", url, {});
  },
};
