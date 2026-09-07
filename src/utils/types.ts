export interface AccountInfo {
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

export interface DeviceSession {
    id: string;
    name: string;
    ip: string;
    type: string;
    date: string;
}

export interface ApiError {
    status: number;
    code: string;
    message: string;
    details: any;
}