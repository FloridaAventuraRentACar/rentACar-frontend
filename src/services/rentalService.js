import axios from 'axios';
import { API_GET_AVAILABILITY, API_POST_RENTAL } from '../config/apiConfig';

export const getAvailability = (startDateTime, endDateTime) => {
    return axios.get(`${API_GET_AVAILABILITY}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`);
};

export const postRental = (rental) => {
    return axios.post(`${API_POST_RENTAL}`, rental);
};