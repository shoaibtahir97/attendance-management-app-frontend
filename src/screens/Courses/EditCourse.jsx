import { yupResolver } from '@hookform/resolvers/yup';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Alert, Button } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdExpandMore, MdOutlineDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import {
  useGetCourseDetailsQuery,
  useUpdateCourseDetailsMutation,
} from '../../redux/slices/apiSlices/courseApiSlice';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import { useGetUsersListQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import { formatDateToYearMonth } from '../../utils/formatDateTime';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';
import { moduleYears } from './AddCourse';

const EditCourse = () => {
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const { data: subjectsList, isLoading: loadingSubjects } =
    useGetSubjectsListQuery();

  const { data: teachersList, isLoading: loadingTeachers } =
    useGetUsersListQuery({ role: 'teacher' });

  const { id: courseId } = useParams();

  const { data, isLoading, error } = useGetCourseDetailsQuery(courseId);

  const [updateCourseDetails] = useUpdateCourseDetailsMutation();

  const courseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    intake: Yup.date().required('Intake is required'),
    type: Yup.string().required('Type is required'),
    duration: Yup.number().required('Duration is required'),
    semesters: Yup.array().of(
      Yup.object().shape({
        year: Yup.number().required('Year is required'),
        semester: Yup.number().required('Semester is required'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date().required('End date is required'),
        modules: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required('Subject is required'),
            credits: Yup.number().required('Credit is required'),
            moduleLead: Yup.string().required('Module lead is required'),
          })
        ),
        breaks: Yup.array().of(
          Yup.object().shape({
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date().required('End date is required'),
            reason: Yup.string().required('Reason is required'),
          })
        ),
      })
    ),
  });

  const methods = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: data,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const {
    fields: SemestersFields,
    append: SemestersAppend,
    remove: SemestersRemove,
  } = useFieldArray({
    name: 'semesters',
    control,
  });

  const [semesterExpanded, setSemesterExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setSemesterExpanded(isExpanded ? panel : false);
  };

  const handleUpdateCourse = async (data) => {
    const updatedData = {
      ...data,
      intake: formatDateToYearMonth(data.intake),
      semesters: data.semesters.map((sem) => ({
        ...sem,
        startDate: dayjs(sem.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(sem.endDate).format('YYYY-MM-DD'),
        ...(sem.breaks.length > 0 && {
          breaks: sem.breaks.map((brk) => ({
            ...brk,
            startDate: dayjs(brk.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(brk.endDate).format('YYYY-MM-DD'),
          })),
        }),
      })),
    };
    updateCourseDetails({ ...updatedData })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
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
              {isLoading || loadingSubjects || loadingTeachers ? (
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
                  onSubmit={handleSubmit(handleUpdateCourse)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5 className="form-title student-info">
                        Course Details
                      </h5>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <RHFTextField name="name" label="Course Name" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <RHFDatePicker
                        name="intake"
                        label="Intake"
                        views={['month', 'year']}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <RHFSelect
                        name="type"
                        label="Type"
                        options={[
                          { label: 'BSc', value: 'BSc' },
                          { label: 'HND', value: 'HND' },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <RHFTextField
                        name="duration"
                        type="number"
                        label="Duration (Years)"
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
                      <h6 className="student-info">Semesters</h6>

                      <Tooltip title="Add module" placement="top">
                        <IconButton
                          onClick={() =>
                            SemestersAppend({
                              year: null,
                              semester: null,
                              startDate: null,
                              endDate: null,
                              modules: [
                                { name: '', credits: null, moduleLead: '' },
                              ],
                              breaks: null,
                            })
                          }
                          disabled={SemestersFields.length < 4 ? false : true}>
                          <IoIosAddCircleOutline />
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    {SemestersFields?.map((semester, index) => (
                      <Accordion
                        key={semester.id}
                        expanded={semesterExpanded === `semester${index}`}
                        onChange={handleChange(`semester${index}`)}>
                        <AccordionSummary
                          expandIcon={<MdExpandMore fontSize={'24px'} />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}>
                          <Grid container spacing={2}>
                            <Grid item xs={11}>
                              <Typography
                                sx={{
                                  width: '33%',
                                  flexShrink: 0,
                                }}
                                variant="subtitle1">
                                Semester {index + 1}
                              </Typography>
                            </Grid>
                            {SemestersFields.length > 1 && (
                              <Grid item xs={1}>
                                <Tooltip title="Delete" placement="top">
                                  <IconButton
                                    onClick={() => SemestersRemove(index)}>
                                    <MdOutlineDelete />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            )}
                          </Grid>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Grid
                            container
                            item
                            xs={12}
                            spacing={1}
                            sx={{ display: 'flex' }}>
                            <Grid item xs={12} sm={3}>
                              <RHFTextField
                                name={`semesters[${index}].year`}
                                label="Year"
                                type="number"
                                options={moduleYears}
                              />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <RHFTextField
                                name={`semesters[${index}].semester`}
                                label="Semester"
                                type="number"
                                sx={{ width: '100%' }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <RHFDatePicker
                                name={`semesters[${index}].startDate`}
                                sx={{ width: '100%' }}
                                label="Start Date"
                              />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                              <RHFDatePicker
                                name={`semesters[${index}].endDate`}
                                label="End Date"
                                sx={{ width: '100%' }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Divider />
                            </Grid>

                            <Grid container item xs={12}>
                              <Module
                                semesterIndex={index}
                                subjectsList={subjectsList}
                                teachersList={teachersList}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                            <Grid container item xs={12}>
                              <Breaks semesterIndex={index} />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))}
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

const Module = ({ semesterIndex, subjectsList, teachersList }) => {
  const {
    fields: ModulesFields,
    append: ModulesAppend,
    remove: ModulesRemove,
  } = useFieldArray({
    name: `semesters[${semesterIndex}].modules`,
  });

  return (
    <Grid container item xs={12}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
          mt: 1,
        }}>
        <Typography variant="subtitle1">Modules</Typography>
        <Tooltip title="Add module" placement="top">
          <IconButton
            onClick={() =>
              ModulesAppend({
                name: '',
                credits: null,
                moduleLead: '',
              })
            }
            sx={{ mr: 3 }}>
            <IoIosAddCircleOutline />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container item xs={12}>
        {ModulesFields.map((module, moduleIndex) => (
          <Grid key={module.id} container item spacing={1}>
            <Grid item xs={12} sm={4}>
              <RHFAutocomplete
                name={`semesters[${semesterIndex}].modules[${moduleIndex}].name`}
                label="Subject"
                options={subjectsList}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <RHFTextField
                name={`semesters[${semesterIndex}].modules[${moduleIndex}].credits`}
                label="Credits"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RHFAutocomplete
                name={`semesters[${semesterIndex}].modules[${moduleIndex}].moduleLead`}
                label="Module Lead"
                options={teachersList}
              />
            </Grid>
            <Grid item xs={1} sm={1} sx={{ mt: 5 }}>
              {ModulesFields?.length > 1 && (
                <IconButton
                  type="button"
                  onClick={() => ModulesRemove(moduleIndex)}>
                  <MdOutlineDelete />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const Breaks = ({ semesterIndex }) => {
  const {
    fields: BreaksFields,
    append: BreaksAppend,
    remove: BreaksRemove,
  } = useFieldArray({
    name: `semesters[${semesterIndex}].breaks`,
  });

  return (
    <Grid container item xs={12}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
          mt: 1,
        }}>
        <Typography variant="subtitle1">Breaks</Typography>
        <Tooltip title="Add module" placement="top">
          <IconButton
            onClick={() =>
              BreaksAppend({
                startDate: null,
                endDate: null,
                reason: '',
              })
            }
            sx={{ mr: 3 }}>
            <IoIosAddCircleOutline />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container item xs={12}>
        {BreaksFields?.length > 0 &&
          BreaksFields?.map((breakItem, breakIndex) => (
            <Grid key={breakItem.id} container item spacing={1}>
              <Grid item xs={12} sm={5}>
                <RHFTextField
                  name={`semesters[${semesterIndex}].breaks[${breakIndex}].reason`}
                  label="Reason"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFDatePicker
                  name={`semesters[${semesterIndex}].breaks[${breakIndex}].startDate`}
                  label="Start Date"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <RHFDatePicker
                  name={`semesters[${semesterIndex}].breaks[${breakIndex}].endDate`}
                  label="End Date"
                />
              </Grid>

              <Grid item xs={1} sm={1} sx={{ mt: 5 }}>
                <IconButton
                  type="button"
                  onClick={() => BreaksRemove(breakIndex)}>
                  <MdOutlineDelete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default EditCourse;
