import axios from "axios";
import ApiResponse from "../api/ApiResponse.ts";
import {publicApi} from "../api/api.ts";

class AuthService {
    async login(email: string, password: string): Promise<ApiResponse> {
        try {
            const response = await publicApi.post("/auth/login", {email, password});
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

    async sendEmailOrPhoneOtp(email: string | undefined, phone: string | undefined): Promise<ApiResponse> {
        const URI: string = email ? "email" : "phone";

        try {
            const response = await publicApi.post(`/auth/resend-${URI}-otp`, {email, phone});
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

    async verifyOtp(URI: string, email: string | undefined, phone: string | undefined, otp: string): Promise<ApiResponse> {
        try {
            const response =
                await publicApi.post(`/auth/verify-${URI}`, {email, phone, otp});
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

    async loginWithOtp(): Promise<ApiResponse> {
        return ApiResponse.success(null);
    }
}

export default new AuthService();
