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

const getFormattedTime = (date, format = 'HH:mm:ss') =>
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
export { getDay, getFormattedDate, getFormattedTime, getDayOfWeek };
