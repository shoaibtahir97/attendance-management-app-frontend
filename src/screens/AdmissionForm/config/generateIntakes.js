const intakeMonths = ['JAN', 'JUN', 'SEP'];

const currentYear = new Date().getFullYear();

const startYear = currentYear - 1;
const numberOfYears = 5;

export const intakes = Array.from({ length: numberOfYears }, (_, index) => {
  const year = startYear + index;

  return intakeMonths.map((month) => `${month} ${String(year).slice(-2)}`);
}).flat();
