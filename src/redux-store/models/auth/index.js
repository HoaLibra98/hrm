import userProvider from "data-access/user-provider";
import clientUtils from "utils/client-utils";
import snackbar from "utils/snackbar-utils";
export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) {
          data = JSON.parse(data);
          clientUtils.auth = "Bearer " + data.access_token;
          return data;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLogin: (param) => {
      const { matKhau, taiKhoan } = param;
      return new Promise((resolve, reject) => {
        if (!matKhau || !taiKhoan) {
          snackbar.show("Thông tin tài khoản không đúng", "danger");
          return;
        }
        userProvider
          .login(matKhau, taiKhoan)
          .then((res) => {
            switch (res.code) {
              case 0:
                localStorage.setItem("auth", JSON.stringify(res?.data));
                clientUtils.auth = "Bearer " + res?.access_token;
                dispatch.auth.updateData({
                  auth: res.data,
                });
                snackbar.show("Đăng nhập thành công", "success");
                resolve(res);
                return;
              default:
                snackbar.show(
                  res.message || "Đăng nhập không thành công",
                  "danger"
                );
                reject("Đăng nhập không thành công");
            }
          })
          .catch((e) => {
            snackbar.show("Đăng nhập không thành công", "danger");
            reject(e);
          });
      });
    },
    onLogout: () => {
      dispatch.auth.updateData({
        auth: null,
        detail: null,
      });
      clientUtils.auth = null;
    },
    checkRole: (payload, state) => {
      let auth = state.auth.auth;
      if (auth && auth.id) {
        let checkRole = (auth.authorities || []).includes("ROLE_Manager");
        dispatch.auth.updateData({
          checkRole,
        });
      }
    },
  }),
};
