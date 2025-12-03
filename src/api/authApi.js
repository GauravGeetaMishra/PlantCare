import api from "./axiosConfig";

export const login = (data) => api.post("/auth/login", data);
export const verifyOtp = (data) => api.post("/auth/verifyOtp", data);
export const registerUser = (data) => api.post("/auth/register", data);
