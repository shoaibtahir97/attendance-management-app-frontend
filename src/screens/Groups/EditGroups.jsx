import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';
import { Alert, Button } from 'antd';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetGroupDetailsQuery,
  useUpdateGroupDetailsMutation,
} from '../../redux/slices/apiSlices/groupApiSlice';
import * as Yup from 'yup';
import PageHeader from '../../components/PageHeader';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { moduleYears } from './AddGroup';
import { MdOutlineDelete } from 'react-icons/md';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';

const EditGroup = () => {
  const { openNotification } = useNotification();

  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();

  const { id: groupId } = useParams();

  const { data, isLoading, error } = useGetGroupDetailsQuery(groupId);

  const [updateGroupDetails] = useUpdateGroupDetailsMutation();

  const groupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    course: Yup.string().required('Course is required'),
  });

  const methods = useForm({
    resolver: yupResolver(groupSchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitted, isSubmitting, errors },
  } = methods;

  const updateGroupData = async (data) => {
    updateGroupDetails(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Edit Group"
        pageTitle="Edit Group"
        parentRoute={PATH_DASHBOARD.groups}
        parentSection="Group"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              {isLoading || loadingCourses ? (
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
                  onSubmit={handleSubmit(updateGroupData)}>
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
                        label="Course name"
                        options={coursesList}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}>
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

export default EditGroup;
