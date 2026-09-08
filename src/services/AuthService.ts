import ApiResponse from "../api/ApiResponse.ts";
import {publicApi} from "../api/api.ts";

class AuthService {
    async login(email: string, password: string): Promise<ApiResponse> {
        return await this.#post("/auth/login", {email, password}, true);
    }

    async sendEmailOrPhoneOtp(email: string | undefined, phone: string | undefined): Promise<ApiResponse> {
        const URI: string = email ? "email" : "phone";

        return await this.#post(`/auth/resend-${URI}-otp`, {email, phone});
    }

    async verifyEmailOtp(email: string, otp: string): Promise<ApiResponse> {
        return await this.#post("/auth/verify-email", {email, otp}, true);
    }

    async verifyPhoneOtp(phone: string, otp: string): Promise<ApiResponse> {
        return await this.#post("/auth/verify-phone", {phone, otp}, true);
    }

    async requestLoginOtp(email: string): Promise<ApiResponse> {
        return this.#post("/auth/request-login-otp", {email});
    }

    async loginWithOtp(email: string, otp: string): Promise<ApiResponse> {
        return await this.#post("/auth/login-otp", {email, otp}, true);
    }

    async signup(name: string, email: string, phone: string, password: string): Promise<ApiResponse> {
        return await this.#post("/auth/register", {name, email, phone, password});
    }

    async forgotPassword(email: string): Promise<ApiResponse> {
        return await this.#post("/auth/forget-password", {email});
    }

    async resetPassword(token: string, password: string): Promise<ApiResponse> {
        return await this.#post("/auth/reset-password", {token, password});
    }

    async #post(uri: string, data: unknown, withCredentials: boolean = false): Promise<ApiResponse> {
        try {
            const response = await publicApi.post(uri, data, {withCredentials});
            return ApiResponse.success(response.data);
        } catch (err: any) {
            return ApiResponse.error(err);
        }
    }
}

export default new AuthService();
