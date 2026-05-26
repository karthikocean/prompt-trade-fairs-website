import axios from "axios";

const APP_ENV = import.meta.env.VITE_APP_ENV || "dev";

let IMAGE_BASE_URL = "";
let BASE_URL = "";
let server = "";

switch (APP_ENV) {
    case "dev":
        IMAGE_BASE_URL = "http://192.168.1.17:2001/public";
        BASE_URL = "http://192.168.1.17:2001/api/website";
        server = "http://192.168.1.17:2001";
        break;

    case "production":
        IMAGE_BASE_URL = "http://13.126.146.21:4000/public";
        BASE_URL = "http://13.126.146.21:4000/api/website";
        server = "http://13.126.146.21:4000";
        break;

    case "local":
    default:
        IMAGE_BASE_URL = "http://localhost:5001/public";
        BASE_URL = "http://localhost:5001/api/website";
        server = "http://localhost:5001";
        break;
}

const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
    function (config) {
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${IMAGE_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export {
    IMAGE_BASE_URL,
    BASE_URL,
    server,
    apiClient,
    apiClient as api,
    apiClient as clientApi,
    BASE_URL as API_URL,
    BASE_URL as CLIENT_API_URL,
    getImageUrl
};

export default apiClient;
