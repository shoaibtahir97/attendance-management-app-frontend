import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Select from 'react-select';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import {
  useGetStudentDetailsQuery,
  useUpdateStudentDetailsMutation,
} from '../../redux/slices/apiSlices/studentApiSlice';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFAutocomplete,
  RHFCountries,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm/index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Button } from 'antd';
import EditStudentSkeleton from './components/EditStudentSkeleton';
import Alert from '../../components/Alert';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import { moduleYears } from '../Courses/AddCourse';
import { countries } from '../../utils/countries';

const EditStudent = () => {
  const { openNotification } = useNotification();

  const { id: studentId } = useParams();

  const { data, isLoading, error } = useGetStudentDetailsQuery(studentId);

  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();

  const [updateStudentDetails, { isLoading: loadingUpdate }] =
    useUpdateStudentDetailsMutation();

  const studentSchema = Yup.object().shape({
    studentId: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    DOB: Yup.date().required(),
    phone: Yup.string().required(),
    email: Yup.string().required(),
    nationality: Yup.string().required(),
    group: Yup.string().required(),
    gender: Yup.string().required(),
    courseName: Yup.string().required(),
    year: Yup.number().required(),
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
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFDatePicker
                        name="DOB"
                        label="Date of Birth"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="group" label="Group" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="phone" label="Phone" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFCountries
                        name="nationality"
                        label="Nationality"
                        options={countries}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFAutocomplete
                        name="courseName"
                        label="Course Name"
                        options={coursesList}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFSelect
                        name="year"
                        label="Year"
                        options={moduleYears}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingUpdate}>
                        Save
                      </Button>
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
