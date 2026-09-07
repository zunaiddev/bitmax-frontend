import type {AxiosError} from "axios";

interface ApiError {
    status: number;
    code: string;
    message: string;
    details: unknown;
}

class ApiResponse {
    public success: boolean;
    public payload: unknown;
    public error: ApiError | null;

    private constructor(success: boolean, payload: unknown, error: ApiError | AxiosError | null) {
        this.success = success;
        this.payload = payload;
        this.error = error ? ApiResponse.normalizeError(error) : null;
    }

    static success(data: unknown): ApiResponse {
        return new ApiResponse(true, data, null);
    }

    static error(error: ApiError | AxiosError): ApiResponse {
        return new ApiResponse(false, null, error);
    }

    private static normalizeError(error: ApiError | AxiosError): ApiError {
        if ("response" in error) {
            const responseData = error.response?.data as Partial<ApiError> | undefined;

            return {
                status: error.status ?? error.response?.status ?? 0,
                code: responseData?.code ?? "NO CODE",
                message: responseData?.message ?? "Unknown Error",
                details: responseData?.details ?? {},
            };
        }

        return error as ApiError;
    }
}

export default ApiResponse;
