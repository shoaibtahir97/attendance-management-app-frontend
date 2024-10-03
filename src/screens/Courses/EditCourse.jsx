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
  useGetCourseDetailsQuery,
  useUpdateCourseDetailsMutation,
} from '../../redux/slices/apiSlices/courseApiSlice';
import * as Yup from 'yup';
import PageHeader from '../../components/PageHeader';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { moduleYears } from './AddCourse';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { useGetUsersListQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import { MdOutlineDelete } from 'react-icons/md';
import useNotification from '../../hooks/useNotification';

const EditCourse = () => {
  const { openNotification } = useNotification();

  const { data: subjectsList, isLoading: loadingSubjects } =
    useGetSubjectsListQuery();

  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();

  const { data: teachersList, isLoading: loadingTeachers } =
    useGetUsersListQuery({ role: 'teacher' });

  const { id: courseId } = useParams();

  const { data, isLoading, error } = useGetCourseDetailsQuery(courseId);

  const [updateCourseDetails] = useUpdateCourseDetailsMutation();

  const courseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
    cohort: Yup.date().required('Cohort date is required'),
    modules: Yup.array()
      .of(
        Yup.object().shape({
          year: Yup.number().required('Year is required'),
          // cohortStartDate: Yup.date().required('Cohort start date is required'),
          subjects: Yup.array()
            .of(Yup.string())
            .min(1, 'Minimum one subject is required')
            .max(3, 'Minimum three subjects are allowed'),
          moduleLead: Yup.string().required('Module Lead is required'),
          groups: Yup.array()
            .of(Yup.string())
            .min(1, 'Minimum one group is required'),
        })
      )
      .min(1),
  });

  const methods = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { isSubmitted, isSubmitting, errors },
  } = methods;

  const {
    fields: ModulesFields,
    append: ModulesAppend,
    remove: ModulesRemove,
  } = useFieldArray({
    name: 'modules',
    control,
  });

  const updateCourseData = async (data) => {
    updateCourseDetails(data)
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
        currentSection="Edit Course"
        pageTitle="Edit Course"
        parentRoute={PATH_DASHBOARD.courses}
        parentSection="Course"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              {isLoading ||
              loadingSubjects ||
              loadingGroups ||
              loadingTeachers ? (
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
                  onSubmit={handleSubmit(updateCourseData)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5 className="form-title student-info">
                        Course Details
                      </h5>
                    </Grid>
                    <Grid item xs={12}>
                      {isSubmitted && errors.modules && (
                        <Alert
                          message="Error"
                          description={errors?.modules?.message}
                          type="error"
                          showIcon
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RHFTextField name="name" label="Course Name" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RHFTextField name="code" label="Course code" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RHFDatePicker
                        name="cohort"
                        label="Cohort date"
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <h6 className="student-info">Modules</h6>

                      <Tooltip title="Add module" placement="top">
                        <IconButton
                          onClick={() =>
                            ModulesAppend({
                              year: null,
                              // cohortStartDate: null,
                              groups: [],
                              moduleLead: '',
                              subjects: [],
                            })
                          }
                          disabled={ModulesFields.length < 4 ? false : true}>
                          <IoIosAddCircleOutline />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    {ModulesFields?.map((module, index) => (
                      <Grid
                        key={module.id}
                        container
                        item
                        xs={12}
                        spacing={1}
                        sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item xs={12} sm={2}>
                          <RHFSelect
                            name={`modules[${index}].year`}
                            label="Year"
                            options={moduleYears}
                          />
                        </Grid>
                        {/* <Grid item xs={12} sm={2}>
                          <RHFDatePicker
                            name={`modules[${index}].cohortStartDate`}
                            label="Cohort Start Date"
                            sx={{ width: '100%' }}
                          />
                        </Grid> */}
                        <Grid item xs={12} sm={2}>
                          <RHFAutocomplete
                            name={`modules[${index}].moduleLead`}
                            label="Module Lead"
                            options={teachersList}
                            loading={loadingTeachers}
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <RHFAutocomplete
                            name={`modules[${index}].groups`}
                            multiple={true}
                            options={groupsList}
                            loading={loadingGroups}
                            label="Groups"
                          />
                        </Grid>

                        <Grid item container xs={12} sm={3}>
                          <Grid item xs={11}>
                            <RHFAutocomplete
                              name={`modules[${index}].subjects`}
                              multiple={true}
                              options={subjectsList}
                              loading={loadingSubjects}
                              label="Subjects"
                            />
                          </Grid>
                          <Grid item xs={1} sx={{ mt: 5 }}>
                            {ModulesFields?.length > 1 && (
                              <IconButton
                                type="button"
                                onClick={() => ModulesRemove(index)}>
                                <MdOutlineDelete />
                              </IconButton>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
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

export default EditCourse;
