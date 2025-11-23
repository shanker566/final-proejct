import axios from "axios";

// Use VITE_API_URL (includes the '/api' suffix). Falls back to deployed URL then localhost for safety.
const RAW = import.meta.env.VITE_API_URL;
// Primary: environment (build-time). Secondary: deployed backend (safe fallback). Tertiary: local dev.
const BASE = (RAW && RAW.trim()) || "https://final-proejct.onrender.com/api" || "http://localhost:5000/api";

// Warn if running on a remote host but BASE points to localhost (likely mis-build)
try {
	if (typeof window !== "undefined") {
		const hostname = window.location.hostname;
		if (!hostname.includes("localhost") && BASE.includes("localhost")) {
			console.warn(
				"VITE_API_URL is not configured for production. The app is running on",
				hostname,
				"but API BASE is",
				BASE,
				". Rebuild with VITE_API_URL set to https://final-proejct.onrender.com/api"
			);
		}
	}
} catch (e) {
	// ignore errors in non-browser environments
}

const API = axios.create({ baseURL: BASE });

// Example routes — call endpoints relative to BASE
export const getCityDetails = () => API.get("/cities");
export const addCity = (data) => API.post("/cities", data);
export const reportIssue = (data) => API.post("/issues", data);
export const getIssues = () => API.get("/issues");
export const sendFeedback = (data) => API.post("/feedback", data);
