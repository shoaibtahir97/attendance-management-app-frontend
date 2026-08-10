const courses = [
  'BSc in Business Management with Foundation Year (4 Years)',
  'HND in Business (2 Years)',
  'HND in Hospitality Management (2 Years)',
  'HND in Leadership & Management (2 Years)',
  'HND in International Travel & Tourism Management (2 Years)',
  'NCC Level 4 Diploma in Business (1 Year)',
  'NCC Level 5 Diploma in Business (1 Year)',
  'NCC Level 4 Diploma in Computing (1 Year)',
  'NCC Level 5 Extended Diploma in Computing with Data Sciences (1 Year)',
  'NCFE Level 4 Diploma in Cyber Security Engineer (1 Year)',
  'NCFE Level 4 Diploma in Data Analyst (1 Year)',
];

const ethnicities = [
  'White',
  'Gypsy, Traveller or Irish Traveller',
  'Black - Caribbean',
  'Black - African',
  'Black - Other',
  'Asian - Indian',
  'Asian - Pakistani',
  'Asian - Bangladeshi',
  'Asian - Chinese',
  'Asian - Other',
  'White/Black Caribbean',
  'White/Black African',
  'White and Asian',
  'Other Mixed',
  'Arab',
  'Other',
  'Not given',
];

const feeStatuses = [
  'Private finance',
  'Student Loan Company',
  'Training Agency',
  'Other UK govt award',
  'International agency',
  'UK industry/commerce',
  'Other source',
  'Not known',
];

const disabilities = [
  'A - No disability',
  'B - Autistic disorder',
  'C - Blind/partial sight',
  'D - Deaf/partial hearing',
  'E - Long standing illness',
  'F - Mental health',
  'G - Learning difficulty',
  'H - Wheelchair/mobility',
  'I - Other disability',
  'J - Multiple disabilities',
];

const studentGenders = [
  { value: '', label: 'Select Gender' },
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Genderqueer', label: 'Genderqueer' },
  { value: 'Genderfluid', label: 'Genderfluid' },
  { value: 'Transgender Man', label: 'Transgender Man' },
  { value: 'Transgender Woman', label: 'Transgender Woman' },
  { value: 'Agender', label: 'Agender' },
  { value: 'Two-Spirit', label: 'Two-Spirit' },
  { value: 'Prefer another term', label: 'Prefer another term' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

export { courses, disabilities, ethnicities, feeStatuses, studentGenders };
