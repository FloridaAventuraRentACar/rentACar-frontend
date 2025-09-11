import { getCarList } from "../../services/carService";

export const carNames = async () => {
    const response = await getCarList();
    const carList = await response.data;
    const carNames = {};
    
    carList.forEach((car) => {
        carNames[car.id] = car.name;
    });
    
    return carNames;
};