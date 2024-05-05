export function getTimeOfDay(time) {
  const hours = parseInt(time.split(":")[0], 10);

  if (hours >= 0 && hours < 12) {
    return "Morning";
  } else if (hours >= 12 && hours < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}
