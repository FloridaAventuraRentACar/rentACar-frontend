export const insuranceCharge = (selectedInsurance, daysBooked) => {

    if (selectedInsurance === "DEDUCTIBLE") return 0;
    return 15 * daysBooked;
};