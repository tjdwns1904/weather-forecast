import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "http://localhost:5173/",
    "Access-Control-Allow-Methods": "GET",
  },
});
