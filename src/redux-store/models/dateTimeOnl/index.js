import dateTimeNetwork from "data-access/date-network-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
import moment from "moment";
import { get } from "lodash";

export default {
    state: {
        datetime: null,
        dateFormat: null,
        timeFormat: null
    },
    reducers: {
        updateData(state, payload = {}) {
            return { ...state, ...payload };
        },
    },
    effects: (dispatch) => ({
        getDateNetwork: async () => {
            await dateTimeNetwork.getDateAsiaHCM().then((s) => {

                if (s && get(s, 'datetime')) {
                    dispatch.dateTimeOnl.updateData({
                        datetime: get(s, 'datetime'),
                        dateFormat: moment(get(s, 'datetime')).format("YYYY-MM-DD"),
                        timeFormat: moment(get(s, 'datetime')).format("HH:mm:ss"),
                    });
                } else {
                    snackbar.show(
                        "Kiểm tra lại kết nối mạng !",
                        "danger"
                    );
                }
            });
        },
    }),
};
