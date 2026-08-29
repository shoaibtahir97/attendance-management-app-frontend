import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../../components/HookForm';
import { useGetCoursesListQuery } from '../../../redux/slices/apiSlices/courseApiSlice';

const filterLabels = {
  name: 'Group Name',
  course: 'Course',
};

const GroupFilter = (props) => {
  const {
    open,
    query,
    onOpen,
    onClose,
    onSubmit,
    onRemoveFilter,
    clearFilters,
  } = props;
  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();
  const methods = useForm({
    defaultValues: {
      name: query.name || '',
      course: query.course || '',
    },
  });
  const { handleSubmit, reset, formState } = methods;

  useEffect(() => {
    reset({
      name: query.name || '',
      course: query.course || '',
    });
  }, [query, reset]);

  const formatFilterValue = (key, value) => {
    if (key === 'course') {
      return (
        coursesList?.find((course) => course.value === value)?.label || value
      );
    }

    return value;
  };

  const activeFilters = Object.entries(query).filter(
    ([key, value]) => filterLabels[key] && value
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        scroll="body">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Typography variant="h6">Filter Groups</Typography>
              <IconButton onClick={onClose} aria-label="Close filter dialog">
                <MdClose />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <RHFTextField name="name" label="Group Name" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFAutocomplete
                  name="course"
                  label="Course"
                  options={coursesList || []}
                  loading={loadingCourses}
                  size="small"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={onClose} type="default" size="medium">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              loading={formState.isSubmitting}>
              Apply filters
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <div className="subframe-search-section">
        <div className="subframe-search">
          <Button type="default" size="middle" onClick={onOpen}>
            + Add Filter
          </Button>
          <Button
            type="text"
            size="middle"
            className="clear-filters"
            onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            p: 2,
            borderBottom: '1px solid #e5e7eb',
          }}>
          {activeFilters.map(([key, value]) => (
            <Chip
              key={key}
              size="small"
              variant="outlined"
              color="info"
              label={`${filterLabels[key]}: ${formatFilterValue(key, value)}`}
              onDelete={() => onRemoveFilter(key)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default GroupFilter;
