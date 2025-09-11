import axios from "axios";
import { API_CARS } from "../config/apiConfig";

export const getCarList = () => {
    return axios.get(`${API_CARS}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
}