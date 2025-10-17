import { API_POST_CLIENT_LIST } from "../config/apiConfig";
import axiosInstance from "./axiosInstance";

export const postClientList = (clientList) => {
    return axiosInstance.post(`${API_POST_CLIENT_LIST}`, clientList);
}