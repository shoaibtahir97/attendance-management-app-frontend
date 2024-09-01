import React from 'react';
import useNotification from '../../hooks/useNotification';
import { useRegisterUserMutation } from '../../redux/slices/apiSlices/usersApiSlice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../components/HookForm';
import { Grid } from '@mui/material';
import { Button, Typography } from 'antd';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
const AddTeacher = () => {
  const { openNotification } = useNotification();

  const [registerUser, { isLoading: loadingRegister }] =
    useRegisterUserMutation();

  const defaultValues = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    role: 'teacher',
    phoneNumber: '',
    groups: [],
    subjects: [],
  };

  const studentSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    emailAddress: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must contain at least 8 characters, and contain an upper case letter, lower case letter, number, and symbol'
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
    role: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    groups: Yup.array().of(Yup.string()),
    subjects: Yup.array().of(Yup.string()),
  });

  const methods = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const registerUserData = async (data) => {
    registerUser(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        reset({
          firstName: '',
          lastName: '',
          emailAddress: '',
          password: '',
          confirmPassword: '',
          role: 'teacher',
          phoneNumber: '',
          groups: [],
          subjects: [],
        });
      })
      .catch((err) => openNotification('error', err.data.message || err.error));
  };

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Register Teacher"
        pageTitle="Register Teacher"
        parentRoute={PATH_DASHBOARD.teachers}
        parentSection="Teacher"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(registerUserData)}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <h5 className="form-title" style={{ marginBottom: '-5px' }}>
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
                    <RHFTextField name="phoneNumber" label="Phone number" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFAutocomplete
                      multiple
                      freeSolo
                      name="groups"
                      label="Groups"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFAutocomplete
                      multiple
                      freeSolo
                      name="subjects"
                      label="Subjects"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 4 }}>
                    <h5 className="form-title" style={{ marginBottom: '-5px' }}>
                      Login Details
                    </h5>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField name="emailAddress" label="Email Address" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField name="password" label="Password" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField
                      name="confirmPassword"
                      label="Confirm Password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadingRegister}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
