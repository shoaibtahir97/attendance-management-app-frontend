import { PDFDocument, StandardFonts } from 'pdf-lib';
import {
  admissionFormImageLeft,
  admissionFormImageRight,
} from '../components/imagepath';

async function createPdfForm() {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 900]);

  const form = pdfDoc.getForm();
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set font size
  const fontSize = 14;

  //   const headerLeft = await fetch(
  //     ''
  //   ).then((res) => res.arrayBuffer());
  //   const headerRight = admissionFormImageRight;

  //   const headerLeftBytes = headerLeft;
  //   const headerRightBytes = headerRight;

  //   const headerLeftImage = await pdfDoc.embedPng(headerLeftBytes);
  // const headerRightImage = await pdfDoc.embedPng(headerRightBytes);

  //   const headerLeftImageWidth = headerLeftImage.width;
  //   const headerLeftImageHeight = headerLeftImage.height;
  // const headerRightImageWidth = headerRightImage.width;
  // const headerRightImageHeight = headerRightImage.height;

  //   const pages = pdfDoc.getPages();
  //   pages.forEach((page) => {
  //     const { width, height } = page.getSize();
  //     page.drawImage(headerLeftImage, {
  //       x: 0,
  //       y: height - headerLeftImageHeight,
  //       width: headerLeftImageWidth,
  //       height: headerLeftImageHeight,
  //     });
  //   page.drawImage(headerRightImage, {
  //     x: 300,
  //     y: height - headerRightImageHeight,
  //     width: headerRightImageWidth,
  //     height: headerRightImageHeight,
  //   });
  //   });

  page.drawText('Course Application Form', {
    x: 180,
    y: height - 40,
    size: 18,
    font: fontBold,
  });

  // Course Section
  page.drawText('Course Details', {
    x: 50,
    y: height - 80,
    size: 16,
    font: fontBold,
  });

  page.drawText('Course applied for', {
    x: 50,
    y: height - 100,
    size: fontSize,
    font,
  });

  const courseField = form.createTextField('course');

  courseField.addToPage(page, {
    x: 180,
    y: height - 104,
    width: 250,
    height: 18,
  });

  page.drawText('Intake', { x: 50, y: height - 120, size: fontSize, font });
  const intakeDropdown = form.createDropdown('intake');
  intakeDropdown.setOptions([
    'January 2024',
    'June 2024',
    'September 2024',
    'January 2025',
    'June 2025',
    'September 2025',
  ]);
  intakeDropdown.addToPage(page, {
    x: 180,
    y: height - 124,
    width: 250,
    height: 18,
  });

  page.drawText('Point of entry', {
    x: 50,
    y: height - 140,
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
    y: height - 144,
    width: 250,
    height: 18,
  });

  // Personal Details Section
  page.drawText('Personal Details', {
    x: 50,
    y: height - 180,
    size: 16,
    font: fontBold,
  });

  page.drawText('First name', {
    x: 50,
    y: height - 200,
    size: fontSize,
    font,
  });
  const firstNameField = form.createTextField('firstName');
  firstNameField.addToPage(page, {
    x: 180,
    y: height - 204,
    width: 250,
    height: 18,
  });

  page.drawText('Last Name', {
    x: 50,
    y: height - 220,
    size: fontSize,
    font,
  });
  const lastNameField = form.createTextField('lastName');
  lastNameField.addToPage(page, {
    x: 180,
    y: height - 224,
    width: 250,
    height: 18,
  });

  page.drawText('Date of birth', {
    x: 50,
    y: height - 240,
    size: fontSize,
    font,
  });
  const DOBField = form.createTextField('DOB');
  DOBField.addToPage(page, {
    x: 180,
    y: height - 244,
    width: 250,
    height: 18,
  });

  page.drawText('Gender', { x: 50, y: height - 260, size: fontSize });
  const genderDropdown = form.createDropdown('gender');
  genderDropdown.setOptions([
    'man',
    'woman',
    'I prefer another term',
    'I prefer not to say',
  ]);
  genderDropdown.addToPage(page, {
    x: 180,
    y: height - 264,
    width: 250,
    height: 18,
  });

  page.drawText('Ethnicity', { x: 50, y: height - 280, size: fontSize, font });
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
    y: height - 284,
    width: 250,
    height: 18,
  });

  // Contact Section
  page.drawText('Contact Details', {
    x: 50,
    y: height - 320,
    size: 16,
    font: fontBold,
  });

  page.drawText('Email', { x: 50, y: height - 340, size: fontSize });
  const emailField = form.createTextField('email');
  emailField.addToPage(page, {
    x: 180,
    y: height - 344,
    width: 250,
    height: 18,
  });

  page.drawText('Contact Number', {
    x: 50,
    y: height - 360,
    size: fontSize,
    font,
  });
  const phoneField = form.createTextField('contactNumber');
  phoneField.addToPage(page, {
    x: 180,
    y: height - 364,
    width: 250,
    height: 18,
  });

  page.drawText('Post Code', {
    x: 50,
    y: height - 380,
    size: fontSize,
    font,
  });
  const postcodeField = form.createTextField('postcode');
  postcodeField.addToPage(page, {
    x: 180,
    y: height - 384,
    width: 250,
    height: 18,
  });

  page.drawText('County', {
    x: 50,
    y: height - 400,
    size: fontSize,
    font,
  });
  const countyField = form.createTextField('county');
  countyField.addToPage(page, {
    x: 180,
    y: height - 404,
    width: 250,
    height: 18,
  });

  page.drawText('Home Address', {
    x: 50,
    y: height - 420,
    size: fontSize,
    font,
  });
  const homeAddressField = form.createTextField('homeAddress');
  homeAddressField.addToPage(page, {
    x: 180,
    y: height - 424,
    width: 250,
    height: 18,
  });

  // Nationality Section
  page.drawText('Nationality', {
    x: 50,
    y: height - 460,
    size: 16,
    font: fontBold,
  });
  page.drawText('Country of Birth', { x: 50, y: height - 480, size: fontSize });
  const countryOfBirthField = form.createTextField('countryOfBirth');
  countryOfBirthField.addToPage(page, {
    x: 180,
    y: height - 484,
    width: 250,
    height: 18,
  });

  page.drawText('Legal Nationality', {
    x: 50,
    y: height - 500,
    size: fontSize,
    font,
  });
  const legalNationalityField = form.createTextField('legalNationality');
  legalNationalityField.addToPage(page, {
    x: 180,
    y: height - 504,
    width: 250,
    height: 18,
  });

  page.drawText('Dual Nationality', {
    x: 50,
    y: height - 520,
    size: fontSize,
    font,
  });
  const dualNationalityField = form.createTextField('dualNationality');
  dualNationalityField.addToPage(page, {
    x: 180,
    y: height - 524,
    width: 250,
    height: 18,
  });

  page.drawText('Nationality', {
    x: 50,
    y: height - 540,
    size: fontSize,
    font,
  });
  const nationalityField = form.createTextField('Country of Residence');
  nationalityField.addToPage(page, {
    x: 180,
    y: height - 544,
    width: 250,
    height: 18,
  });

  // Disability Section
  page.drawText('Disability/Additional Support', {
    x: 50,
    y: height - 580,
    size: 16,
    font: fontBold,
  });

  page.drawText('Disability', { x: 50, y: height - 600, size: fontSize });
  const disabilityDropdown = form.createDropdown('disability');
  disabilityDropdown.setOptions(['Yes', 'No']);
  disabilityDropdown.addToPage(page, {
    x: 180,
    y: height - 604,
    width: 250,
    height: 18,
  });

  page.drawText('Additional Support', {
    x: 50,
    y: height - 620,
    size: fontSize,
  });
  const additionalSupportDropdown = form.createDropdown('additionalSupport');
  additionalSupportDropdown.setOptions(['Yes', 'No']);
  additionalSupportDropdown.addToPage(page, {
    x: 180,
    y: height - 624,
    width: 250,
    height: 18,
  });

  // Fee Status Section
  page.drawText('Fee Status', {
    x: 50,
    y: height - 660,
    size: 16,
    font: fontBold,
  });

  page.drawText('How you will be paying fees', {
    x: 50,
    y: height - 680,
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
    x: 50,
    y: height - 700,
    width: 250,
    height: 18,
  });

  let page2 = pdfDoc.addPage([600, 900]);
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
    x: 280,
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
      x: 280,
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
    y: height2 - 242,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'If English is not your first language, do you have an English language qualification?',
    {
      x: 50,
      y: height2 - 260,
      size: fontSize,
    }
  );

  page2.drawText(
    'If so, please provide details below (title of qualification, level, awarding body, etc.)',
    {
      x: 50,
      y: height2 - 275,
      size: fontSize,
    }
  );

  const englishLanguageField = form.createTextField(
    'englishQualificationLevel'
  );
  englishLanguageField.addToPage(page2, {
    x: 50,
    y: height2 - 300,
    width: 500,
    height: 18,
  });

  // Work Experience Section
  page2.drawText('Work Experience', {
    x: 50,
    y: height2 - 340,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'Please provide details of all work experience undertaken including outside of UK',
    {
      x: 50,
      y: height2 - 360,
      size: fontSize,
    }
  );

  page2.drawText('From', {
    x: 50,
    y: height2 - 380,
    size: fontSize,
  });

  page2.drawText('To', {
    x: 130,
    y: height2 - 380,
    size: fontSize,
  });

  page2.drawText('Name of Employer', {
    x: 230,
    y: height2 - 380,
    size: fontSize,
  });

  page2.drawText('Position', {
    x: 370,
    y: height2 - 380,
    size: fontSize,
  });

  page2.drawText('Brief Description', {
    x: 470,
    y: height2 - 380,
    size: fontSize,
  });

  const workExperienceArray = [0, 1, 2];
  workExperienceArray.forEach((workDetails, index) => {
    const fromField = form.createTextField(`from${index}`);
    fromField.addToPage(page2, {
      x: 50,
      y: height2 - 400 - (index + 1) * 20,
      width: 70,
      height: 18,
    });

    const toField = form.createTextField(`to${index}`);
    toField.addToPage(page2, {
      x: 130,
      y: height2 - 400 - (index + 1) * 20,
      width: 70,
      height: 18,
    });

    const employerField = form.createTextField(`employer${index}`);
    employerField.addToPage(page2, {
      x: 230,
      y: height2 - 400 - (index + 1) * 20,
      width: 70,
      height: 18,
    });

    const positionField = form.createTextField(`position${index}`);
    positionField.addToPage(page2, {
      x: 370,
      y: height2 - 400 - (index + 1) * 20,
      width: 80,
      height: 18,
    });

    const responsibilitiesField = form.createTextField(
      `responsibilities${index}`
    );
    responsibilitiesField.addToPage(page2, {
      x: 470,
      y: height2 - 400 - (index + 1) * 20,
      width: 80,
      height: 18,
    });
  });

  // Reference Details
  page2.drawText('Reference Details', {
    x: 50,
    y: height2 - 500,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'Please provide name and contact details (company email) for most recent/last employer',
    {
      x: 50,
      y: height2 - 520,
      size: fontSize,
    }
  );

  const referenceDetailsField = form.createTextField('referenceDetails');
  referenceDetailsField.addToPage(page2, {
    x: 50,
    y: height2 - 550,
    width: 500,
    height: 20,
  });

  // Personal Statement
  page2.drawText('Personal Statement', {
    x: 50,
    y: height2 - 590,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'Please include details such as why you wish to study the course/ subject, how your ',
    {
      x: 50,
      y: height2 - 610,
      size: fontSize,
    }
  );
  page2.drawText(
    'qualifications and/or work experience has helped you prepare for the course',
    {
      x: 50,
      y: height2 - 625,
      size: fontSize,
    }
  );

  page2.drawText('and what are your future aspirations?', {
    x: 50,
    y: height2 - 640,
    size: fontSize,
  });

  const personalStatementField = form.createTextField('personalStatement');
  personalStatementField.addToPage(page2, {
    x: 50,
    y: height2 - 660,
    width: 500,
    height: 18,
  });

  page2.drawText('Declaration', {
    x: 50,
    y: height2 - 700,
    size: 16,
    font: fontBold,
  });

  page2.drawText(
    'By ticking the check box below, I agree to Stratford College London processing personal',
    {
      x: 50,
      y: height2 - 720,
      size: fontSize,
    }
  );

  page2.drawText(
    'data contained in this from or other data which the College may obtain from me or other',
    {
      x: 40,
      y: height2 - 740,
      size: fontSize,
    }
  );

  page2.drawText(
    'people. I agree to the processing of such data for any purpose connected with my',
    {
      x: 40,
      y: height2 - 760,
      size: fontSize,
    }
  );

  page2.drawText(
    'studies (including UCAS via the RPA data transfer) or my health and safety whilst on the',
    {
      x: 40,
      y: height2 - 780,
      size: fontSize,
    }
  );

  page2.drawText(
    'premises or for any legitimate reason including communication with me following the',
    {
      x: 40,
      y: height2 - 800,
      size: fontSize,
    }
  );

  page2.drawText(
    'completion of my studies. In addition, I agree to the College processing personal data',
    {
      x: 40,
      y: height2 - 820,
      size: fontSize,
    }
  );

  page2.drawText(
    'described as “Sensitive Data” within the meaning of the United Kingdom Data Protection',
    {
      x: 40,
      y: height2 - 840,
      size: fontSize,
    }
  );

  page2.drawText(
    'Act 2018,such processing to be undertaken for any purposes as indicated in the declaration.',
    {
      x: 40,
      y: height2 - 860,
      size: fontSize,
    }
  );
  let page3 = pdfDoc.addPage([600, 900]);
  const { height: height3 } = page2.getSize();
  page3.drawText(
    'The organisation is committed to preserving the privacy of its students and employees',
    {
      x: 40,
      y: height3 - 80,
      size: fontSize,
    }
  );
  page3.drawText(
    'and to complying with the requirements of the General Data Protection Regulations',
    {
      x: 40,
      y: height3 - 100,
      size: fontSize,
    }
  );
  page3.drawText(
    '(GDPR) 2018. To achieve this commitment information about our students, employees',
    {
      x: 40,
      y: height3 - 120,
      size: fontSize,
    }
  );
  page3.drawText(
    'and other clients and contacts must be collected and used fairly, stored safely and not',
    {
      x: 40,
      y: height3 - 140,
      size: fontSize,
    }
  );
  page3.drawText('unlawfully disclosed to any other person.', {
    x: 40,
    y: height3 - 160,
    size: fontSize,
  });
  page3.drawText(
    'I confirm that the information provided on this application form is true, complete and',
    {
      x: 40,
      y: height3 - 180,
      size: fontSize,
    }
  );
  page3.drawText(
    'accurate to the best of my knowledge. I understand that if I am offered a place on a',
    {
      x: 40,
      y: height3 - 200,
      size: fontSize,
    }
  );
  page3.drawText(
    'course with Stratford College London (SCL), if any information is found to be incorrect,',
    {
      x: 40,
      y: height3 - 220,
      size: fontSize,
    }
  );
  page3.drawText(
    'SCL or Canterbury Christchurch University (CCCU) may take appropriate action which',
    {
      x: 40,
      y: height3 - 240,
      size: fontSize,
    }
  );
  page3.drawText('could result in withdrawal from the course.', {
    x: 40,
    y: height3 - 260,
    size: fontSize,
  });
  page3.drawText('I have read, understood and agree to the above', {
    x: 40,
    y: height3 - 280,
    size: fontSize,
  });

  const declarationCheckbox = form.createCheckBox('declaration');
  declarationCheckbox.addToPage(page3, {
    x: 50,
    y: height3 - 310,
    width: 20,
    height: 20,
  });

  const declarationDate = form.createTextField('declarationDate');

  declarationDate.addToPage(page3, {
    x: 350,
    y: height3 - 310,
    width: 200,
    height: 20,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default createPdfForm;