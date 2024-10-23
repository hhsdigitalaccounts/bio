const REFRESH_INTERVAL = msFromHours(1 / 4);

function toRelativeDayName(date, ref) {
  // Strip off time info, deal with date only
  date = new Date(date.toDateString());
  ref = new Date(ref.toDateString());

  const diff = daysFromMs(date - ref);

  if (diff === 0) {
    return "today";
  }
  else if (diff === -1) {
    return "yesterday";
  }
  else if (diff === 1) {
    return "tomorrow";
  }
  else if (Math.abs(diff) < 7) {
    return (
      diff < 0                     ? "last " :
      date.getDay() > ref.getDay() ? "" : "next "
    ) + date.toLocaleDateString(undefined, { weekday: "long" });
  }
  else {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
}

function msFromHours(hours) {
  return hours
    * 3600  // convert to seconds
    * 1000; // convert to milliseconds
}

function daysFromMs(ms) {
  return ms
    / 1000 // convert to seconds
    / 3600 // convert to hours
    / 24;  // convert to days
}
