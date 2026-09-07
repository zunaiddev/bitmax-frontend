import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL ?? "";

const publicApi = axios.create({
    baseURL: BASE_URL,
});

export {publicApi};