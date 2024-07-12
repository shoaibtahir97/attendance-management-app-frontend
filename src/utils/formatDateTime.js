import dayjs from "dayjs";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDay = (date) => days[dayjs(date).day()];

const getFormattedDate = (date, format = "DD/MM/YYY") =>
  dayjs(date).format(format);

export { getDay, getFormattedDate };
