import { Box, Stack } from '@mui/material';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFAutocomplete } from '../../components/HookForm';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import {
  useLazyGetCourseGroupsAttendanceReportQuery,
  useLazyGetCourseReportV2Query,
  useLazyGetCourseSubjectsAttendanceReportQuery,
  useLazyGetFailedStudentsReportQuery,
} from '../../redux/slices/apiSlices/reportApiSlice';

const CourseReport = () => {
  const { data: courseList } = useGetCoursesListQuery();
  const [getCourseGroupsAttendanceReport, { isLoading: isLoadingGroups }] =
    useLazyGetCourseGroupsAttendanceReportQuery();

  const [getCourseSubjectsAttendanceReport, { isLoading: isLoadingSubjects }] =
    useLazyGetCourseSubjectsAttendanceReportQuery();

  const [getCourseAttendanceReportV2, { isLoading: isLoadingCourseReports }] =
    useLazyGetCourseReportV2Query();

  const [
    getFailedStudentsReport,
    { isLoading: isLoadingFailedStudentsReports },
  ] = useLazyGetFailedStudentsReportQuery();

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
          const url = window.URL.createObjectURL(res);

          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `report-course-group-${courseList.find((item) => item.value === course).label}`
          ); // Specify the file name

          // Append to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err);
          openNotification('error', err?.message ?? err.error);
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
          const url = window.URL.createObjectURL(res);

          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `report-course-subjects-${courseList.find((item) => item.value === course).label}`
          ); // Specify the file name

          // Append to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          openNotification('error', err?.message ?? err.error);
        });
    }
  };

  const handleGetCourseReportsV2 = async () => {
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
      await getCourseAttendanceReportV2({ courseId: course })
        .unwrap()
        .then((res) => {
          const url = window.URL.createObjectURL(res);

          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `report-course-subjects-${courseList.find((item) => item.value === course).label}`
          ); // Specify the file name

          // Append to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          openNotification('error', err?.message ?? err.error);
        });
    }
  };

  const handleGetFailedStudentsReports = async () => {
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
      await getFailedStudentsReport({ courseId: course })
        .unwrap()
        .then((res) => {
          const url = window.URL.createObjectURL(res);

          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `failed-students-${courseList.find((item) => item.value === course).label}`
          ); // Specify the file name

          // Append to the document and trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          openNotification('error', err?.message ?? err.error);
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
              disabled={
                isLoadingSubjects ||
                isLoadingCourseReports ||
                isLoadingFailedStudentsReports
              }
              onClick={handleGetCourseGroupsReports}
              type="primary"
              size="large">
              Generate Group wise Report
            </Button>
          </Box>

          <Box>
            <Button
              loading={isLoadingSubjects}
              disabled={
                isLoadingGroups ||
                isLoadingCourseReports ||
                isLoadingFailedStudentsReports
              }
              onClick={handleGetCourseSubjectReports}
              type="primary"
              size="large">
              Generate Subject wise Report
            </Button>
          </Box>

          <Box>
            <Button
              loading={isLoadingCourseReports}
              disabled={
                isLoadingSubjects ||
                isLoadingGroups ||
                isLoadingFailedStudentsReports
              }
              onClick={handleGetCourseReportsV2}
              type="primary"
              size="large">
              Generate Course Report V2
            </Button>
          </Box>
          <Box>
            <Button
              loading={isLoadingFailedStudentsReports}
              disabled={
                isLoadingSubjects || isLoadingGroups || isLoadingCourseReports
              }
              onClick={handleGetFailedStudentsReports}
              type="primary"
              size="large">
              Generate Failed Student Course Report
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </div>
  );
};

export default CourseReport;
