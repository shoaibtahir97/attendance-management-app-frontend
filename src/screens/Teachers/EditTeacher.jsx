import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Alert, Button } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import {
  useGetUsersDetailsQuery,
  useUpdateUserDetailsMutation,
} from '../../redux/slices/apiSlices/usersApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';
import { genders } from './AddTeacher';

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
    role: Yup.string().required(),
    phone: Yup.string().required('Phone number is required'),
    subjects: Yup.array()
      .of(Yup.string())
      .min(1, 'Please select at least one subject'),
    isActive: Yup.boolean(),
  });

  const methods = useForm({
    resolver: yupResolver(teacherSchema),
  });

  const { handleSubmit, reset } = methods;

  const updateUserData = async (data) => {
    await updateUserDetails(data)
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
                    <Grid item xs={12} sm={8}>
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
                    <Grid item xs={12} sm={6} md={2} sx={{ mt: 2, ml: 2 }}>
                      <RHFSwitch name="isActive" label="Is Active" />
                    </Grid>
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
