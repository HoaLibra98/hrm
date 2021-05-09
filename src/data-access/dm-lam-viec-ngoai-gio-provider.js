import constants from "resources/strings";
import client from "utils/client-utils";

export default {
    search(param) {
        const { page, size, ten } = param;
        let url = constants.api.lam_ngoai_gio;
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
        let url = constants.api.lam_ngoai_gio;
        if (!id) {
            return client.requestApi("post", url, param);
        } else {
            url += "/" + id;
            return client.requestApi("put", url, param);
        }
    },
    deleteItem(id) {
        let url = constants.api.lam_ngoai_gio + "/" + id;
        return client.requestApi("delete", url, {});
    },
};
