import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { PATH_DASHBOARD } from '../../routes/paths';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { Grid } from '@mui/material';
import { useRegisterStudentMutation } from '../../redux/slices/apiSlices/studentApiSlice';
import useNotification from '../../hooks/useNotification';
import PageHeader from '../../components/PageHeader';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { moduleYears } from '../Courses/AddCourse';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';

const AddStudent = () => {
  const { openNotification } = useNotification();

  const [registerStudent, { isLoading: loadingRegister }] =
    useRegisterStudentMutation();

  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();

  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();

  const studentSchema = Yup.object().shape({
    studentId: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    DOB: Yup.date().required(),
    phone: Yup.string().required(),
    email: Yup.string().email().required(),
    group: Yup.string().required(),
    courseName: Yup.string().required(),
    year: Yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(studentSchema),
  });

  const { handleSubmit, reset } = methods;

  const registerStudentData = async (data) => {
    registerStudent(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        reset({
          firstName: '',
          lastName: '',
          studentId: '',
          group: '',
          phone: '',
          email: '',
          DOB: '',
          courseName: '',
          year: '',
        });
      })
      .catch((err) => openNotification('error', err.data.message || err.error));
  };

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Register Student"
        pageTitle="Register Student"
        parentRoute={PATH_DASHBOARD.students}
        parentSection="Student"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(registerStudentData)}>
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
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFAutocomplete
                      name="group"
                      label="Group"
                      options={groupsList}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFDatePicker
                      name="DOB"
                      label="Date of Birth"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField name="phone" label="Phone " />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFTextField name="email" label="Email " />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFAutocomplete
                      name="courseName"
                      label="Course Name"
                      options={coursesList}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <RHFSelect name="year" label="Year" options={moduleYears} />
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

export default AddStudent;
