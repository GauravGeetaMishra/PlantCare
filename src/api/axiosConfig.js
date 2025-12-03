import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // Backend URL
});

// Attach Login LocalStorage ID & JWT Token
api.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.id) config.headers["User-ID"] = parsedUser.id;
        if (parsedUser.jwt) config.headers["Authorization"] = `Bearer ${parsedUser.jwt}`;
    }
    return config;
});

export default api;
