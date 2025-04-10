import { yupResolver } from '@hookform/resolvers/yup';
import {
  Grid,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFSelect,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { useSendMailV2Mutation } from '../../redux/slices/apiSlices/mailApiSlice';
import { useGetStudentsListQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { useGetTemplateListQuery } from '../../redux/slices/apiSlices/templateApiSlice';
import { useGetUsersListQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

const MailScreenv2 = () => {
  function getSteps() {
    return ['Select Recipient type', 'Select Recipient', 'Select Template'];
  }

  const recipients = [
    { label: 'Student', value: 'students' },
    { label: 'Teacher', value: 'teachers' },
    { label: 'Course', value: 'courses' },
    { label: 'Group', value: 'groups' },
  ];

  const defaultValues = {
    recipientType: '',
    recipientIds: [],
    templateId: '',
  };

  const { openNotification } = useNotification();

  const { data: teachersList, isLoading: loadingTeachersList } =
    useGetUsersListQuery({ role: 'teacher', filter: '_id' });

  const { data: studentsList, isLoading: loadingStudentsList } =
    useGetStudentsListQuery({ filter: '_id' });

  const { data: coursesList, isLoading: loadingCoursesList } =
    useGetCoursesListQuery();

  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();

  const { data: templateList, isLoading } = useGetTemplateListQuery();

  const [sendMailV2] = useSendMailV2Mutation();

  const [activeStep, setActiveStep] = useState(0);
  const [recipientOptions, setRecipientOptions] = useState([]);
  const steps = getSteps();

  const sendMailSchema = [
    Yup.object({
      recipientType: Yup.string().required('Recipient type is required'),
    }),
    Yup.object({
      recipientIds: Yup.array()
        .of(Yup.string())
        .min(1, 'At least one recipient is required'),
    }),
    Yup.object({
      templateId: Yup.string().required('Template is required'),
    }),
  ];

  const currentValidationSchema = sendMailSchema[activeStep];

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    defaultValues,
    shouldUnregister: false,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    trigger,
    watch,
    getValues,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    reset(defaultValues);
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <RHFSelect
            name="recipientType"
            label="Recipient Type"
            options={recipients}
          />
        );
      case 1:
        return (
          <RHFAutocomplete
            name="recipientIds"
            label="Recipient"
            multiple
            options={recipientOptions}
          />
        );
      case 2:
        return (
          <RHFAutocomplete
            name="templateId"
            label="Template"
            options={templateList}
          />
        );
      default:
        return 'unknown step';
    }
  }

  const recipientType = watch('recipientType');

  const handleSendMail = async (data) => {
    console.log('data', data);
    await sendMailV2({ ...data })
      .unwrap()
      .then((res) => {
        console.log(res);
        openNotification('success', res.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  useEffect(() => {
    if (recipientType) {
      if (recipientType === 'teachers') setRecipientOptions(teachersList);
      if (recipientType === 'students') setRecipientOptions(studentsList);
      if (recipientType === 'courses') setRecipientOptions(coursesList);
      if (recipientType === 'groups') setRecipientOptions(groupsList);
    }
  }, [recipientType]);

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Mail"
        pageTitle="Mail"
        parentRoute={PATH_DASHBOARD.mailv2}
        parentSection="Mail"
      />
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex justify-content-center mb-4 ">
            <div className="card card-chart" style={{ width: '60%' }}>
              <div className="card-header">
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => {
                    const labelProps = {};
                    const stepProps = {};
                    return (
                      <Step {...stepProps} key={index}>
                        <StepLabel {...labelProps}>{step}</StepLabel>
                        <StepContent>
                          <FormProvider methods={methods}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}></Grid>
                              <Grid item xs={12}>
                                {getStepContent(activeStep)}
                              </Grid>
                              <Grid item xs={12}>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  sx={{
                                    justifyContent: 'flex-end',
                                  }}>
                                  <Button
                                    variant="outlined"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    sx={{ mr: 2 }}>
                                    Back
                                  </Button>

                                  {activeStep === steps.length - 1 ? (
                                    <Button
                                      type="primary"
                                      variant="filled"
                                      loading={isSubmitting}
                                      onClick={handleSubmit(handleSendMail)}>
                                      Send
                                    </Button>
                                  ) : (
                                    <Button
                                      type="primary"
                                      variant="filled"
                                      onClick={handleNext}>
                                      Next
                                    </Button>
                                  )}
                                </Stack>
                              </Grid>
                            </Grid>
                          </FormProvider>
                        </StepContent>
                      </Step>
                    );
                  })}
                </Stepper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailScreenv2;
