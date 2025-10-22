import axiosInstance from './axiosInstance';
import { API_GET_AVAILABILITY, API_GET_CURRENT_RENTALS, API_RENTALS } from '../config/apiConfig';

export const getAvailability = (startDateTime, endDateTime) => {
    return axiosInstance.get(`${API_GET_AVAILABILITY}?startDateTime=${startDateTime}&endDateTime=${endDateTime}`);
};

export const postRental = (rental) => {
    return axiosInstance.post(`${API_RENTALS}`, rental);
};

export const getCurrentRentals = () => {
    return axiosInstance.get(`${API_GET_CURRENT_RENTALS}`);
};

export const getRentalById = (rentalId) => {
    return axiosInstance.get(`${API_RENTALS}/${rentalId}`);
};

export const deleteRentalById = (rentalId) => {
    return axiosInstance.delete(`${API_RENTALS}/${rentalId}`);
};

export const updateRental = (rental) => {
    return axiosInstance.put(`${API_RENTALS}/${rental.id}`, rental);
};

export const getRentals = () => {
    return axiosInstance.get(`${API_RENTALS}`);
}