import React, { useCallback, useState } from 'react';
import {
  admissionFormImageLeft,
  admissionFormImageRight,
} from '../../components/imagepath';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFAutocomplete,
  RHFCheckbox,
  RHFCountries,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
} from '../../components/HookForm';
import { countries } from '../../utils/countries';
import { Button } from 'antd';
import { genders } from '../Teachers/AddTeacher';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineDelete } from 'react-icons/md';
import { UploadMultiFile } from '../../components/upload';
import { moduleYears } from '../Courses/AddCourse';
import useNotification from '../../hooks/useNotification';
import { usePostAdmissionFormMutation } from '../../redux/slices/apiSlices/admissionsApiSlice';
import createPdfForm from '../../utils/createPdfForm';
import { Checkmark } from 'react-checkmark';

export const ethnicities = [
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
];

export const feeStatuses = [
  'Private finance',
  'Student Loan Company',
  'Training Agency',
  'Other UK govt award',
  'International agency',
  'UK industry/commerce',
  'Other source',
  'Not known',
];

// const defaultValues = {
//   course: '',
//   intake: '',
//   pointOfEntry: '',
//   firstName: '',
//   lastName: '',
//   gender: '',
//   DOB: null,
//   ethnicity: '',
//   email: '',
//   contactNumber: '',
//   homeAddress: '',
//   postcode: '',
//   county: '',
//   countryOfBirth: '',
//   legalNationality: '',
//   dualNationality: '',
//   countryOfResidence: '',
//   disability: '',
//   additionalSupport: '',
//   feePaymentMethod: '',
//   qualifications: [
//     {
//       institute: '',
//       qualification: '',
//       subject: '',
//       country: '',
//       dateOfCompletion: null,
//     },
//   ],
//   workExperience: [
//     {
//       from: null,
//       to: null,
//       employer: '',
//       position: '',
//       responsibilities: '',
//     },
//   ],
//   referenceDetails: '',
//   personalStatement: '',
//   declaration: false,
//   declarationDate: null,
// };

const defaultValues = {
  course: 'BS Computer Science',
  intake: 'January 2024',
  pointOfEntry: 0,
  firstName: 'John',
  lastName: 'Doe',
  gender: 'man',
  DOB: '27-10-1997',
  ethnicity: 'Asian - Pakistani',
  email: 'john@doe.com',
  contactNumber: '70690',
  homeAddress: 'R-461, Block 19 FB Area, Karachi',
  postcode: '75950',
  county: 'Yorkshire',
  countryOfBirth: 'Pakistan',
  legalNationality: 'Pakistan',
  dualNationality: 'Pakistan',
  countryOfResidence: 'Pakistan',
  disability: 'no',
  additionalSupport: 'no',
  feePaymentMethod: 'Private finance',
  englishQualificationLevel: `Intermediate`,
  qualifications: [
    {
      institute: 'Saint Patricks High School',
      qualification: 'Matric',
      subject: 'Science',
      country: 'Pakistan',
      dateOfCompletion: '01-01-2013',
    },
    {
      institute: 'Saint Patricks High School',
      qualification: 'Matric',
      subject: 'Science',
      country: 'Pakistan',
      dateOfCompletion: '01-01-2013',
    },
  ],
  workExperience: [
    {
      from: '01-06-2021',
      to: '01-06-2022',
      employer: 'Abbott',
      position: 'Production Supervisor',
      responsibilities: '',
    },
  ],
  referenceDetails: 'HRSG',
  personalStatement: '',
  declaration: true,
  declarationDate: '04-10-2024',
};

const intakes = [
  { label: 'January 2024', value: 'January 2024' },
  { label: 'June 2024', value: 'June 2024' },
  { label: 'September 2024', value: 'September 2024' },
  { label: 'January 2025', value: 'January 2025' },
  { label: 'June 2025', value: 'June 2025' },
  { label: 'September 2025', value: 'September 2025' },
];

const AdmissionForm = () => {
  const { openNotification } = useNotification();
  const [postAdmissionForm] = usePostAdmissionFormMutation();

  const admissionFormSchema = Yup.object().shape({
    course: Yup.string().required('Course Is required'),
    intake: Yup.string().required('Intake Is required'),
    pointOfEntry: Yup.string().required('Point Of Entry Is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    DOB: Yup.date().required('Date of birth is required'),
    ethnicity: Yup.string().required('Ethnicity is required'),
    email: Yup.string().email().required('Email address is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    homeAddress: Yup.string().required('Home address is required'),
    postcode: Yup.string(),
    county: Yup.string().required('County is required'),
    countryOfBirth: Yup.string().required('Country of birth is required'),
    legalNationality: Yup.string().required('Legal nationality is required'),
    dualNationality: Yup.string(),
    countryOfResidence: Yup.string().required(
      'Country of residence is required'
    ),
    disability: Yup.string(),
    additionalSupport: Yup.string(),
    feePaymentMethod: Yup.string().required('Fee payment method is required'),
    englishQualificationLevel: Yup.string(),
    qualifications: Yup.array()
      .of(
        Yup.object().shape({
          institute: Yup.string(),
          qualification: Yup.string(),
          subject: Yup.string(),
          country: Yup.string(),
          dateOfCompletion: Yup.date().nullable(),
        })
      )
      .min(1, 'Minimum one qualification is required'),
    workExperience: Yup.array().of(
      Yup.object().shape({
        from: Yup.date().nullable(true),
        to: Yup.date().nullable(true),
        employer: Yup.string(),
        position: Yup.string(),
        responsibilities: Yup.string(),
      })
    ),
    referenceDetails: Yup.string(),
    personalStatement: Yup.string(),
    declaration: Yup.boolean().oneOf([true], 'You must accept the declaration'),
    declarationDate: Yup.date().required('Date is required'),
  });

  const methods = useForm({
    resolver: yupResolver(admissionFormSchema),
    defaultValues,
  });

  const [files, setFiles] = useState([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const {
    fields: QualificationFields,
    append: QualificationAppend,
    remove: QualificationRemove,
  } = useFieldArray({
    name: 'qualifications',
    control,
  });

  const {
    fields: WorkExperienceFields,
    append: WorkExperienceAppend,
    remove: WorkExperienceRemove,
  } = useFieldArray({
    name: 'workExperience',
    control,
  });

  const submitApplication = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === 'workExperience' || key === 'qualifications') {
        value?.forEach((item, index) => {
          for (const [arrKey, arrVal] of Object.entries(item)) {
            if (arrVal) {
              formData.append(`${key}[${index}][${arrKey}]`, arrVal);
            }
          }
        });
      } else {
        formData.append(key, value);
      }
    }

    for (const file of files) {
      formData.append('documents', file);
    }

    await postAdmissionForm(formData)
      .unwrap()
      .then((res) => {
        // const url = window.URL.createObjectURL(res);
        // // Create a link element
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', `admission_form.pdf`); // Specify the file name
        // // Append to the document and trigger the download
        // document.body.appendChild(link);
        // link.click();
        // // Clean up and remove the link
        // link.parentNode.removeChild(link);
        // window.URL.revokeObjectURL(url);
        // openNotification('success', res?.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  const downloadApplicationForm = async () => {
    const pdfBytes = await createPdfForm();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'admission_form.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-wrapper login-body mt-4">
      {isSubmitSuccessful ? (
        <Zoom
          in={isSubmitSuccessful}
          style={{ transitionDelay: isSubmitSuccessful ? '400ms' : '0ms' }}>
          <Card
            sx={{
              m: '0 auto',
              mt: '100px',
              width: '55%',
              height: '200px',
              p: 1,
              py: 10,
              pr: 2,
            }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}>
              <Checkmark size="large" />
              <Typography variant="h5" sx={{ mb: 10 }} fontWeight={'bold'}>
                Form Submitted Successfully
              </Typography>
            </Stack>
          </Card>
        </Zoom>
      ) : (
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitApplication)}>
          <div className="content container">
            <Stack direction="row" justifyContent="center">
              <Typography variant="h4" fontWeight={'bold'}>
                Course Application Form
              </Typography>
            </Stack>
            <Grid
              container
              spacing={2}
              sx={{ backgroundColor: '#fff', mt: 2, p: 2, borderRadius: 2 }}>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Course details
                    </Typography>
                    <Button
                      onClick={() => downloadApplicationForm()}
                      type="primary">
                      Download Application form
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField name="course" label={'Course Applied for'} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFSelect name="intake" label={'Intake'} options={intakes} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFSelect
                    name="pointOfEntry"
                    label="Point of Entry"
                    options={moduleYears}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Personal Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField name="firstName" label={'First Name'} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField name="lastName" label={'Last Name'} />
                </Grid>{' '}
                <Grid item xs={12} sm={6} md={3}>
                  <RHFSelect name="gender" label="Gender" options={genders} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFDatePicker
                    name="DOB"
                    label="Date of Birth"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFSelect
                    name="ethnicity"
                    label="Ethnicity"
                    options={ethnicities.map((ethnicity) => ({
                      label: ethnicity,
                      value: ethnicity,
                    }))}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Contact Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField name="email" label={'Email'} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField name="contactNumber" label={'Contact Number'} />
                </Grid>{' '}
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField
                    name="postcode"
                    label="Post Code"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField name="county" label="County " />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFTextField
                    name="homeAddress"
                    label="Home Address"
                    multiline
                    row={3}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Nationality
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFCountries
                    name="countryOfBirth"
                    label={'Country of Birth'}
                    options={countries}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFCountries
                    name="legalNationality"
                    label={'Legal Nationality'}
                    options={countries}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <RHFCountries
                    name="dualNationality"
                    label={'Dual Nationality'}
                    options={countries}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFCountries
                    name="countryOfResidence"
                    label="Country of Residence"
                    options={countries}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Disability/Additional Support
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFSelect
                    name="disability"
                    label={'Disability'}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <RHFSelect
                    name="additionalSupport"
                    label={'Additional Support'}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ]}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Fee Status
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body1">
                    How you will be paying fee
                  </Typography>
                  <RHFSelect
                    name="feePaymentMethod"
                    options={feeStatuses.map((status) => ({
                      label: status,
                      value: status,
                    }))}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Qualifications
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">
                      Please list all qualifications obtained, including any
                      non-UK qualifications.
                    </Typography>
                    <Tooltip title="Add module" placement="top">
                      <IconButton
                        onClick={() =>
                          QualificationAppend({
                            institute: '',
                            qualification: '',
                            subjects: '',
                            country: '',
                            dateOfCompletion: '',
                          })
                        }>
                        <IoIosAddCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  {QualificationFields?.map((qualification, index) => (
                    <Grid
                      key={qualification.id}
                      container
                      item
                      xs={12}
                      spacing={1}
                      sx={{ display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} sm={2}>
                        <RHFTextField
                          name={`qualifications[${index}].institute`}
                          label={index === 0 ? 'Institution' : ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <RHFTextField
                          name={`qualifications[${index}].qualification`}
                          label={index === 0 ? 'Qualification' : ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <RHFTextField
                          name={`qualifications[${index}].subject`}
                          label={index === 0 ? 'Subject' : ''}
                          multiple={true}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <RHFCountries
                          name={`qualifications[${index}].country`}
                          label={index === 0 ? 'Country' : ''}
                          options={countries}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <RHFDatePicker
                          name={`qualifications[${index}].dateOfCompletion`}
                          label={index === 0 ? 'Date of Completion' : ''}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={1} sm={1} sx={{ mt: index === 0 ? 5 : 2 }}>
                        {QualificationFields?.length > 1 && (
                          <IconButton
                            type="button"
                            onClick={() => QualificationRemove(index)}>
                            <MdOutlineDelete />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    English Language
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    If English is not your first language, do you have an
                    English language qualification? If so, please provide
                    details below (title of qualification, level, awarding body,
                    etc.)
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField
                    name="englishQualificationLevel"
                    multiline
                    rows={4}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Work Experience
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">
                      Please provide details of all work experience undertaken
                      including outside of UK
                    </Typography>
                    <Tooltip title="Add Work Experience" placement="top">
                      <IconButton
                        onClick={() =>
                          WorkExperienceAppend({
                            from: '',
                            to: '',
                            employer: '',
                            position: '',
                            responsibilities: '',
                          })
                        }>
                        <IoIosAddCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  {WorkExperienceFields?.map((workExperience, index) => (
                    <Grid
                      key={workExperience.id}
                      container
                      item
                      xs={12}
                      spacing={1}
                      sx={{ display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} sm={2}>
                        <RHFDatePicker
                          name={`workExperience[${index}].from`}
                          label={index === 0 ? 'From' : ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <RHFDatePicker
                          name={`workExperience[${index}].to`}
                          label={index === 0 ? 'To' : ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <RHFTextField
                          name={`qualifications[${index}].employer`}
                          label={
                            index === 0 ? 'Name and address of employer' : ''
                          }
                          multiline
                          maxrows={4}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <RHFTextField
                          name={`qualifications[${index}].position`}
                          label={index === 0 ? 'Position held' : ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <RHFTextField
                          name={`qualifications[${index}].responsibilities`}
                          label={
                            index === 0
                              ? 'Brief description of responsibilities'
                              : ''
                          }
                          sx={{ width: '100%' }}
                          multiline
                          maxrows={4}
                        />
                      </Grid>

                      <Grid item xs={1} sm={1} sx={{ mt: index === 0 ? 5 : 2 }}>
                        {WorkExperienceFields?.length > 1 && (
                          <IconButton
                            type="button"
                            onClick={() => WorkExperienceRemove(index)}>
                            <MdOutlineDelete />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Reference Details
                  </Typography>
                  <Stack direction="column">
                    <Typography variant="body1">
                      Please provide name and contact details (company email)
                      for most recent / last employer
                    </Typography>
                    <RHFTextField
                      name="referenceDetails"
                      multiline
                      rows={4}
                      sx={{ width: '100%' }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Personal Statement{' '}
                  </Typography>
                  <Stack direction="column">
                    <Typography variant="body1">
                      Please include details such as why you wish to study the
                      course/ subject, how your qualifications and/or work
                      experience has helped you prepare for the course and what
                      are your future aspirations. Min 300 words
                    </Typography>
                    <RHFTextField
                      name="personalStatement"
                      multiline
                      rows={4}
                      maxLength={300}
                      sx={{ width: '100%' }}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container item>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Upload Documents
                </Typography>
                <UploadMultiFile
                  multiple={true}
                  files={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemoveFile}
                />
              </Grid>
              <Grid container item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Declaration
                </Typography>
                <Typography variant="body1" textAlign={'justify'}>
                  By ticking the check box below, I agree to Stratford College
                  London processing personal data contained in this from or
                  other data which the College may obtain from me or other
                  people. I agree to the processing of such data for any purpose
                  connected with my studies (including UCAS via the RPA data
                  transfer) or my health and safety whilst on the premises or
                  for any legitimate reason including communication with me
                  following the completion of my studies. In addition, I agree
                  to the College processing personal data described as
                  “Sensitive Data” within the meaning of the United Kingdom Data
                  Protection Act 2018,such processing to be undertaken for any
                  purposes as indicated in the declaration.
                  <br />
                  The organisation is committed to preserving the privacy of its
                  students and employees and to complying with the requirements
                  of the General Data Protection Regulations (GDPR) 2018. To
                  achieve this commitment information about our students,
                  employees and other clients and contacts must be collected and
                  used fairly, stored safely and not unlawfully disclosed to any
                  other person.
                  <br />
                  I confirm that the information provided on this application
                  form is true, complete and accurate to the best of my
                  knowledge. I understand that if I am offered a place on a
                  course with Stratford College London (SCL), if any information
                  is found to be incorrect, SCL or Canterbury Christchurch
                  University (CCCU) may take appropriate action which could
                  result in withdrawal from the course.
                  <br />I have read, understood and agree to the above
                </Typography>
                <Box>
                  <RHFCheckbox name="declaration" />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Box>
                    <RHFDatePicker label="Date" name="declarationDate" />
                  </Box>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    size="large">
                    Submit Application
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
        </FormProvider>
      )}
    </div>
  );
};

export default AdmissionForm;
