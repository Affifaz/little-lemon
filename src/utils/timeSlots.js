export function toLocalISODate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(isoDateString) {
  const [year, month, day] = isoDateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatTimeLabel(rawTime) {
  const [hourStr, minuteStr] = rawTime.split(':');
  const hour = Number(hourStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = ((hour + 11) % 12) + 1;
  return `${displayHour}:${minuteStr} ${period}`;
}

export function timeStringToMinutes(rawTime) {
  const [hourStr, minuteStr] = rawTime.split(':');
  return Number(hourStr) * 60 + Number(minuteStr);
}
