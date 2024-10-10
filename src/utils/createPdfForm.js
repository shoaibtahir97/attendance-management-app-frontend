import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function createPdfForm() {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]);

  const form = pdfDoc.getForm();
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set font size
  const fontSize = 12;

  const headerLeftBytes = await fetch(
    `${process.env.PUBLIC_URL}/logo512.png`
  ).then((res) => res.arrayBuffer());

  const headerLeftImage = await pdfDoc.embedPng(headerLeftBytes);

  page.drawImage(headerLeftImage, {
    x: 480,
    y: height - 86,
    width: 80,
    height: 80,
  });

  page.drawText('Course Application Form', {
    x: 180,
    y: height - 40,
    size: 18,
    font: fontBold,
  });

  // Course Section
  page.drawText('Course Details', {
    x: 50,
    y: height - 100,
    size: 16,
    font: fontBold,
  });

  page.drawText('Course applied for', {
    x: 50,
    y: height - 120,
    size: fontSize,
    font,
  });

  const courseField = form.createTextField('course');

  courseField.addToPage(page, {
    x: 180,
    y: height - 124,
    width: 400,
    height: 18,
  });

  page.drawText('Intake', { x: 50, y: height - 140, size: fontSize, font });
  const intakeDropdown = form.createDropdown('intake');
  intakeDropdown.setOptions([
    'JAN 25',
    'JUN 25',
    'SEP 25',
    'JAN 26',
    'JUN 26',
    'SEP 26',
    'JAN 27',
    ' JUN 27',
    ' SEP 27',
  ]);
  intakeDropdown.addToPage(page, {
    x: 180,
    y: height - 144,
    width: 400,
    height: 18,
  });

  page.drawText('Point of entry', {
    x: 50,
    y: height - 160,
    size: fontSize,
    font,
  });
  const pointOfEntryDropdown = form.createDropdown('pointOfEntry');
  pointOfEntryDropdown.setOptions([
    'Foundation',
    'First Year',
    'Second Year',
    'Third Year',
  ]);

  pointOfEntryDropdown.addToPage(page, {
    x: 180,
    y: height - 164,
    width: 400,
    height: 18,
  });

  // Personal Details Section
  page.drawText('Personal Details', {
    x: 50,
    y: height - 200,
    size: 16,
    font: fontBold,
  });

  page.drawText('First name', {
    x: 50,
    y: height - 220,
    size: fontSize,
    font,
  });
  const firstNameField = form.createTextField('firstName');
  firstNameField.addToPage(page, {
    x: 180,
    y: height - 224,
    width: 400,
    height: 18,
  });

  page.drawText('Last Name', {
    x: 50,
    y: height - 240,
    size: fontSize,
    font,
  });
  const lastNameField = form.createTextField('lastName');
  lastNameField.addToPage(page, {
    x: 180,
    y: height - 244,
    width: 400,
    height: 18,
  });

  page.drawText('Date of birth', {
    x: 50,
    y: height - 260,
    size: fontSize,
    font,
  });
  const DOBField = form.createTextField('DOB');
  DOBField.addToPage(page, {
    x: 180,
    y: height - 264,
    width: 400,
    height: 18,
  });

  page.drawText('Gender', { x: 50, y: height - 280, size: fontSize });
  const genderDropdown = form.createDropdown('gender');
  genderDropdown.setOptions([
    'man',
    'woman',
    'I prefer another term',
    'I prefer not to say',
  ]);
  genderDropdown.addToPage(page, {
    x: 180,
    y: height - 284,
    width: 400,
    height: 18,
  });

  page.drawText('Ethnicity', { x: 50, y: height - 300, size: fontSize, font });
  const ethnicityDropdown = form.createDropdown('ethnicity');
  ethnicityDropdown.setOptions([
    'White Gypsy',
    'Traveller or Irish Traveller',
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
  ]);
  ethnicityDropdown.addToPage(page, {
    x: 180,
    y: height - 304,
    width: 400,
    height: 18,
  });

  // Contact Section
  page.drawText('Contact Details', {
    x: 50,
    y: height - 340,
    size: 16,
    font: fontBold,
  });

  page.drawText('Email', { x: 50, y: height - 360, size: fontSize });
  const emailField = form.createTextField('email');
  emailField.addToPage(page, {
    x: 180,
    y: height - 364,
    width: 400,
    height: 18,
  });

  page.drawText('Contact Number', {
    x: 50,
    y: height - 380,
    size: fontSize,
    font,
  });
  const phoneField = form.createTextField('contactNumber');
  phoneField.addToPage(page, {
    x: 180,
    y: height - 384,
    width: 400,
    height: 18,
  });

  page.drawText('Post Code', {
    x: 50,
    y: height - 400,
    size: fontSize,
    font,
  });
  const postcodeField = form.createTextField('postcode');
  postcodeField.addToPage(page, {
    x: 180,
    y: height - 404,
    width: 400,
    height: 18,
  });

  page.drawText('County', {
    x: 50,
    y: height - 420,
    size: fontSize,
    font,
  });
  const countyField = form.createTextField('county');
  countyField.addToPage(page, {
    x: 180,
    y: height - 424,
    width: 400,
    height: 18,
  });

  page.drawText('Home Address', {
    x: 50,
    y: height - 440,
    size: fontSize,
    font,
  });
  const homeAddressField = form.createTextField('homeAddress');
  homeAddressField.addToPage(page, {
    x: 180,
    y: height - 444,
    width: 400,
    height: 18,
  });

  // Nationality Section
  page.drawText('Nationality', {
    x: 50,
    y: height - 480,
    size: 16,
    font: fontBold,
  });
  page.drawText('Country of Birth', { x: 50, y: height - 500, size: fontSize });
  const countryOfBirthField = form.createTextField('countryOfBirth');
  countryOfBirthField.addToPage(page, {
    x: 180,
    y: height - 504,
    width: 400,
    height: 18,
  });

  page.drawText('Legal Nationality', {
    x: 50,
    y: height - 520,
    size: fontSize,
    font,
  });
  const legalNationalityField = form.createTextField('legalNationality');
  legalNationalityField.addToPage(page, {
    x: 180,
    y: height - 524,
    width: 400,
    height: 18,
  });

  page.drawText('Dual Nationality', {
    x: 50,
    y: height - 540,
    size: fontSize,
    font,
  });
  const dualNationalityField = form.createTextField('dualNationality');
  dualNationalityField.addToPage(page, {
    x: 180,
    y: height - 544,
    width: 400,
    height: 18,
  });

  page.drawText('Nationality', {
    x: 50,
    y: height - 560,
    size: fontSize,
    font,
  });

  const nationalityField = form.createTextField('Country of Residence');
  nationalityField.addToPage(page, {
    x: 180,
    y: height - 564,
    width: 400,
    height: 18,
  });

  // Disability Section
  page.drawText('Disability/Additional Support', {
    x: 50,
    y: height - 600,
    size: 16,
    font: fontBold,
  });

  page.drawText('Disability', { x: 50, y: height - 620, size: fontSize });
  const disabilityDropdown = form.createDropdown('disability');
  disabilityDropdown.setOptions(['Yes', 'No']);
  disabilityDropdown.addToPage(page, {
    x: 180,
    y: height - 624,
    width: 400,
    height: 18,
  });

  page.drawText('Additional Support', {
    x: 50,
    y: height - 640,
    size: fontSize,
  });
  const additionalSupportDropdown = form.createDropdown('additionalSupport');
  additionalSupportDropdown.setOptions(['Yes', 'No']);
  additionalSupportDropdown.addToPage(page, {
    x: 180,
    y: height - 644,
    width: 400,
    height: 18,
  });

  // Fee Status Section
  page.drawText('Fee Status', {
    x: 50,
    y: height - 680,
    size: 16,
    font: fontBold,
  });

  page.drawText('How you will be ', {
    x: 50,
    y: height - 700,
    size: fontSize,
  });

  page.drawText('paying fee', {
    x: 50,
    y: height - 720,
    size: fontSize,
  });

  const feeStatusDropdown = form.createDropdown('feeStatus');
  feeStatusDropdown.setOptions([
    'Private finance',
    'Student Loan Company',
    'Training Agency',
    'Other UK govt award',
    'International agency',
    'UK industry/commerce',
    'Other source',
    'Not known',
  ]);
  feeStatusDropdown.addToPage(page, {
    x: 180,
    y: height - 720,
    width: 400,
    height: 18,
  });

  page.drawText('1 of 3', {
    x: 520,
    y: height - 820,
    size: 14,
  });

  let page2 = pdfDoc.addPage([595.28, 841.89]);
  const { height: height2 } = page2.getSize();

  // Qualifications Section
  page2.drawText('Qualifications', {
    x: 50,
    y: height2 - 80,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'Please list all qualifications obtained, including any non-UK qualifications.',
    {
      x: 50,
      y: height2 - 100,
      size: fontSize,
    }
  );

  page2.drawText('Institute', {
    x: 50,
    y: height2 - 120,
    size: fontSize,
  });

  page2.drawText('Qualification', {
    x: 150,
    y: height2 - 120,
    size: fontSize,
  });

  page2.drawText('Subject', {
    x: 250,
    y: height2 - 120,
    size: fontSize,
  });

  page2.drawText('Country', {
    x: 360,
    y: height2 - 120,
    size: fontSize,
  });

  page2.drawText('Date of Completion', {
    x: 470,
    y: height2 - 120,
    size: fontSize,
  });

  const qualificationsArray = [0, 1, 2, 3, 4];

  qualificationsArray?.forEach((qualification, index) => {
    const instituteField = form.createTextField(`institute${index}`);
    instituteField.addToPage(page2, {
      x: 50,
      y: height2 - 127 - (index + 1) * 20,
      width: 80,
      height: 18,
    });

    const qualificationField = form.createTextField(`qualification${index}`);
    qualificationField.addToPage(page2, {
      x: 150,
      y: height2 - 127 - (index + 1) * 20,
      width: 80,
      height: 18,
    });

    const subjectField = form.createTextField(`subject${index}`);
    subjectField.addToPage(page2, {
      x: 250,
      y: height2 - 127 - (index + 1) * 20,
      width: 80,
      height: 18,
    });

    const countryField = form.createTextField(`country${index}`);
    countryField.addToPage(page2, {
      x: 360,
      y: height2 - 127 - (index + 1) * 20,
      width: 80,
      height: 18,
    });

    const dateOfCompletionField = form.createTextField(
      `dateOfCompletion${index}`
    );

    dateOfCompletionField.addToPage(page2, {
      x: 470,
      y: height2 - 127 - (index + 1) * 20,
      width: 80,
      height: 18,
    });
  });

  // English Language Section
  page2.drawText('English Language', {
    x: 50,
    y: height2 - 252,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'If English is not your first language, do you have an English language qualification?',
    {
      x: 50,
      y: height2 - 270,
      size: fontSize,
    }
  );

  page2.drawText(
    'If so, please provide details below (title of qualification, level, awarding body, etc.)',
    {
      x: 50,
      y: height2 - 285,
      size: fontSize,
    }
  );

  const englishLanguageField = form.createTextField(
    'englishQualificationLevel'
  );
  englishLanguageField.addToPage(page2, {
    x: 50,
    y: height2 - 550,
    width: 500,
    height: 250,
  });

  englishLanguageField.setFontSize(12);
  englishLanguageField.enableMultiline();

  // Work Experience Section
  page2.drawText('Work Experience', {
    x: 50,
    y: height2 - 590,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'Please provide details of all work experience undertaken including outside of UK',
    {
      x: 50,
      y: height2 - 610,
      size: fontSize,
    }
  );

  page2.drawText('From', {
    x: 50,
    y: height2 - 625,
    size: fontSize,
  });

  page2.drawText('To', {
    x: 130,
    y: height2 - 625,
    size: fontSize,
  });

  page2.drawText('Name of Employer', {
    x: 230,
    y: height2 - 625,
    size: fontSize,
  });

  page2.drawText('Position', {
    x: 370,
    y: height2 - 625,
    size: fontSize,
  });

  page2.drawText('Brief Description', {
    x: 470,
    y: height2 - 625,
    size: fontSize,
  });

  const workExperienceArray = [0, 1, 2, 3, 4, 5];
  workExperienceArray.forEach((workDetails, index) => {
    const fromField = form.createTextField(`from${index}`);
    fromField.addToPage(page2, {
      x: 50,
      y: height2 - 635 - (index + 1) * 20,
      width: 70,
      height: 18,
    });

    const toField = form.createTextField(`to${index}`);
    toField.addToPage(page2, {
      x: 130,
      y: height2 - 635 - (index + 1) * 20,
      width: 70,
      height: 18,
    });

    const employerField = form.createTextField(`employer${index}`);
    employerField.addToPage(page2, {
      x: 230,
      y: height2 - 635 - (index + 1) * 20,
      width: 90,
      height: 18,
    });

    const positionField = form.createTextField(`position${index}`);
    positionField.addToPage(page2, {
      x: 370,
      y: height2 - 635 - (index + 1) * 20,
      width: 80,
      height: 18,
    });

    const responsibilitiesField = form.createTextField(
      `responsibilities${index}`
    );
    responsibilitiesField.addToPage(page2, {
      x: 470,
      y: height2 - 635 - (index + 1) * 20,
      width: 80,
      height: 18,
    });
  });

  let page3 = pdfDoc.addPage([595.28, 841.89]);
  const { height: height3 } = page2.getSize();

  // Reference Details
  page3.drawText('Reference Details', {
    x: 50,
    y: height2 - 80,
    size: 16,
    font: fontBold,
  });

  page3.drawText(
    'Please provide name and contact details (company email) for most recent/last employer',
    {
      x: 50,
      y: height2 - 95,
      size: fontSize,
    }
  );

  const referenceDetailsField = form.createTextField('referenceDetails');
  referenceDetailsField.addToPage(page3, {
    x: 50,
    y: height2 - 220,
    width: 500,
    height: 120,
  });

  referenceDetailsField.setFontSize(12);
  referenceDetailsField.enableMultiline();

  // Personal Statement
  page3.drawText('Personal Statement', {
    x: 50,
    y: height - 240,
    size: 16,
    font: fontBold,
  });

  page3.drawText(
    'Please include details such as why you wish to study the course/ subject, how your qualifications ',
    {
      x: 50,
      y: height3 - 252,
      size: fontSize,
    }
  );
  page3.drawText(
    'and/or work experience has helped you prepare for the course and what are your future aspirations',
    {
      x: 50,
      y: height3 - 264,
      size: fontSize,
    }
  );

  const personalStatementField = form.createTextField('personalStatement');
  personalStatementField.addToPage(page3, {
    x: 50,
    y: height3 - 520,
    width: 500,
    height: 250,
  });

  personalStatementField.setFontSize(12);
  personalStatementField.enableMultiline();

  page2.drawText('2 of 3', {
    x: 520,
    y: height - 820,
    size: 14,
  });

  // Declaration section
  page3.drawText('Declaration', {
    x: 50,
    y: height2 - 540,
    size: 16,
    font: fontBold,
  });

  page3.drawText(
    'By ticking the check box below, I agree to Stratford College London processing personal data contained in this from or',
    {
      x: 50,
      y: height2 - 555,
      size: 10,
    }
  );

  page3.drawText(
    'other data which the College may obtain from me or other people. I agree to the processing of such data for any purpose ',
    {
      x: 40,
      y: height2 - 565,
      size: 10,
    }
  );

  page3.drawText(
    'connected with my studies (including UCAS via the RPA data transfer) or my health and safety whilst on the premises or for',
    {
      x: 40,
      y: height2 - 575,
      size: 10,
    }
  );

  page3.drawText(
    'any including communication with me following the completion of my studies. In addition, I agree to the College processing ',
    {
      x: 40,
      y: height2 - 585,
      size: 10,
    }
  );

  page3.drawText(
    'personal data described as “Sensitive Data” within the meaning of the United Kingdom Data Protection Act 2018, such ',
    {
      x: 40,
      y: height2 - 595,
      size: 10,
    }
  );

  page3.drawText(
    'processing to be undertaken for any purposes as indicated in the declaration. The organisation is committed to preserving',
    {
      x: 40,
      y: height2 - 605,
      size: 10,
    }
  );

  page3.drawText(
    'the privacy of its students and employees and to complying with the requirements of the General Data Protection ',
    {
      x: 40,
      y: height2 - 615,
      size: 10,
    }
  );

  page3.drawText(
    'Regulations(GDPR) 2018. To achieve this commitment information about our students, employees and other clients and',
    {
      x: 40,
      y: height2 - 625,
      size: 10,
    }
  );

  page3.drawText(
    'contacts must be collected and used fairly, stored safely and not unlawfully disclosed to any other person.',
    {
      x: 40,
      y: height2 - 635,
      size: 10,
    }
  );
  page3.drawText(
    'I confirm that the information provided on this application form is true, complete and accurate to the best of my knowledge. ',
    {
      x: 40,
      y: height2 - 645,
      size: 10,
    }
  );
  page3.drawText(
    'I understand that if I am offered a place on a course with Stratford College London (SCL), if any information is found to be ',
    {
      x: 40,
      y: height2 - 655,
      size: 10,
    }
  );
  page3.drawText(
    'incorrect, SCL or Canterbury Christchurch University (CCCU) may take appropriate action which could result in withdrawal ',
    {
      x: 40,
      y: height2 - 665,
      size: 10,
    }
  );
  page3.drawText('from the course.', {
    x: 40,
    y: height2 - 675,
    size: 10,
  });
  page3.drawText('I have read, understood and agree to the above', {
    x: 40,
    y: height2 - 685,
    size: 10,
  });

  const declarationCheckbox = form.createCheckBox('declaration');
  declarationCheckbox.addToPage(page3, {
    x: 50,
    y: height2 - 705,
    width: 15,
    height: 15,
  });

  page3.drawText('Date:', {
    x: 350,
    y: height3 - 760,
    size: fontSize,
    font,
  });
  const declarationDate = form.createTextField('declarationDate');

  declarationDate.addToPage(page3, {
    x: 350,
    y: height3 - 785,
    width: 200,
    height: 20,
  });

  page3.drawText('Name (as Signature)', {
    x: 50,
    y: height3 - 760,
    size: fontSize,
    font,
  });
  const signature = form.createTextField('signature');

  signature.addToPage(page3, {
    x: 50,
    y: height3 - 785,
    width: 200,
    height: 20,
  });

  const footerBytes = await fetch(
    `${process.env.PUBLIC_URL}/scl_logo_ai.png`
  ).then((res) => res.arrayBuffer());

  const footerImage = await pdfDoc.embedPng(footerBytes);

  page.drawImage(footerImage, {
    x: 60,
    y: height - 825,
    width: 450,
    height: 28,
  });

  page2.drawImage(footerImage, {
    x: 60,
    y: height - 825,
    width: 450,
    height: 28,
  });

  page3.drawImage(footerImage, {
    x: 60,
    y: height - 825,
    width: 450,
    height: 28,
  });

  page3.drawText('3 of 3', {
    x: 520,
    y: height - 820,
    size: 14,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default createPdfForm;
