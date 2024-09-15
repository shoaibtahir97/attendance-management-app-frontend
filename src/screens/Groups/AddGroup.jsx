import React from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import {
  useCreateGroupMutation,
  useGetGroupsListQuery,
} from '../../redux/slices/apiSlices/groupApiSlice';
import { Alert, Button } from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineDelete } from 'react-icons/md';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import { useGetUsersListQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import {
  useCreateCourseMutation,
  useGetCoursesListQuery,
} from '../../redux/slices/apiSlices/courseApiSlice';
import useNotification from '../../hooks/useNotification';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';

export const moduleYears = [
  { label: 'Foundation', value: 0 },
  { label: 'First Year', value: 1 },
  { label: 'Second Year', value: 2 },
  { label: 'Third Year', value: 3 },
];

const AddGroup = () => {
  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();

  const [createGroup] = useCreateGroupMutation();

  const { openNotification } = useNotification();

  const groupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    course: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(groupSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
  } = methods;

  const handleCreateGroup = async (data) => {
    await createGroup(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Create Group"
        pageTitle="Create Group"
        parentRoute={PATH_DASHBOARD.groups}
        parentSection="Group"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              {loadingCourses ? (
                <EditStudentSkeleton />
              ) : (
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(handleCreateGroup)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5 className="form-title student-info">Group Details</h5>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="name" label="Group Name" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFAutocomplete
                        name="course"
                        label="Course"
                        options={coursesList}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}>
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

export default AddGroup;
