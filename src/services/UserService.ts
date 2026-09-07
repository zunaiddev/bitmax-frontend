import ApiResponse from "../api/ApiResponse.ts";
import {publicApi} from "../api/api.ts";
import axios from "axios";
import getToken from "../utils/getToken.ts";

class UserService {
    async getUser(): Promise<ApiResponse> {
        return await this.#authenticatedGet("/user/me");
    }

    async getSessions(): Promise<ApiResponse> {
        return await this.#authenticatedGet("/user/sessions");
    }

    async logout(sessionId: string): Promise<void> {
        await this.#authenticatedGet(`/user/logout?sessionId=${sessionId}`);
        return;
    }

    async #authenticatedGet(url: string): Promise<ApiResponse> {
        const token = getToken();
        if (!token) {
            return ApiResponse.error({
                status: 0,
                code: "NO_TOKEN",
                message: "User not logged in",
                details: null,
            });
        }

        try {
            const response = await publicApi.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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