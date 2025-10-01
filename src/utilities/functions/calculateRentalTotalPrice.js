export const calculateRentalTotalPrice = (rental) => {
    const daysRented = calculateDaysRented(rental.start, rental.end);
    const totalPrice = daysRented * rental.pricePerDay;
}