export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function formatTo12HourTime(isoString: string) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12 || 12;

  // Format minutes as two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}.${formattedMinutes} ${period}`;
}

export function formatMessageDate(dateString: string): string {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Reset hours to 00:00 for accurate day comparison
  const input = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffTime = current.getTime() - input.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[inputDate.getDay()];
    const day = inputDate.getDate().toString().padStart(2, "0");
    console.log("dayday",day);
    
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // 0-indexed
    const year = inputDate.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  }
}
