function getToken(): string | null {
    return localStorage.getItem("token");
}

export default getToken;