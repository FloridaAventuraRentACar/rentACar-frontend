import axiosInstance from "./axiosInstance";
import { API_POST_LOGIN } from "../config/apiConfig";

export default function fetchLogin(email, password) {

    return axiosInstance.post(`${API_POST_LOGIN}`, {email, password});
}