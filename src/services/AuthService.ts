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

    async verifyEmailOtp(email: string, otp: string): Promise<ApiResponse> {
        return await this.#post("/auth/verify-email", {email, otp});
    }

    async verifyPhoneOtp(phone: string, otp: string): Promise<ApiResponse> {
        return await this.#post("/auth/verify-phone", {phone, otp});
    }

    async requestLoginOtp(email: string): Promise<ApiResponse> {
        return this.#post("/auth/request-login-otp", {email});
    }

    async loginWithOtp(email: string, otp: string): Promise<ApiResponse> {
        return await this.#post("/auth/login-otp", {email, otp});
    }

    async signup(name: string, email: string, phone: string, password: string): Promise<ApiResponse> {
        return await this.#post("/auth/register", {name, email, phone, password});
    }


    async #post(uri: string, data: unknown): Promise<ApiResponse> {
        try {
            const response =
                await publicApi.post(uri, data);
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

export default new AuthService();
