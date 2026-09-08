import {publicApi} from "../api/api.ts";

interface RefreshResponse {
    accessToken: string;
    sessionId: string;
}

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (!payload.exp) {
            return true;
        }

        return payload.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
}

async function getToken(): Promise<string | null> {
    const token = localStorage.getItem("token");
    const sessionId = localStorage.getItem("sessionId");

    if (!token || !sessionId) {
        return null;
    }

    if (!isTokenExpired(token)) {
        return token;
    }

    try {
        const response = await publicApi.post<RefreshResponse>(
            "/auth/refresh-token",
            {sessionId},
            {withCredentials: true}
        );

        const {accessToken, sessionId: newSessionId} = response.data;

        if (!accessToken || !newSessionId) {
            return null;
        }

        localStorage.setItem("token", accessToken);
        localStorage.setItem("sessionId", newSessionId);

        return accessToken;

    } catch {
        localStorage.clear();

        return null;
    }
}

export default getToken;