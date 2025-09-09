import axios from 'axios';
import { API_GET_AVAILABILITY, API_GET_CURRENT_RENTALS, API_RENTALS } from '../config/apiConfig';

export const getAvailability = (startDateTime, endDateTime) => {
    return axios.get(`${API_GET_AVAILABILITY}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`);
};

export const postRental = (rental) => {
    return axios.post(`${API_RENTALS}`, rental);
};

export const getCurrentRentals = () => {
    return axios.get(`${API_GET_CURRENT_RENTALS}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const getRentalById = (rentalId) => {
    return axios.get(`${API_RENTALS}/${rentalId}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const deleteRentalById = (rentalId) => {
    return axios.delete(`${API_RENTALS}/${rentalId}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const updateRental = (rental) => {
    return axios.put(`${API_RENTALS}/${rental.id}`, rental, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
};