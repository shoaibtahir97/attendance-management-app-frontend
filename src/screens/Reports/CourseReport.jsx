import { Box, Stack } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFAutocomplete } from '../../components/HookForm';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import {
  useLazyGetCourseGroupsAttendanceReportQuery,
  useLazyGetCourseSubjectsAttendanceReportQuery,
} from '../../redux/slices/apiSlices/reportApiSlice';

const CourseReport = () => {
  const { data: courseList } = useGetCoursesListQuery();
  const [getCourseGroupsAttendanceReport, { isLoadingGroups }] =
    useLazyGetCourseGroupsAttendanceReportQuery();

  const [getCourseSubjectsAttendanceReport, { isLoadingSubjects }] =
    useLazyGetCourseSubjectsAttendanceReportQuery();

  const methods = useForm({
    defaultValues: {
      course: '',
    },
  });
  const { openNotification } = useNotification();

  const {
    handleSubmit,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const handleGetCourseGroupsReports = async () => {
    const { course } = getValues();
    if (course === '') {
      setError('course', {
        type: 'manual',
        message: 'Course is required',
      });
    } else {
      if (errors.course) {
        setError('course', null);
      }
      await getCourseGroupsAttendanceReport({ courseId: course })
        .unwrap()
        .then((res) => {
          console.log('res', res);
          const url = window.URL.createObjectURL(res);

          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'res'); // Specify the file name

          // Append to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err);
          openNotification('error', err.data.message ?? err.error);
        });
    }
  };

  const handleGetCourseSubjectReports = async () => {
    const { course } = getValues();
    if (course === '') {
      setError('course', {
        type: 'manual',
        message: 'Course is required',
      });
    } else {
      if (errors.course) {
        setError('course', null);
      }
      await getCourseSubjectsAttendanceReport({ courseId: course })
        .unwrap()
        .then((res) => {
          console.log('res', res);
          const url = window.URL.createObjectURL(res);

          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'res'); // Specify the file name

          // Append to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          openNotification('error', err.message ?? err.error);
        });
    }
  };

  return (
    <div>
      <FormProvider methods={methods}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box>
            <RHFAutocomplete
              label="Course Name"
              name="course"
              sx={{ width: '430px' }}
              size="small"
              options={courseList}
            />
          </Box>
          <Box>
            <Button
              loading={isLoadingGroups}
              disabled={isLoadingSubjects}
              onClick={handleGetCourseGroupsReports}
              type="primary"
              size="large">
              Generate Group wise Report
            </Button>
          </Box>

          <Box>
            <Button
              loading={isLoadingSubjects}
              disabled={isLoadingGroups}
              onClick={handleGetCourseSubjectReports}
              type="primary"
              size="large">
              Generate Subject wise Report
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </div>
  );
};

export default CourseReport;
