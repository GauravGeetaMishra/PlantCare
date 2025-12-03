import api from "./axiosConfig";

export const getTasks = (plantId) => api.get(`/tasks/plant/${plantId}`);
export const createTask = (data) => api.post("/tasks", data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
