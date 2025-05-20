import axios from 'axios';
import { API_GET_AVAILABILITY } from '../config/apiConfig';

export const getAvailability = (startDateTime, endDateTime) => {
    return axios.get(`${API_GET_AVAILABILITY}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`);
};