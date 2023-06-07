import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need
  },
});
