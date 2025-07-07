export function sortRentalsByDate(rentals) {

    return rentals.sort((a, b) => {
        const fechaA = new Date(a.start);
        const fechaB = new Date(b.start);
        return fechaA - fechaB;
  });
  //sort recibe una funcion para comparar el elemento i del array con el elemento i+1 para determinar cual va antes
  //En este caso la funcion que le pasamos resta la fecha del elemento i con la del i+1. 
  // Si el resultado es negativo el elemento i va antes. Si es positivo el i+1 va antes

}