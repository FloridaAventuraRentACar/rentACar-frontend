import axios from "axios";
import { API_POST_LOGIN } from "../config/apiConfig";

export default function fetchLogin(email, password) {

    return axios.post(`${API_POST_LOGIN}`, {email, password});
}