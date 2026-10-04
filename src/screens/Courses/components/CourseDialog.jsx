// Third-Party
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useFieldArray, useForm } from 'react-hook-form';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdClose, MdExpandMore, MdOutlineDelete } from 'react-icons/md';
import * as Yup from 'yup';
import '../../Students/components/registerStudent/StudentRegistrationDialog.css';

// Internal
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../../components/HookForm';
import useNotification from '../../../hooks/useNotification';
import {
  useCreateCourseMutation,
  useGetCourseDetailsQuery,
  useUpdateCourseDetailsMutation,
} from '../../../redux/slices/apiSlices/courseApiSlice';
import { useGetSubjectsListQuery } from '../../../redux/slices/apiSlices/subjectApiSlice';
import { useGetUsersListQuery } from '../../../redux/slices/apiSlices/usersApiSlice';
import EditStudentSkeleton from '../../Students/components/EditStudentSkeleton';
import { moduleYears } from '../config/moduleYears';

const defaultValues = {
  name: '',
  intake: null,
  type: '',
  duration: 0,
  semesters: [
    {
      year: 1,
      semester: 1,
      startDate: null,
      endDate: null,
      modules: [{ name: '', credits: null, moduleLead: '' }],
      breaks: null,
    },
  ],
};

export const CourseDialog = ({ open, onClose, fetchCourses, courseId }) => {
  const isEditMode = Boolean(courseId);
  const [semesterExpanded, setSemesterExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setSemesterExpanded(isExpanded ? panel : false);
  };

  const { openNotification } = useNotification();
  const { data: subjectsList } = useGetSubjectsListQuery();
  const { data: teachersList } = useGetUsersListQuery({ role: 'teacher' });
  const {
    data: course,
    isLoading: loadingCourse,
  } = useGetCourseDetailsQuery(courseId, { skip: !isEditMode });
  const [updateCourseDetails] = useUpdateCourseDetailsMutation();

  const [createCourse] = useCreateCourseMutation();

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
        breaks: Yup.array()
          .of(
            Yup.object().shape({
              startDate: Yup.date().required('Start date is required'),
              endDate: Yup.date().required('End date is required'),
              reason: Yup.string().required('Reason is required'),
            })
          )
          .nullable(),
      })
    ),
  });

  const methods = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues,
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

  useEffect(() => {
    if (open && courseId && course) {
      reset(course);
    } else {
      reset(defaultValues);
    }
  }, [open, courseId, course]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const saveCourseData = async (data) => {
    const courseData = {
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
    const saveRequest = isEditMode
      ? updateCourseDetails({ ...courseData, _id: courseId })
      : createCourse(courseData);

    await saveRequest
      .unwrap()
      .then((res) => {
        openNotification(
          'success',
          res?.message ||
            (isEditMode
              ? 'Course updated successfully'
              : 'Course created successfully')
        );

        reset();

        // Refresh courses table
        if (fetchCourses) {
          fetchCourses({
            page: 1,
            recordsPerPage: 10,
          });
        }

        // Close modal after successful registration
        if (handleClose) {
          handleClose();
        }
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      scroll="body">
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid #e5e7eb',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Box
            component="span"
            sx={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#1f2937',
            }}>
            {isEditMode ? 'Edit Course' : 'Create Course'}
          </Box>

          <IconButton
            onClick={handleClose}
            disabled={isSubmitting}
            size="small">
            <MdClose />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 3,
          overflowY: 'auto',
        }}>
        {loadingCourse ? (
          <EditStudentSkeleton />
        ) : (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(saveCourseData)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <h5 className="form-title course-info">Course Details</h5>
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
                    {
                      label: 'NCC',
                      value: 'NCC',
                    },
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
                <h6 className="course-info">Semesters</h6>

                <Tooltip title="Add module" placement="top">
                  <IconButton
                    onClick={() =>
                      SemestersAppend({
                        year: null,
                        semester: null,
                        startDate: null,
                        endDate: null,
                        modules: [{ name: '', credits: null, moduleLead: '' }],
                        breaks: [],
                      })
                    }>
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
                            <IconButton onClick={() => SemestersRemove(index)}>
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
                <div className="form-actions">
                  <Button
                    type="default"
                    htmlType="reset"
                    onClick={handleClose}
                    disabled={isSubmitting}>
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    disabled={loadingCourse}>
                    {isEditMode ? 'Update' : 'Save'}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
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
                  <FiTrash />
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
            <FiPlusCircle />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container item xs={12}>
        {BreaksFields?.length > 0 &&
          BreaksFields?.map((breakItem, breakIndex) => (
            <Grid key={breakItem.id} container item spacing={1}>
              <Grid item xs={12} sm={7}>
                <RHFTextField
                  name={`semesters[${semesterIndex}].breaks[${breakIndex}].reason`}
                  label="Reason"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
