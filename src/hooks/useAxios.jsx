import axios from "axios";

export const API = axios.create({
  baseURL: "https://photography-school-client-server.vercel.app/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need
  },
});
