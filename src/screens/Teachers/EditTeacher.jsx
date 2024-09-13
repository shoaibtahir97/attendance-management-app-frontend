import React, { useEffect } from 'react';
import useNotification from '../../hooks/useNotification';
import {
  useGetUsersDetailsQuery,
  useUpdateUserDetailsMutation,
} from '../../redux/slices/apiSlices/usersApiSlice';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';
import { Alert, Button } from 'antd';
import {
  FormProvider,
  RHFAutocomplete,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { genders } from './AddTeacher';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';

const EditTeacher = () => {
  const { openNotification } = useNotification();

  const { id: teacherId } = useParams();

  const { data, isLoading, error } = useGetUsersDetailsQuery(teacherId);

  const { data: subjectsList, isLoading: loadingSubjects } =
    useGetSubjectsListQuery();

  const [updateUserDetails, { isLoading: loadingUpdate }] =
    useUpdateUserDetailsMutation();

  const teacherSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email address is required'),
    gender: Yup.string().required('Gender is required'),
    // password: Yup.string()
    //   .required()
    //   .matches(
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //     'Password must contain at least 8 characters, and contain an upper case letter, lower case letter, number, and symbol'
    //   ),
    // confirmPassword: Yup.string().oneOf(
    //   [Yup.ref('password'), null],
    //   'Passwords must match'
    // ),
    role: Yup.string().required(),
    phone: Yup.string().required('Phone number is required'),
    subjects: Yup.array()
      .of(Yup.string())
      .min(1, 'Please select at least one subject'),
  });

  const methods = useForm({
    resolver: yupResolver(teacherSchema),
  });

  const { handleSubmit, reset } = methods;

  const updateUserData = async (data) => {
    console.log('data', data);
    updateUserDetails(data)
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
      {' '}
      <PageHeader
        currentSection="Edit Teacher"
        pageTitle="Edit Teacher"
        parentRoute={PATH_DASHBOARD.teachers}
        parentSection="Teacher"
      />
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              {isLoading || loadingSubjects ? (
                <EditStudentSkeleton />
              ) : error ? (
                <Alert
                  message="Error"
                  type="error"
                  description={error?.data?.message}
                />
              ) : (
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(updateUserData)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5
                        className="form-title"
                        style={{ marginBottom: '-5px' }}>
                        Basic Details
                      </h5>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="firstName" label={'First Name'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="lastName" label={'Last Name'} />
                    </Grid>{' '}
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="phone" label="Phone number" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFSelect
                        name="gender"
                        label="Gender"
                        options={genders}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFAutocomplete
                        multiple
                        options={subjectsList}
                        name="subjects"
                        label="Subjects"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4 }}>
                      <h5
                        className="form-title"
                        style={{ marginBottom: '-5px' }}>
                        Login Details
                      </h5>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="email" label="Email Address" />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="password" label="Password" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField
                        name="confirmPassword"
                        label="Confirm Password"
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingUpdate}>
                        Update
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

export default EditTeacher;
