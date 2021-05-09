import constants from "../resources/strings";
import clientUtils from "../utils/client-utils";
var md5 = require('md5');

export default {
  login(matKhau, taiKhoan) {
    let object = {
      matKhau: md5(matKhau),
      taiKhoan,
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.login, object)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
