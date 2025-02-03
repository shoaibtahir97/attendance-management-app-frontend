import { Box, Stack } from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFAutocomplete } from '../../components/HookForm';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';

const CourseReport = () => {
  const { data: courseList } = useGetCoursesListQuery();

  const methods = useForm({});

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const getCourseReports = () => {};

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(getCourseReports)}>
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
              sx={{ width: '400px' }}
              size="small"
              options={courseList}
            />
          </Box>
          <Box>
            <Button loading={isSubmitting} htmlType="submit" type="primary">
              Generate Group wise Report
            </Button>
          </Box>

          <Box>
            <Button loading={isSubmitting} htmlType="submit" type="primary">
              Generate Subject wise Report
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </div>
  );
};

export default CourseReport;
