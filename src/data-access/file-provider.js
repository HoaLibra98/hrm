import constants from "resources/strings";
import clientUtils from "utils/client-utils";

export default {
  upload(image, item) {
    let url = "";
    if (item === "employee") {
      url += constants.api.dmNhanvien + "/anh-dai-dien";
    }
    if (item === "news") {
      url += constants.api.adTinTuc + "/anh";
    }

    return new Promise((resolve, reject) => {
      clientUtils
        .uploadImage(url, image)
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  uploadFile(file, item) {
    let url = "";
    if (item === "employee") {
      url += constants.api.dmNhanvien + "/cv";
    }
    if (item === "contract") {
      url += constants.api.nvHopDongLaoDong + "/hop-dong";
    }
    return new Promise((resolve, reject) => {
      clientUtils
        .uploadImage(url, file)
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
