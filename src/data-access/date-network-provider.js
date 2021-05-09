import axios from "axios";


export default {
    getDateAsiaHCM() {
        return new Promise(function (resolve, reject) {
            axios
                .get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
};
