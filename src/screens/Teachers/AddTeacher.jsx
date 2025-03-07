import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
import { useRegisterUserMutation } from '../../redux/slices/apiSlices/usersApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

export const genders = [
  { value: '', label: 'Select Gender' },
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
];
const AddTeacher = () => {
  const { openNotification } = useNotification();
  const { navigate } = useNavigate();
  const { data: subjectsList, isLoading: loadingSubjects } =
    useGetSubjectsListQuery();

  const [registerUser, { isLoading: loadingRegister }] =
    useRegisterUserMutation();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher',
    phone: '',
    subjects: [],
    isActive: true,
  };

  const studentSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email address is required'),
    gender: Yup.string().required('Gender is required'),
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
    phone: Yup.string().required('Phone number is required'),
    subjects: Yup.array()
      .of(Yup.string())
      .min(1, 'Please select at least one subject'),
    isActive: Yup.boolean(),
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
        reset({ ...defaultValues });
        navigate(-1);
      })
      .catch((err) =>
        openNotification('error', err?.data?.message || err?.error)
      );
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
                    <h5 className="form-title" style={{ marginBottom: '-5px' }}>
                      Login Details
                    </h5>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <RHFTextField name="email" label="Email Address" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <RHFTextField name="password" label="Password" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <RHFTextField
                      name="confirmPassword"
                      label="Confirm Password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} sx={{ mt: 2, ml: 2 }}>
                    <RHFSwitch name="isActive" label="Is Active" />
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
