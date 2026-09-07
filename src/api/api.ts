import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

const publicApi = axios.create({
    baseURL: "http://localhost:5000/api",
});

// const privateApi: AxiosInstance = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
// });

export {publicApi};