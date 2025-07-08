import { API_POST_CLIENT_LIST } from "../config/apiConfig";
import axios from "axios";

export const postClientList = (clientList) => {
    return axios.post(`${API_POST_CLIENT_LIST}`, clientList);
}