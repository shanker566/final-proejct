import axios from "axios";

// Base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});

// Example routes — adjust according to your backend
export const getCityDetails = () => API.get("/api/cities");
export const addCity = (data) => API.post("/api/cities", data);
export const reportIssue = (data) => API.post("/api/issues", data);
export const getIssues = () => API.get("/api/issues");
export const sendFeedback = (data) => API.post("/api/feedback", data);
