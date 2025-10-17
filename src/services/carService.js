import axiosInstance from "./axiosInstance";
import { API_CARS } from "../config/apiConfig";

export const getCarList = () => {
    return axiosInstance.get(`${API_CARS}`);
}