import axios from "axios";
import { API_GET_CARS } from "../config/apiConfig";

export const getCars = () => {
    
    return axios.get(`${API_GET_CARS}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
}