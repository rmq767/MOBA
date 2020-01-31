import axios from "axios";
import Vue from "vue";
import router from "./router/index";

const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
});

// 请求拦截
http.interceptors.request.use(
    config => {
        if (localStorage.token) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            if (localStorage.token) {
                config.headers.authorization = "Bearer " + localStorage.token; //请求头加上token
            }
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 响应拦截
http.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response.data.message) {
            Vue.prototype.$message({
                type: "error",
                message: err.response.data.message //这是后台re.send({message:''})里面的数据
            });
        }
        if (err.response.status == 401) {
            router.push("/login");
        }
        return Promise.reject(err);
    }
);

export default http;