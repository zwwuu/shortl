const Time = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
  YEAR: 31536000,
  CENTURY: 315360000,
};

export function prettyTime(epochTime: number) {
  const now = Date.now();
  const diff = (now - epochTime) / 1000;
  const seconds = Math.abs(diff);

  if (seconds < Time.MINUTE) {
    return "just now";
  }
  if (seconds < Time.HOUR) {
    return format(Math.floor(diff / Time.MINUTE), "minute", "minutes");
  }
  if (seconds < Time.DAY) {
    return format(Math.floor(diff / Time.HOUR), "hour", "hours");
  }
  if (seconds < Time.WEEK) {
    return format(Math.floor(diff / Time.DAY), "day", "days");
  }
  if (seconds < Time.MONTH) {
    return format(Math.floor(diff / Time.WEEK), "week", "weeks");
  }
  if (seconds < Time.YEAR) {
    return format(Math.floor(diff / Time.MONTH), "month", "months");
  }
  if (seconds < Time.CENTURY) {
    return format(Math.floor(diff / Time.YEAR), "year", "years");
  }
  return diff < 0 ? `far in the future` : `long time ago`;
}

function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count === 0 || count === 1 ? singular : plural}`;
}

function format(count: number, singular: string, plural: string) {
  const pluralized = pluralize(Math.abs(count), singular, plural);

  return count > 0 ? `${pluralized} ago` : `in ${pluralized}`;
}
