function roundToNearestHalfHour(timeStr) {
    
  const [hours, minutes] = timeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  const roundedMinutes = Math.round(totalMinutes / 30) * 30;
  const newHours = Math.floor(roundedMinutes / 60);
  const newMinutes = roundedMinutes % 60;

  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
}

export default roundToNearestHalfHour;