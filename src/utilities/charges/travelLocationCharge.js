export const travelLocationCharge = (travelLocation) => {
    return travelLocation ? locationPrices[travelLocation] : 0;
};