export function calculateMinTime() {

    const now = new Date();
    now.setHours(now.getHours() + 3); // Sumar 3 horas
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
}