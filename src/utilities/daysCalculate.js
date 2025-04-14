export function daysCalculate(startDate, endDate , startTime, endTime) {
    const inicio = new Date(startDate + 'T' + startTime + ':00');
    const fin = new Date(endDate + 'T' + endTime + ':00');
    
    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fin - inicio;

    // Convertir la diferencia de milisegundos a horas
    const diferenciaHoras = diferenciaMilisegundos / (1000 * 60 * 60);

    const days = Math.floor(diferenciaHoras / 24);
    if (diferenciaHoras % 24 > 6) {
        days++;
    }

    return days

}
