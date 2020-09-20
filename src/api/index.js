import axios from "axios";
export const apiUrl = "https://reviewphim.herokuapp.com";
const api = axios.create({
    baseURL: `${apiUrl}/api`,
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    config.headers.token = token ? token : "";
    config.headers.is_client_side = true;
    config["Content-Type"] = "application/json";

    return config;
});

const BaseApi = () => {
    return {
        async get(endpoint) {
            try {
                const { status, data } = await api.get(endpoint);
                return { status, data };
            } catch (error) {
                const { status, data } = error.response;
                return { status, data };
            }
        },

        async post(endpoint, body, contentType) {
            try {
                const { status, data } = await api.post(
                    endpoint,
                    body,
                    contentType === "formData" && { headers: { "content-type": "multipart/form-data" } }
                );
                return { status, data };
            } catch (error) {
                const { status, data } = error.response;
                return { status, data };
            }
        },
        async put(endpoint, body) {
            try {
                const { status, data } = await api.put(endpoint, body);
                return { status, data };
            } catch (error) {
                const { status, data } = error.response;
                return { status, data };
            }
        },
        async patch(endpoint, body) {
            try {
                const { status, data } = await api.patch(endpoint, body);
                return { status, data };
            } catch (error) {
                const { status, data } = error.response;
                return { status, data };
            }
        },
        async delete(endpoint) {
            try {
                const { status, data } = await api.delete(endpoint);
                return { status, data };
            } catch (error) {
                const { status, data } = error.response;
                return { status, data };
            }
        },
    };
};

export default BaseApi;
