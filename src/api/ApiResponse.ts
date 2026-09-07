import axios, {type AxiosError} from "axios";
import type {ApiError} from "../utils/types.ts";

class ApiResponse {
    public success: boolean;
    public payload: any;
    public error: ApiError;

    private constructor(success: boolean, payload: any, error: AxiosError | any) {
        this.success = success;
        this.payload = payload;
        this.error = axios.isAxiosError(error) ? {
            status: error?.response?.status ?? 0,
            code: error?.response?.data?.code ?? "NO_CODE",
            message: error?.response?.data?.message ?? "Something Went Wrong",
            details: error?.response?.data?.details
        } : error;
    }

    static success(data: any): ApiResponse {
        return new ApiResponse(true, data, null);
    }

    static error(error: ApiError | AxiosError): ApiResponse {
        return new ApiResponse(false, null, error);
    }
}

export default ApiResponse;
