import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Select from 'react-select';
import PageHeader from '../../PageHeader';
import { PATH_DASHBOARD } from '../../../routes/paths';
import {
  useGetStudentDetailsQuery,
  useUpdateStudentDetailsMutation,
} from '../../../redux/slices/apiSlices/studentApiSlice';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../HookForm/index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Button } from 'antd';
import EditStudentSkeleton from './StudentSkeletons/EditStudentSkeleton';
import Alert from '../../Alert';
import useNotification from '../../../hooks/useNotification';

const EditStudent = () => {
  const { openNotification } = useNotification();

  const { id: studentId } = useParams();

  const { data, isLoading, error } = useGetStudentDetailsQuery(studentId);
  const [updateStudentDetails, { isLoading: loadingUpdate }] =
    useUpdateStudentDetailsMutation();

  const genders = [
    { value: '', label: 'Select Gender' },
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'others', label: 'Others' },
  ];

  const studentSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    studentId: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    emailAddress: Yup.string().required(),
    address: Yup.string().required(),
    // group: Yup.string().required(),
    gender: Yup.string().required(),
    dateOfBirth: Yup.date().required(),
    parentName: Yup.string().required(),
    emergencyNumber: Yup.string().required(),
    // numberOfWarningLettersIssues: Yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(studentSchema),
  });

  const { handleSubmit, reset } = methods;

  const updateStudentData = async (data) => {
    updateStudentDetails(data)
      .unwrap()
      .then((res) => openNotification('success', res?.message))
      .catch((err) =>
        openNotification('error', err?.data?.message || err?.error)
      );
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Edit Student"
        pageTitle="Edit Student"
        parentRoute={PATH_DASHBOARD.students}
        parentSection="Student"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              {isLoading ? (
                <EditStudentSkeleton />
              ) : error ? (
                <Alert
                  message="Error"
                  type="error"
                  description={error.data?.message}
                />
              ) : (
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(updateStudentData)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5 className="form-title student-info">
                        Student Information
                        {/* <span>
                          <Link to="#">
                            <i className="feather-more-vertical">
                              <FeatherIcon icon="more-vertical" />
                            </i>
                          </Link>
                        </span> */}
                      </h5>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="firstName" label={'First Name'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="lastName" label={'Last Name'} />
                    </Grid>{' '}
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="studentId" label="Student ID" />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="group" label="Group" />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFSelect
                        name="gender"
                        label="Gender"
                        options={genders}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFDatePicker
                        name="dateOfBirth"
                        label="Date of Birth"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="phoneNumber" label="Phone number" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="emailAddress" label="Email Address" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="address" label="Address" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="parentName" label="Parent Name" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField
                        name="emergencyNumber"
                        label="Emergency number"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField
                        name="numOfWarningLettersIssued"
                        label="Warning Letters"
                      />
                    </Grid> */}
                    {/* <div className="col-12 col-sm-4">
                      <div className="form-group students-up-files">
                        <label>Upload Student Photo (150px X 150px)</label>
                        <div className="uplod">
                          <label className="file-upload image-upbtn mb-0">
                            Choose File <input type="file" />
                          </label>
                        </div>
                      </div>
                    </div> */}
                    <Grid item xs={12}>
                      {/* <div className="student-submit"> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingUpdate}>
                        Save
                      </Button>
                      {/* </div> */}
                    </Grid>
                  </Grid>
                </FormProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
