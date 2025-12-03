import api from "./axiosConfig";

export const createPlant = (data) => api.post("/plants", data);
export const getPlants = (ownerId) => api.get(`/plants/owner/${ownerId}`);
export const getPlant = (id) => api.get(`/plants/${id}`);
export const updatePlant = (id, data) => api.put(`/plants/${id}`, data);
export const deletePlant = (id) => api.delete(`/plants/${id}`);
