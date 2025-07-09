import dayjs from 'dayjs';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getDay = (date) => days[dayjs(date).day()];

const getFormattedDate = (date, format = 'DD/MM/YYYY') =>
  dayjs(date).format(format);

const getFormattedDateTime = (date, format = 'DD MMM YYYY h:mm A') =>
  dayjs(date).format(format);

const getFormattedTime = (date, format = 'h:mm:ss') =>
  dayjs(date).format(format);

const getDayOfWeek = (dayOfWeek) => {
  const daysOfWeekMap = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  };
  return daysOfWeekMap[dayOfWeek];
};

const formatDateToYearMonth = (value, originalValue) => {
  if (
    typeof originalValue === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(originalValue)
  ) {
    return originalValue;
  }
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}`;
  }
  return value;
};

export {
  formatDateToYearMonth,
  getDay,
  getDayOfWeek,
  getFormattedDate,
  getFormattedDateTime,
  getFormattedTime,
};
