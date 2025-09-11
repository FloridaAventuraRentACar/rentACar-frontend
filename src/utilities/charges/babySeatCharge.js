export const babySeatCharge = (selectedBabySeat, daysBooked) => {
    if (selectedBabySeat === "NONE") return 0;
    return 3 * daysBooked;
};