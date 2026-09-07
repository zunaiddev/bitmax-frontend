import ApiResponse from "../api/ApiResponse.ts";
import {publicApi} from "../api/api.ts";
import axios from "axios";
import getToken from "../utils/getToken.ts";

class UserService {
    async getUser() {
        const token = getToken();

        if (!token) {
            return ApiResponse.error({
                status: 0,
                code: "NO_TOKEN",
                message: "User not logged in",
                details: null,
            })
        }

        try {
            const response =
                await publicApi.get("/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return ApiResponse.success(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return ApiResponse.error(err);
            }

            return ApiResponse.error({
                status: 0,
                code: "UNKNOWN_ERROR",
                message: err instanceof Error ? err.message : "Unknown Error",
                details: err,
            });
        }

    }

    async getSessions() {
        const token = getToken();

        if (!token) {
            return ApiResponse.error({
                status: 0,
                code: "NO_TOKEN",
                message: "User not logged in",
                details: null,
            })
        }

        try {
            const response =
                await publicApi.get("/user/sessions", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return ApiResponse.success(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return ApiResponse.error(err);
            }

            return ApiResponse.error({
                status: 0,
                code: "UNKNOWN_ERROR",
                message: err instanceof Error ? err.message : "Unknown Error",
                details: err,
            });
        }
    }
}

export default new UserService();