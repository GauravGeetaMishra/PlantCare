import axios from "./axiosConfig";

export const getReports = (plantId) => axios.get(`/reports/plant/${plantId}`);

export const createReport = (data) => axios.post(`/reports/create`, data);

export const deleteReport = (id) => axios.delete(`/reports/${id}`);

export const sendReportsEmail = (plantId,email)=>
  axios.post(`/reports/send?plantId=${plantId}&email=${email}`);
